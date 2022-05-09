import React from 'react';
import { Link } from 'react-router-dom';

const HomeHeader = () => {
    return (
        <div className="flex justify-between">
            <div className="w-[220px] relative pl-11 font-bold text-xl">
                <Link to="/">
                    <div className="flex justify-end items-center absolute h-[40px] w-[40px] top-[50%] -translate-y-1/2 left-0 bg-[#f4de4d] rounded-full">
                        <span className="text-black -mr-1 mb-[2px] text-2xl">Co</span>
                    </div>
                    <span className="text-black">CoShop</span>
                </Link>
            </div>

            <div className="flex-1 flex justify-between">
                <div>Seach</div>
                <div className="flex">
                    <Link to="/home">
                        <div className="hover:text-blue-400 text-black mx-[40px] font-bold text-[18px] font-mono">
                            Cửa hàng
                        </div>
                    </Link>
                    <Link to="/">
                        <div className="hover:text-blue-400 text-black mx-[40px] font-bold text-[18px] font-mono">
                            FAQS
                        </div>
                    </Link>
                    <Link to="/">
                        <div className="hover:text-blue-400 text-black mx-[40px] font-bold text-[18px] font-mono">
                            Blogs
                        </div>
                    </Link>
                    <Link to="/">
                        <div className="hover:text-blue-400 text-black mx-[40px] font-bold text-[18px] font-mono">
                            Pricing
                        </div>
                    </Link>
                    <Link to="/login">
                        <div className="hover:text-blue-400 text-black ml-[40px] font-bold text-[18px] font-mono">
                            Đăng nhập / Đăng ký
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomeHeader;
