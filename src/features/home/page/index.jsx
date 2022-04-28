import React from 'react';
import { getDataAPI } from '../../../apis/fetchData';
import _ from 'lodash';
import { Spin } from 'antd';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [detailBanners, setDetailBanners] = React.useState({});
    const [listExplore, setEditExplore] = React.useState([]);

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
                    <div className="flex justify-between">
                        <div className="w-[220px] relative pl-11 font-bold text-xl">
                            <div className="flex justify-end items-center absolute h-[40px] w-[40px] top-[50%] -translate-y-1/2 left-0 bg-[#f4de4d] rounded-full">
                                <span className="-mr-1 mb-[2px] text-2xl">Co</span>
                            </div>
                            CoShop
                        </div>
                        <div className="flex-1 flex justify-between">
                            <div>Seach</div>
                            <div className="flex">
                                <Link to="/shop">
                                    <div className="hover:text-blue-400 text-black mx-[40px] font-bold text-lg">
                                        Cửa hàng
                                    </div>
                                </Link>
                                <Link to="/">
                                    <div className="hover:text-blue-400 text-black mx-[40px] font-bold text-lg">
                                        FAQS
                                    </div>
                                </Link>
                                <Link to="/">
                                    <div className="hover:text-blue-400 text-black mx-[40px] font-bold text-lg">
                                        Blogs
                                    </div>
                                </Link>
                                <Link to="/">
                                    <div className="hover:text-blue-400 text-black mx-[40px] font-bold text-lg">
                                        Pricing
                                    </div>
                                </Link>
                                <Link to="/">
                                    <div className="hover:text-blue-400 text-black ml-[40px] font-bold text-lg">
                                        Đăng nhập / Đăng ký
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 flex mt-[40px]">
                        <div className="w-[220px]">
                            <h2 className="font-bold text-[30px] mb-[30px]">Explore</h2>
                            <div>
                                {listExplore?.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center mb-[26px] hover:opacity-70 cursor-pointer"
                                    >
                                        <img className="w-[23px] h-[23px]" src={item.image} alt="item" />
                                        <span className="text-[15px] font-medium pl-[12px]">{item.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col ml-[40px]">
                            <div className="flex-1 grid grid-flow-col gap-2 xl:gap-4 mb-4">
                                <div
                                    style={{
                                        background: `url("${detailBanners.data.banner_1.image}") round`,
                                    }}
                                    className="bg_1 row-[span_11_/_span_11] xl:row-[span_12_/_span_12] col-span-6 rounded-[30px]"
                                />
                                <div
                                    style={{
                                        background: `url("${detailBanners.data.banner_2.image}") round`,
                                    }}
                                    className="bg_2 row-[span_11_/_span_11] xl:row-[span_12_/_span_12] col-span-6 rounded-[30px]"
                                ></div>
                                <div
                                    style={{
                                        background: `url("${detailBanners.data.banner_3.image}") round`,
                                    }}
                                    className="bg_3 col-span-2 row-[span_22_/_span_22] xl:row-[span_24_/_span_22] rounded-[30px]"
                                ></div>
                                <div
                                    style={{
                                        background: `url("${detailBanners.data.banner_4.image}") round`,
                                    }}
                                    className="bg_4 col-span-2 row-[span_22_/_span_22] xl:row-[span_24_/_span_24] rounded-[30px]"
                                ></div>
                            </div>
                            <div className="flex-1 grid grid-flow-col gap-2 xl:gap-4">
                                <div
                                    style={{
                                        background: `url("${detailBanners.data.banner_5.image}") round`,
                                    }}
                                    className="bg_4 rounded-[30px] col-span-2 row-[span_22_/_span_22] xl:row-[span_24_/_span_22]"
                                ></div>
                                <div
                                    style={{
                                        background: `url("${detailBanners.data.banner_6.image}") round`,
                                    }}
                                    className="bg_4 rounded-[30px] col-span-2 row-[span_22_/_span_22] xl:row-[span_24_/_span_22]"
                                ></div>
                                <div
                                    style={{
                                        background: `url("${detailBanners.data.banner_7.image}") round`,
                                    }}
                                    className="bg_1 rounded-[30px] row-[span_11_/_span_11] xl:row-[span_12_/_span_12] col-span-6"
                                ></div>
                                <div
                                    style={{
                                        background: `url("${detailBanners.data.banner_8.image}") round`,
                                    }}
                                    className="bg_2 rounded-[30px] row-[span_11_/_span_11] xl:row-[span_12_/_span_12] col-span-6"
                                ></div>
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
