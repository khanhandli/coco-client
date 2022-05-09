import { Badge, Rate } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import cosmetics from '../../../assets/images/cosmetics.png';
import { formatNumber, getNotification } from '../../../utils/common';

const HotSaleComponent = ({ bg, item }) => {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    return (
        <Badge.Ribbon text={'- ' + item.discount + ' %'} color="cyan">
            <div className={`h-[390px] rounded-2xl ${bg} flex flex-col items-center`}>
                <div className="flex-1">
                    <img
                        src={item.image}
                        className="scale-150 p-2 -translate-y-4 w-[128px] rounded-full shadow-xxl h-[128px] object-cover"
                        alt="shopcosmetics"
                    />
                </div>
                <div className="flex-1 flex flex-col items-start w-full px-6">
                    <div className="w-full font-bold flex justify-between">
                        <div className="text-left bg-white px-4 py-1 rounded-full">Hot Sales</div>
                        <div
                            onClick={() => {
                                if (!user.token) {
                                    return getNotification('Vui lòng đăng nhập để thực hiện chức năng này', 'warning');
                                }

                                navigate('/shop/detail/' + item._id);
                            }}
                            className="text-left bg-[#f3f3f3] px-4 py-1 rounded-full bg-gradient-to-r from-teal-200 to-lime-200 cursor-pointer hover:opacity-80 font-medium"
                        >
                            Mua ngay
                        </div>
                    </div>
                    <div className="mt-4 mb-1 text-lg text-[#f1e9f4] font-mono">{item.title}</div>
                    <div>
                        <Rate disabled defaultValue={2} style={{ fontSize: '14px' }} />
                    </div>
                    <div className="mt-4 flex justify-between items-center w-full text-white">
                        <span className="text-lg font-bold">
                            ${formatNumber(item.price - item.price * (item.discount / 100))}
                        </span>
                        <span className="text-md line-through font-bold">${formatNumber(item.price)}</span>
                    </div>
                </div>
            </div>
        </Badge.Ribbon>
    );
};

export default HotSaleComponent;
