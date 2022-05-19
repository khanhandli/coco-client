import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { logOut } from '../../redux/userSlice';

const styleActive = 'hover:text-blue-400 text-black mx-[40px] font-bold text-[18px] font-mono underline';
const styleNotActive = 'hover:text-blue-400 text-black mx-[40px] font-bold text-[18px] font-mono';

const HomeHeader = () => {
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

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
                    {/* <Link to="/">
                        <div className="hover:text-blue-400 text-black mx-[40px] font-bold text-[18px] font-mono">
                            FAQS
                        </div>
                    </Link> */}
                    <Link to="/blog">
                        <div className={pathname.includes('blog') ? styleActive : styleNotActive}>Blogs</div>
                    </Link>
                    {/* <Link to="/">
                        <div className="hover:text-blue-400 text-black mx-[40px] font-bold text-[18px] font-mono">
                            Pricing
                        </div>
                    </Link> */}
                    {user?.token ? (
                        <div
                            onClick={() => {
                                dispatch(logOut());
                                localStorage.removeItem('firstLogin');
                            }}
                            className="hover:text-blue-400 text-black ml-[40px] font-bold text-[18px] font-mono"
                        >
                            Thoát
                        </div>
                    ) : (
                        <Link to="/login">
                            <div className="hover:text-blue-400 text-black ml-[40px] font-bold text-[18px] font-mono">
                                Đăng nhập / Đăng ký
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomeHeader;
