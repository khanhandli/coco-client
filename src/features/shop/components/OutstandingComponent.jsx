import React from 'react';
import news from '../../../assets/images/new.png';
import left_arrow from '../../../assets/images/left_arrow.png';
import cosmetics from '../../../assets/images/cosmetics.png';

const OutstandingComponent = () => {
    return (
        <div className="flex">
            <div className="w-[260px] h-min bg-[#e7e7f5] rounded-xl p-[40px]">
                <span className="text-[#6e6a87] font-bold text-[15px]">SẢN PHẨM NỔI BẬT</span>
                <div className="flex items-center mt-12 justify-between">
                    <img src={news} height="100" width="100" alt="news" />
                    <div>
                        <img src={left_arrow} alt="left_arrow" />
                    </div>
                </div>
            </div>
            <div className="flex-1">
                <div class="grid grid-cols-4 gap-12 h-full mx-10">
                    <div className="h-full flex items-center justify-center">
                        <div className="relative w-4/5 bg-white h-2/3 flex justify-between items-center flex-col rounded-2xl shadow-md border">
                            <div className="-translate-y-[50%] absolute rounded-2xl">
                                <img src={cosmetics} alt="cosmetics" />
                            </div>
                            <div className="flex-1"></div>
                            <div className="flex-1 flex flex-col items-center">
                                <span className="text-[14px] font-bold mb-2">Title</span>
                                <span className="text-xl font-bold font-mono">$125.00</span>
                            </div>
                        </div>
                    </div>
                    <div className="h-full flex items-center justify-center">
                        <div className=" w-4/5 bg-white h-2/3 rounded-2xl shadow-md border"></div>
                    </div>
                    <div className="h-full flex items-center justify-center">
                        <div className=" w-4/5 bg-white h-2/3 rounded-2xl shadow-md border"></div>
                    </div>
                    <div className="h-full flex items-center justify-center">
                        <div className=" w-4/5 bg-[#5b4ebb] hover:bg-[#4739ad] cursor-pointer h-2/3 rounded-2xl shadow-md border">
                            <div className="px-6 p-4">
                                <div className="text-2xl font-bold text-white">Xem</div>
                                <div className="text-2xl font-bold text-white mt-2">Thêm</div>
                                <div className="mt-3 bg-white w-max p-2 rounded-full">
                                    <img src={left_arrow} alt="left_arrow" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OutstandingComponent;
