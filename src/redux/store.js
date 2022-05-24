import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import categoryReducer from './categorySlice';
import productReducer from './productSlice';
import userReducer from './userSlice';
const rootReducer = {
    categories: categoryReducer,
    product: productReducer,
    user: userReducer,
};

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;
