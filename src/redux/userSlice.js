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
        socket: null,
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
        addCart: (state, action) => {
            state.user = {
                ...state.user,
                cart: [...state?.user?.cart, { ...action.payload, quantity_cart: 1 }],
            };
        },
        incrementQuantity: (state, action) => {
            state.user.cart = state.user.cart.map((item) => {
                if (item._id === action.payload) {
                    item.quantity_cart++;
                }
                return item;
            });
        },
        decrementQuantity: (state, action) => {
            state.user.cart = state.user.cart.map((item) => {
                if (item._id === action.payload) {
                    item.quantity_cart--;
                }
                return item;
            });
        },
        updateQuantity: (state, action) => {
            state.user.cart = state.user.cart.map((item) => {
                if (item._id === action.payload._id) {
                    item.quantity_cart = action.payload.quantity_cart;
                }
                return item;
            });
        },
        removeQuantity: (state, action) => {
            state.user.cart = state.user.cart.filter((item) => item._id !== action.payload);
        },
        updateShipping: (state, action) => {
            state.user.shipping = action.payload;
        },
        clearCart: (state, action) => {
            state.user.cart = [];
        },
        addSocket: (state, action) => {
            state.socket = action.payload;
        },
        updateAvatar: (state, action) => {
            state.user.avatar = action.payload;
        },
        updateProfileSettings: (state, action) => {
            state.user = {
                ...state.user,
                ...action.payload,
            };
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
export const {
    logOut,
    addFavoriteInUser,
    removeFavoriteInUser,
    addCart,
    incrementQuantity,
    decrementQuantity,
    updateQuantity,
    removeQuantity,
    updateShipping,
    clearCart,
    addSocket,
    updateAvatar,
    updateProfileSettings,
} = actions;
export default userReducer;
