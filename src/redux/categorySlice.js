import { getDataAPI } from '../apis/fetchData';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getCategory = createAsyncThunk('category/getList', async (params, thunkAPI) => {
    // thunkAPI.dispatch(...)
    const currentCategory = await getDataAPI('category');
    return currentCategory.data;
});

const CategorySlice = createSlice({
    name: 'category',
    initialState: [],
    reducers: {},
    extraReducers: {
        [getCategory.fulfilled]: (state, action) => {
            return action.payload;
        },
    },
});

const { reducer: categoryReducer } = CategorySlice;
export default categoryReducer;
