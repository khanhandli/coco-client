import { Rate } from 'antd';
import React from 'react';
import cosmetics from '../../../assets/images/cosmetics.png';

const HotSaleComponent = () => {
    return (
        <div>
            <div className="h-[360px] rounded-2xl bg-[#9666f6] flex flex-col items-center">
                <div className="flex-1">
                    <img src={cosmetics} className="scale-150 w-[128px] h-[128px] object-cover" alt="shopcosmetics" />
                </div>
                <div className="flex-1 flex flex-col items-start w-full px-6 mt-3">
                    <div className="px-3 font-bold py-1 bg-white rounded-full">
                        <div className="text-left">Hot Sales</div>
                    </div>
                    <div className="mt-4 mb-1 text-lg text-[#f6e2ff] font-mono">Title</div>
                    <div>
                        <Rate disabled defaultValue={2} style={{ fontSize: '14px' }} />
                    </div>
                    <div className="mt-4 flex justify-between items-center w-full text-white">
                        <span className="text-lg font-bold">$40.01</span>
                        <span className="text-md line-through font-bold">$40.01</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotSaleComponent;
