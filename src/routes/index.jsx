import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import NotFound from '../components/global/NotFound';
import ActivationEmail from '../features/auth/ActivationEmail';
import Login from '../features/auth/Login';
import Register from '../features/auth/Register';
import CosmeticShop from '../features/cosmetic/page';
import DetailProduct from '../features/cosmetic/page/detail';
import HomePage from '../features/home/page';
import ShopPage from '../features/shop/page';

const RouterList = () => {
    const user = useSelector((state) => state.user);

    return (
        <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={user.isLogged ? <NotFound /> : <Login />} />
            <Route path="/register" element={user.isLogged ? <NotFound /> : <Register />} />
            <Route path="/user/activate" element={user.isLogged ? <NotFound /> : <ActivationEmail />} />

            <Route path="/home">
                <Route index element={<ShopPage />} />
            </Route>

            <Route path="/shop">
                <Route index element={<CosmeticShop />} />
                <Route path="detail/:id" element={<DetailProduct />} />
            </Route>
        </Routes>
    );
};

export default RouterList;
