import { getDataAPI } from '../apis/fetchData';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import moment from 'moment';
export const getProduct = createAsyncThunk('product/getList', async (params, thunkAPI) => {
    // thunkAPI.dispatch(...)
    const currentProduct = await getDataAPI('product');
    return currentProduct.data;
});

const handleDate = (time) => {
    return moment(time);
};

const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        fullProduct: [],
    },
    reducers: {
        setProductByCategory: (state, action) => {
            const products = state.fullProduct.filter((item) =>
                action.payload === 'all'
                    ? true
                    : item?.category?._id === action.payload || item?.category?.parent === action.payload
            );

            state.products = products;
        },
        setProductBySort: (state, action) => {
            const products = state.products.sort((a, b) => {
                if (action.payload === 'sold') {
                    return b?.sold - a?.sold;
                } else if (action.payload === 'old') {
                    return handleDate(a?.createdAt) - handleDate(b?.createdAt);
                } else if (action.payload === 'new') {
                    return handleDate(b?.createdAt) - handleDate(a?.createdAt);
                } else if (action.payload === 'price') {
                    return b.price - a.price;
                } else if (action.payload === '-price') {
                    return a.price - b.price;
                }
            });

            state.products = products;
        },
        setProductBySearch: (state, action) => {
            const products = state.fullProduct.filter((item) =>
                item.title.toLowerCase().includes(action.payload.toLowerCase())
            );

            state.products = products;
        },
    },
    extraReducers: {
        [getProduct.fulfilled]: (state, action) => {
            state.products = action.payload.sort((a, b) => moment(b.createdAt) - moment(a.createdAt));
            state.fullProduct = action.payload.sort((a, b) => moment(b.createdAt) - moment(a.createdAt));
        },
    },
});

const { reducer: productReducer, actions } = productSlice;
export const { setProductByCategory, setProductBySort, setProductBySearch } = actions;
export default productReducer;
