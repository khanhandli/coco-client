import React from 'react';
import { getDataAPI } from '../../../apis/fetchData';
import _ from 'lodash';
import { Badge, Rate, Spin } from 'antd';
import { Link } from 'react-router-dom';
import HomeHeader from '../../../components/layouts/HomeHeader';
import { useSelector } from 'react-redux';
import HotSaleComponent from '../../shop/components/HotSaleComponent';
import { formatNumber } from '../../../utils/common';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    const [detailBanners, setDetailBanners] = React.useState({});
    const [listExplore, setEditExplore] = React.useState([]);
    console.log('🚀 ~ file: index.jsx ~ line 17 ~ HomePage ~ listExplore', listExplore);
    const product = useSelector((state) => state.product.products);

    React.useEffect(() => {
        (async () => {
            const res = await getDataAPI('promotion');
            if (res.status === 200) {
                setTimeout(() => {
                    setDetailBanners(res.data.banners[0]);
                    setEditExplore(res.data.explores);
                }, 1800);
            }
        })();
    }, []);

    return (
        <div className="px-[60px] py-[30px] flex flex-col h-screen">
            {!_.isEmpty(detailBanners) && detailBanners?.data?.banner_1 ? (
                <>
                    <HomeHeader />
                    <div className="flex-1 flex mt-[40px]">
                        <div className="w-[220px]">
                            <h2 className="font-bold text-[30px] mb-[30px]">Explore</h2>
                            <div>
                                {listExplore?.map((item, index) => (
                                    <Link
                                        to={`/shop/promotion/${item._id}`}
                                        state={{ name: item.name, id_promotion: item?.promotion?._id }}
                                    >
                                        <div
                                            key={index}
                                            className="text-black flex items-center mb-[26px] hover:opacity-70 cursor-pointer"
                                        >
                                            <img className="w-[23px] h-[23px]" src={item.image} alt="item" />
                                            <span className="text-[15px] font-medium pl-[12px]">{item.name}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col ml-[40px]">
                            <div className="flex-1 grid grid-flow-col gap-2 xl:gap-4 mb-4">
                                <div
                                    style={{
                                        background: `url("${detailBanners.data.banner_1.image}") round`,
                                    }}
                                    className="relative hover:scale-[1.02] cursor-pointer bg_1 row-[span_11_/_span_11] xl:row-[span_12_/_span_12] col-span-7 rounded-[30px]"
                                >
                                    <Link
                                        to={`/shop/promotion/${detailBanners.data.banner_1.promotion}`}
                                        state={{
                                            name: detailBanners.data.banner_1.name,
                                            id_promotion: detailBanners.data.banner_1.promotion,
                                        }}
                                    >
                                        <div className="h-full w-full">
                                            <span className="text-red-400 font-bold font-mono text-2xl absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">
                                                {detailBanners.data.banner_1.name}
                                            </span>
                                        </div>
                                    </Link>
                                </div>

                                <div
                                    style={{
                                        background: `url("${detailBanners.data.banner_2.image}") round`,
                                    }}
                                    className="relative hover:scale-[1.02] cursor-pointer bg_2 row-[span_11_/_span_11] xl:row-[span_12_/_span_12] col-span-7 rounded-[30px]"
                                >
                                    <Link
                                        to={`/shop/promotion/${detailBanners.data.banner_2.promotion}`}
                                        state={{
                                            name: detailBanners.data.banner_2.name,
                                            id_promotion: detailBanners.data.banner_2.promotion,
                                        }}
                                    >
                                        <div className="h-full w-full">
                                            <span className="text-white font-bold font-mono text-2xl absolute right-6 top-2/3 -translate-y-1/2">
                                                {detailBanners.data.banner_2.name}
                                            </span>
                                        </div>
                                    </Link>
                                </div>
                                <div
                                    style={{
                                        background: `url("${detailBanners.data.banner_3.image}") center no-repeat`,
                                    }}
                                    className="relative hover:scale-[1.02] cursor-pointer bg_3 col-span-3 row-[span_22_/_span_22] xl:row-[span_24_/_span_22] rounded-[30px]"
                                >
                                    <Link
                                        to={`/shop/promotion/${detailBanners.data.banner_3.promotion}`}
                                        state={{
                                            name: detailBanners.data.banner_3.name,
                                            id_promotion: detailBanners.data.banner_3.promotion,
                                        }}
                                    >
                                        <div className="h-full w-full">
                                            <span className="text-red-400 font-bold font-mono text-2xl absolute left-1/2 bottom-2 -translate-x-1/2">
                                                {detailBanners.data.banner_3.name}
                                            </span>
                                        </div>
                                    </Link>
                                </div>
                                <div
                                    style={{
                                        background: `url("${detailBanners.data.banner_4.image}") center no-repeat`,
                                    }}
                                    className="relative hover:scale-[1.02] cursor-pointer bg_4 col-span-3 row-[span_22_/_span_22] xl:row-[span_24_/_span_24] rounded-[30px]"
                                >
                                    <Link
                                        to={`/shop/promotion/${detailBanners.data.banner_4.promotion}`}
                                        state={{
                                            name: detailBanners.data.banner_4.name,
                                            id_promotion: detailBanners.data.banner_4.promotion,
                                        }}
                                    >
                                        <div className="h-full w-full">
                                            <span className="text-red-400 font-bold font-mono text-2xl absolute left-1/2 bottom-2 -translate-x-1/2">
                                                {detailBanners.data.banner_4.name}
                                            </span>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="flex-1 flex justify-center items-center">
                                <div className="grid grid-cols-4 gap-4">
                                    {product &&
                                        product.length > 0 &&
                                        product
                                            .slice()
                                            .sort((a, b) => b?.discount - a?.discount)
                                            .map(
                                                (item, index) =>
                                                    index < 4 && (
                                                        <Badge.Ribbon
                                                            key={index}
                                                            text={'- ' + item.discount + ' %'}
                                                            color="cyan"
                                                        >
                                                            <div
                                                                className={`shadow-2xl px-2 py-6 min-h-[] rounded-2xl white flex flex-col items-center`}
                                                            >
                                                                <div className="flex-1">
                                                                    <img
                                                                        src={item.image}
                                                                        className="p-2 -translate-y-4 max-w-[128px] min-w-[126px] min-h-[126px] rounded-full shadow-xxl max-h-[128px] object-cover"
                                                                        alt="shopcosmetics"
                                                                    />
                                                                </div>
                                                                <div className="flex-1 flex flex-col items-start w-full px-6">
                                                                    <div className="mt-4 mb-1 text-lg text-[black] font-mono overflow_word">
                                                                        {item.title}
                                                                    </div>
                                                                    <div className="flex justify-center w-full mt-1">
                                                                        <button
                                                                            onClick={() =>
                                                                                navigate('/shop/detail/' + item._id)
                                                                            }
                                                                            class="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-full group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 focus:ring-4 focus:outline-none focus:ring-red-100"
                                                                        >
                                                                            <span class="relative px-5 py-2 transition-all ease-in duration-75 bg-white rounded-full group-hover:bg-opacity-0">
                                                                                Xem ngay
                                                                            </span>
                                                                        </button>
                                                                    </div>
                                                                    <div className="mt-2 flex justify-between items-center w-full text-black">
                                                                        <span className="text-lg font-bold">
                                                                            $
                                                                            {formatNumber(
                                                                                item.price -
                                                                                    item.price * (item.discount / 100)
                                                                            )}
                                                                        </span>
                                                                        <span className="text-md line-through font-bold">
                                                                            ${formatNumber(item.price)}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Badge.Ribbon>
                                                    )
                                            )}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="flex h-screen w-full items-center justify-center">
                    <Spin size="large" />
                </div>
            )}
        </div>
    );
};

export default HomePage;
