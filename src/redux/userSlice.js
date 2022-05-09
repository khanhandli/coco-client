import { getDataAPI } from '../apis/fetchData';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getMe = createAsyncThunk('user/getMe', async (params, thunkAPI) => {
    const currentUser = await getDataAPI('refresh_token');
    return currentUser.data;
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLogged: localStorage.getItem('firstLogin') ? true : false,
        token: '',
        user: {},
    },
    reducers: {
        addFavoriteInUser: (state, action) => {
            state.user.favorites.push(action.payload);
        },
        removeFavoriteInUser: (state, action) => {
            state.user.favorites = state.user.favorites.filter((item) => item !== action.payload);
        },
        logOut: (state, action) => {
            state.isLogged = false;
            state.token = '';
            state.user = {};
        },
    },
    extraReducers: {
        [getMe.fulfilled]: (state, action) => {
            state.token = action.payload.accesstoken;
            state.user = action.payload.user;
        },
    },
});

const { reducer: userReducer, actions } = userSlice;
export const { logOut, addFavoriteInUser, removeFavoriteInUser } = actions;
export default userReducer;
