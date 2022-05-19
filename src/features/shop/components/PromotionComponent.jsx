import React from 'react';
import promotion from '../../../assets/images/promotion.png';
import left_arrow from '../../../assets/images/left_arrow.png';
import cosmetics from '../../../assets/images/cosmetics.png';
import { formatNumber } from '../../../utils/common';
import { Link, useNavigate } from 'react-router-dom';

const PromotionComponent = ({ products }) => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col lg:flex-row mt-16">
            <div className="w-[180px] lg:w-[260px] h-min bg-[#dfb0de] rounded-xl p-[40px]">
                <span className="text-[#6e6a87] font-bold text-[15px]">SẢN PHẨM KHUYẾN MẠI</span>
                <div className="flex items-center mt-5 lg:mt-12 justify-between">
                    <img src={promotion} className="w-[50px] h-[50px] lg:w-[100px] lg:h-[100px]" alt="promotion" />
                    <div>
                        <img src={left_arrow} alt="left_arrow" />
                    </div>
                </div>
            </div>
            <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-12 h-full mx-0 lg:mx-10">
                    {products &&
                        products.length > 0 &&
                        products
                            .filter((item) => item?.promotion)
                            .map(
                                (product, index) =>
                                    index < 3 && (
                                        <div
                                            onClick={() => {
                                                navigate('/shop/detail/' + product._id);
                                            }}
                                            key={index}
                                            className="mt-10 lg:mt-0 h-[200px] lg:h-full transition-all hover:opacity-80 cursor-pointer flex items-center justify-center"
                                        >
                                            <div className="relative w-[240px] bg-white h-2/3 flex justify-between items-center flex-col rounded-2xl shadow-md border">
                                                <div className="-translate-y-[50%] absolute rounded-2xl">
                                                    <img
                                                        className="hover:scale-125 h-[120px] w-[120px] rounded-full"
                                                        src={product.image}
                                                        alt="cosmetics"
                                                    />
                                                </div>
                                                <div className="flex-1"></div>
                                                <div className="flex-1 flex flex-col items-center overflow-hidden ">
                                                    <span className="text-[14px] font-bold mb-2 truncate w-[240px] px-6 text-left">
                                                        {product.title}
                                                    </span>
                                                    <span className="text-xl font-bold font-mono">
                                                        ${formatNumber(product.price)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                            )}

                    <Link to="/shop/promotion/sale">
                        <div className="h-[280px] lg:h-full items-center justify-center">
                            <div className=" w-4/5 bg-[#ffa90e] hover:bg-[#d08e12] cursor-pointer h-2/3 rounded-2xl shadow-md border">
                                <div className="px-6 p-4">
                                    <div className="text-2xl font-bold text-white">Xem</div>
                                    <div className="text-2xl font-bold text-white mt-2">Thêm</div>
                                    <div className="mt-3 bg-white w-max p-2 rounded-full">
                                        <img src={left_arrow} alt="left_arrow" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PromotionComponent;
