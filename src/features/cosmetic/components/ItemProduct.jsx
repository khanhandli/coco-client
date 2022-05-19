import { Rate, Tooltip } from 'antd';
import React from 'react';
import addcartimg from '../../../assets/images/addcart.png';
import { formatNumber, getNotification } from '../../../utils/common';
import heart1 from '../../../assets/images/heart1.png';
import heart from '../../../assets/images/heart.png';
import { useDispatch } from 'react-redux';
import { addFavoriteInUser, removeFavoriteInUser, addCart } from '../../../redux/userSlice';
import { patchDataAPI } from '../../../apis/fetchData';
import { Link } from 'react-router-dom';

const ItemProduct = ({ item, setDetailProduct, user, isDetail }) => {
    const dispatch = useDispatch();
    const { favorites, cart } = user?.user;
    return (
        <div className="relative border border-[#f3f3f3] transition-all max-w-sm bg-white rounded-lg shadow-lg">
            <div className="rounded-t-lg">
                <img
                    onClick={() => setDetailProduct({ isShow: true, data: item })}
                    className="hover:scale-110 cursor-pointer p-8 rounded-t-lg h-full w-full max-h-[260px] object-cover"
                    src={item.image}
                    alt="product image"
                />
            </div>
            <div className="px-5 pb-5">
                <Tooltip placement="top" title={item.title}>
                    <h5 className="truncate text-[17px] font-semibold tracking-tight text-gray-900">{item.title}</h5>
                </Tooltip>

                <div className="flex items-center mt-2.5 mb-3">
                    <Rate allowHalf defaultValue={2.5} style={{ fontSize: '14px' }} />
                </div>
                <div className="flex justify-between items-center">
                    <div>
                        <div className="text-md text-[#ccc]">Giá</div>
                        <span className="text-lg font-bold text-gray-900">${formatNumber(item.price)}</span>
                    </div>
                    <button className="relative inline-flex items-center justify-center p-[1px] overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white  focus:ring-2 focus:outline-none focus:ring-green-200 ">
                        {isDetail ? (
                            <Link to={'/shop/detail/' + item._id}>
                                <button
                                    type="button"
                                    className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200  font-medium rounded-lg text-sm px-4 py-2 text-center"
                                >
                                    Mua ngay
                                </button>
                            </Link>
                        ) : (
                            <span
                                onClick={async () => {
                                    if (!user.token) {
                                        return getNotification(
                                            'Vui lòng đăng nhập để thực hiện chức năng này',
                                            'warning'
                                        );
                                    }
                                    const check = cart.every((cartItem) => {
                                        return cartItem._id !== item._id;
                                    });
                                    if (check) {
                                        dispatch(addCart(item));

                                        await patchDataAPI(
                                            'addcart',
                                            { cart: [...cart, { ...item, quantity_cart: 1 }] },
                                            user?.token
                                        );
                                    } else {
                                        getNotification('Sản phẩm đã có trong giỏ hàng', 'warning');
                                    }
                                }}
                                className="relative px-2 py-1 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0"
                            >
                                <Tooltip placement="top" title="Thêm vào giỏ hàng">
                                    <img className="h-[28px] w-[28px]" src={addcartimg} alt="addcart" />
                                </Tooltip>
                            </span>
                        )}
                    </button>
                </div>
            </div>
            {favorites?.includes(item._id) ? (
                <div className="absolute top-4 right-4 bg-[#ffc0cb73] p-2 rounded-xl">
                    <img
                        onClick={async () => {
                            if (!user.token) {
                                return getNotification('Vui lòng đăng nhập để thực hiện chức năng này', 'warning');
                            }
                            dispatch(removeFavoriteInUser(item._id));
                            const removeFavorite = favorites.filter((favorite) => favorite !== item._id);
                            await patchDataAPI('addFavorite', { favorites: removeFavorite }, user?.token);
                        }}
                        className="h-[20px] w-[20px] cursor-pointer hover:brightness-75"
                        src={heart}
                        alt="heart"
                    />
                </div>
            ) : (
                <div className="absolute top-4 right-4  p-2">
                    <Tooltip placement="top" title="Yêu thích sản phẩm">
                        <img
                            onClick={async () => {
                                if (!user.token) {
                                    return getNotification('Vui lòng đăng nhập để thực hiện chức năng này', 'warning');
                                }

                                dispatch(addFavoriteInUser(item._id));
                                await patchDataAPI('addFavorite', { favorites: [...favorites, item._id] }, user?.token);
                            }}
                            className=" h-[26px] w-[26px] cursor-pointer hover:brightness-75"
                            src={heart1}
                            alt="heart1"
                        />
                    </Tooltip>
                </div>
            )}
        </div>
    );
};

export default ItemProduct;
