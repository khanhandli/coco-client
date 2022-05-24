import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import NotFound from '../components/global/NotFound';
import ActivationEmail from '../features/auth/ActivationEmail';
import Login from '../features/auth/Login';
import Register from '../features/auth/Register';
import Blogs from '../features/blog';
import DetailBlog from '../features/blog/detail';
import CartProduct from '../features/cart';
import CosmeticShop from '../features/cosmetic/page';
import DetailProduct from '../features/cosmetic/page/detail';
import ShopPromotion from '../features/cosmetic/page/promotion';
import HistoryOrder from '../features/history/page';
import HomePage from '../features/home/page';
import Map from '../features/map';
import Setting from '../features/setting';
import ShopPage from '../features/shop/page';
import Tips from '../features/shop/page/tips';

const RouterList = () => {
    const user = useSelector((state) => state.user);

    return (
        <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={user.isLogged ? <ShopPage /> : <Login />} />
            <Route path="/register" element={user.isLogged ? <ShopPage /> : <Register />} />
            <Route path="/user/activate" element={user.isLogged ? <NotFound /> : <ActivationEmail />} />
            <Route path="/cart" element={!user.isLogged ? <NotFound /> : <CartProduct />} />

            <Route path="/blog">
                <Route index element={<Blogs />} />
                <Route path=":id" element={<DetailBlog />} />
            </Route>

            <Route path="/home">
                <Route index element={<ShopPage />} />
                <Route path="tips/:id" element={<Tips />} />
            </Route>

            <Route path="/shop">
                <Route index element={<CosmeticShop />} />
                <Route path="detail/:id" element={<DetailProduct />} />
                <Route path="promotion/:id" element={<ShopPromotion />} />
            </Route>

            <Route path="/history">
                <Route index element={<HistoryOrder />} />
            </Route>

            <Route path="/map">
                <Route index element={<Map />} />
            </Route>

            <Route path="/setting">
                <Route index element={!user.isLogged ? <NotFound /> : <Setting />} />
            </Route>
        </Routes>
    );
};

export default RouterList;
