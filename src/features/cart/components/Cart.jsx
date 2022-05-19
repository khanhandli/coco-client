import { Button, Col, Input, Result, Row } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { patchDataAPI } from '../../../apis/fetchData';
import { decrementQuantity, incrementQuantity, removeQuantity, updateQuantity } from '../../../redux/userSlice';
import { formatNumber } from '../../../utils/common';

const Cart = ({ dispatch, cart, user }) => {
    const navigate = useNavigate();
    return (
        <div className="p-8 mt-6 w-full shadow-lg border border-[#f3f3f3] rounded-lg">
            <Row gutter={[40, 20]}>
                {cart && cart.length > 0 ? (
                    cart.map((cartItem, index) => (
                        <Col className="relative" span={24} key={index}>
                            <div
                                onClick={async () => {
                                    dispatch(removeQuantity(cartItem._id));
                                    const filter = cart.filter((item) => item._id !== cartItem._id);
                                    await patchDataAPI('addcart', { cart: filter }, user?.token);
                                }}
                                className="flex items-center justify-center absolute top-1 font-bold cursor-pointer p-2 hover:opacity-80 right-[20px]"
                            >
                                X
                            </div>
                            <Row gutter={[10, 0]} className="flex h-[120px] p-4 shadow-sm border">
                                <Col span={3}>
                                    <img className="h-full w-[80px]" src={cartItem.image} alt="123" />
                                </Col>
                                <Col span={10}>
                                    <div className="flex flex-col w-[90%]">
                                        <h2>{cartItem.title}</h2>
                                    </div>
                                </Col>
                                <Col span={5}>
                                    {cartItem.discount ? (
                                        <div className="flex items-center h-full w-full justify-start">
                                            <span className="font-bold text-red-500 mr-4">
                                                {formatNumber(
                                                    (cartItem.price - (cartItem.price * cartItem.discount) / 100) *
                                                        cartItem.quantity_cart
                                                )}
                                            </span>
                                            <span className="font-bold text-[#ccc] line-through">
                                                {formatNumber(cartItem.price)}
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center h-full w-full justify-start">
                                            <span className="font-bold text-red-500">
                                                {formatNumber(cartItem.price * cartItem.quantity_cart)}
                                            </span>
                                        </div>
                                    )}
                                </Col>
                                <Col span={6}>
                                    <div className="flex items-center h-full">
                                        <div>
                                            <Button
                                                size="small"
                                                disabled={cartItem.quantity_cart <= 1}
                                                onClick={async () => {
                                                    let quantity = cartItem.quantity_cart;
                                                    const carts = cart.map((item) => {
                                                        if (item._id === cartItem._id) {
                                                            return {
                                                                ...item,
                                                                quantity_cart: (quantity -= 1),
                                                            };
                                                        }
                                                        return item;
                                                    });
                                                    await patchDataAPI('addcart', { cart: carts }, user?.token);
                                                    dispatch(decrementQuantity(cartItem._id));
                                                }}
                                            >
                                                -
                                            </Button>
                                            <Input
                                                style={{ width: '40px', paddingLeft: '16px' }}
                                                size="small"
                                                value={cartItem.quantity_cart}
                                                onChange={async (e) => {
                                                    dispatch(
                                                        updateQuantity({
                                                            _id: cartItem._id,
                                                            quantity_cart: e.target.value,
                                                        })
                                                    );
                                                    const carts = cart.map((item) => {
                                                        if (item._id === cartItem._id) {
                                                            return {
                                                                ...item,
                                                                quantity_cart: e.target.value,
                                                            };
                                                        }
                                                        return item;
                                                    });
                                                    await patchDataAPI('addcart', { cart: carts }, user?.token);
                                                }}
                                            />

                                            <Button
                                                size="small"
                                                onClick={async () => {
                                                    let quantity = cartItem.quantity_cart;

                                                    const carts = cart.map((item) => {
                                                        if (item._id === cartItem._id) {
                                                            return {
                                                                ...item,
                                                                quantity_cart: (quantity += 1),
                                                            };
                                                        }
                                                        return item;
                                                    });
                                                    await patchDataAPI('addcart', { cart: carts }, user?.token);
                                                    dispatch(incrementQuantity(cartItem._id));
                                                }}
                                            >
                                                +
                                            </Button>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    ))
                ) : (
                    <div className="flex justify-center items-center w-full">
                        <Result
                            size="small"
                            status="404"
                            title="Giỏ hàng trống"
                            subTitle="Xin lỗi, Giỏ hàng quý khách chưa có."
                            extra={
                                <Button onClick={() => navigate('/shop')} type="primary">
                                    Mua ngay
                                </Button>
                            }
                        />
                    </div>
                )}
            </Row>
        </div>
    );
};

export default Cart;
