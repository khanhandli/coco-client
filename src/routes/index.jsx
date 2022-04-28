import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFound from '../components/global/NotFound';
import HomePage from '../features/home/page';
import ShopPage from '../features/shop/page';

const RouterList = () => {
    return (
        <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<HomePage />} />

            <Route path="/shop">
                <Route index element={<ShopPage />} />
            </Route>
        </Routes>
    );
};

export default RouterList;
