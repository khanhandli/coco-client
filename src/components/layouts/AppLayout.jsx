import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import HeaderLayout from './HeaderLayout';
import home from '../../assets/images/home.png';
import shop from '../../assets/images/shop.png';
import cartShopping from '../../assets/images/shopping.png';
import history from '../../assets/images/history.png';
import setting from '../../assets/images/settings.png';
import { useSelector } from 'react-redux';

const AppLayout = ({ children }) => {
    const { pathname } = useLocation();
    const user = useSelector((state) => state.user);
    return (
        <div className="p-[24px] bg-[#d8e0e4] min-h-screen w-full flex flex-col">
            <div className="flex flex-col bg-[#f2f4f5] border-4 rounded-[30px] border-white flex-1 p-[10px] lg:p-[30px]">
                <HeaderLayout />
                <div className="flex flex-1 px-[20px]">
                    <div className="w-[66px] 2xl:w-[210px] my-[60px]">
                        <div className="flex flex-col">
                            <Link
                                to="/home"
                                className={`pl-6 mb-4 cursor-pointer hover:text-black  ${
                                    pathname.includes('/home') ? 'bg-[#fff] shadow-lg ' : ''
                                } hover:bg-[#fff] flex text-black items-center h-[56px] rounded-tl-2xl rounded-bl-2xl`}
                            >
                                <span>
                                    <img src={home} className="h-[20px]" alt="home" />
                                </span>
                                <span
                                    className={`ml-2 hidden 2xl:inline-block ${
                                        pathname.includes('/home') ? 'font-bold' : 'font-medium'
                                    } text-[16px]`}
                                >
                                    Trang chủ
                                </span>
                            </Link>
                            <Link
                                to="/shop"
                                className={`pl-6 mb-4 cursor-pointer hover:text-black ${
                                    pathname.includes('/shop') ? 'bg-[#fff] shadow-lg ' : ''
                                } hover:bg-[#fff] flex text-black items-center h-[56px] rounded-tl-2xl rounded-bl-2xl`}
                            >
                                <span>
                                    <img src={shop} className="h-[20px]" alt="home" />
                                </span>
                                <span
                                    className={`ml-2 hidden 2xl:inline-block ${
                                        pathname.includes('/shop') ? 'font-bold' : 'font-medium'
                                    } text-[16px]`}
                                >
                                    Cửa hàng
                                </span>
                            </Link>
                            <Link
                                to="/cart"
                                className={`pl-6 mb-4 cursor-pointer hover:text-black ${
                                    pathname === '/cart' ? 'bg-[#fff] shadow-lg ' : ''
                                } hover:bg-[#fff] flex text-black items-center h-[56px] rounded-tl-2xl rounded-bl-2xl`}
                            >
                                <span>
                                    <img src={cartShopping} className="h-[20px]" alt="home" />
                                </span>
                                <span
                                    className={`ml-2 hidden 2xl:inline-block ${
                                        pathname === '/cart' ? 'font-bold' : 'font-medium'
                                    } text-[16px]`}
                                >
                                    Giỏ hàng
                                </span>
                            </Link>

                            <Link
                                to="/history"
                                className={`pl-6 mb-4 cursor-pointer hover:text-black ${
                                    pathname === '/history' ? 'bg-[#fff] shadow-lg ' : ''
                                } hover:bg-[#fff] flex text-black items-center h-[56px] rounded-tl-2xl rounded-bl-2xl`}
                            >
                                <span>
                                    <img src={history} className="h-[20px]" alt="home" />
                                </span>
                                <span
                                    className={`ml-2 hidden 2xl:inline-block ${
                                        pathname === '/history' ? 'font-bold' : 'font-medium'
                                    } text-[16px]`}
                                >
                                    Lịch sử
                                </span>
                            </Link>

                            <Link
                                to="/setting"
                                className={`pl-6 mb-4 cursor-pointer hover:text-black ${
                                    pathname === '/setting' ? 'bg-[#fff] shadow-lg ' : ''
                                } hover:bg-[#fff] flex text-black items-center h-[56px] rounded-tl-2xl rounded-bl-2xl`}
                            >
                                <span>
                                    <img src={setting} className="h-[20px]" alt="home" />
                                </span>
                                <span
                                    className={`ml-2 hidden 2xl:inline-block ${
                                        pathname === '/setting' ? 'font-bold' : 'font-medium'
                                    } text-[16px]`}
                                >
                                    Cài đặt
                                </span>
                            </Link>
                        </div>
                    </div>
                    <div className="flex-1 bg-[#ffffff] shadow-xl flex  h-[calc(100vh-194px)] rounded-[50px] p-[30px]">
                        <div className="w-full overflow-x-hidden custom_scroll overflow-auto rounded-[50px] p-[20px]">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppLayout;
