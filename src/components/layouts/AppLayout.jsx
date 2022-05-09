import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import HeaderLayout from './HeaderLayout';
import home from '../../assets/images/home.png';
import shop from '../../assets/images/shop.png';

const AppLayout = ({ children }) => {
    const { pathname } = useLocation();
    return (
        <div className="p-[24px] bg-[#d8e0e4] min-h-screen w-full flex flex-col">
            <div className="flex flex-col bg-[#f2f4f5] border-4 rounded-[30px] border-white flex-1 p-[30px]">
                <HeaderLayout />
                <div className="flex flex-1 px-[20px]">
                    <div className="w-[210px] my-[60px]">
                        <div className="flex flex-col">
                            <Link
                                to="/home"
                                className={`pl-6 mb-4 cursor-pointer hover:text-black  ${
                                    pathname === '/home' ? 'bg-[#fff] shadow-lg ' : ''
                                } hover:bg-[#fff] flex text-black items-center h-[56px] rounded-tl-2xl rounded-bl-2xl`}
                            >
                                <span>
                                    <img src={home} className="h-[20px]" alt="home" />
                                </span>
                                <span
                                    className={`ml-2 ${pathname === '/home' ? 'font-bold' : 'font-medium'} text-[16px]`}
                                >
                                    Trang chủ
                                </span>
                            </Link>
                            <Link
                                to="/shop"
                                className={`pl-6 mb-4 cursor-pointer hover:text-black ${
                                    pathname === '/shop' ? 'bg-[#fff] shadow-lg ' : ''
                                } hover:bg-[#fff] flex text-black items-center h-[56px] rounded-tl-2xl rounded-bl-2xl`}
                            >
                                <span>
                                    <img src={shop} className="h-[20px]" alt="home" />
                                </span>
                                <span
                                    className={`ml-2 ${pathname === '/shop' ? 'font-bold' : 'font-medium'} text-[16px]`}
                                >
                                    Cửa hàng
                                </span>
                            </Link>
                            <div
                                className={`pl-6 mb-4 cursor-pointer hover:text-black ${
                                    pathname === '/history' ? 'bg-[#fff] shadow-lg ' : ''
                                } hover:bg-[#fff] flex text-black items-center h-[56px] rounded-tl-2xl rounded-bl-2xl`}
                            >
                                Lịch sử
                            </div>
                            <div
                                className={`pl-6 mb-4 cursor-pointer hover:text-black ${
                                    pathname === '/contact' ? 'bg-[#fff] shadow-lg ' : ''
                                } hover:bg-[#fff] flex text-black items-center h-[56px] rounded-tl-2xl rounded-bl-2xl`}
                            >
                                Liên hệ
                            </div>
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
