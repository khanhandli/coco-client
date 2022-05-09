import { getDataAPI } from '../apis/fetchData';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getProduct = createAsyncThunk('product/getList', async (params, thunkAPI) => {
    // thunkAPI.dispatch(...)
    const currentProduct = await getDataAPI('product');
    return currentProduct.data;
});

const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        fullProduct: [],
    },
    reducers: {
        setProductByCategory: (state, action) => {
            const products = state.fullProduct.filter((item) =>
                action.payload === 'all' ? true : item.category._id === action.payload
            );

            state.products = products;
        },
        setProductBySort: (state, action) => {
            const products = state.products.sort((a, b) => {
                if (action.payload === 'sold') {
                    return a?.sold - b?.sold;
                } else if (action.payload === 'new') {
                    return a?.createdAt - b?.createdAt;
                } else if (action.payload === 'old') {
                    return b?.createdAt - a?.createdAt;
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
            state.products = action.payload;
            state.fullProduct = action.payload;
        },
    },
});

const { reducer: productReducer, actions } = productSlice;
export const { setProductByCategory, setProductBySort, setProductBySearch } = actions;
export default productReducer;
