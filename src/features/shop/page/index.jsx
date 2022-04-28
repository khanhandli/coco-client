import React from 'react';
import AppLayout from '../../../components/layouts/AppLayout';
import cosmetics from '../../../assets/images/cosmetics.png';
import shopcosmetics from '../../../assets/images/shopcosmetics.png';
import { Rate } from 'antd';
import HotSaleComponent from '../components/HotSaleComponent';
import news from '../../../assets/images/new.png';
import left_arrow from '../../../assets/images/left_arrow.png';
import OutstandingComponent from '../components/OutstandingComponent';
import PromotionComponent from '../components/PromotionComponent';
import banner1 from '../../../assets/images/banner-giua-trang-1.png';
import banner2 from '../../../assets/images/banner-giua-trang_2.png';
import banner3 from '../../../assets/images/banner3.png';

const ShopPage = () => {
    return (
        <AppLayout>
            <div className=" w-full">
                <div className="flex justify-between w-full items-center">
                    <div className="flex flex-col">
                        <span className="text-5xl font-bold text_gradient">COCOSHOP</span>
                        <span className="text-2xl font-medium mt-3 text-[#515270] ml-2">Cosmetics Paradise</span>
                    </div>
                    <div className="flex">
                        <img src={cosmetics} alt="cosmetics" />
                        <div className="w-[160px] hover:bg-[#f1f1f1] cursor-pointer relative p-[20px] ml-12 rounded-2xl shadow-sm h-initial border-[1px]">
                            <img src={shopcosmetics} alt="shopcosmetics" />
                            <div className="ml-[50%] mt-[-8px]">
                                <span className="font-medium text-lg">4.8/</span>
                                <span className="text-md">5</span>
                            </div>
                            <div className="absolute bottom-[6px] right-4">
                                <Rate className="rate_custom" disabled defaultValue={5} style={{ fontSize: '11px' }} />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-3 gap-16 mt-[60px] w-[80%] mb-[90px]">
                    <HotSaleComponent />
                    <div>
                        <div className="h-[360px] rounded-2xl bg-[#ffa90e]">123</div>
                    </div>
                    <div>
                        <div className="h-[360px] rounded-2xl bg-[#1ce6ca]">123</div>
                    </div>
                </div>
                <OutstandingComponent />
                <div className="mt-16">
                    <div className="flex">
                        <div className="flex-1 mr-1">
                            <img className="object-cover" src={banner1} alt="banner1" />
                        </div>
                        <div className="flex-1 ml-1">
                            <img className="object-cover" src={banner2} alt="banner2" />
                        </div>
                    </div>
                    <img src={banner3} alt="banner3" />
                </div>
                <PromotionComponent />
            </div>
        </AppLayout>
    );
};

export default ShopPage;
