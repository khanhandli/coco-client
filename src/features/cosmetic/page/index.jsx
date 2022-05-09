import { Button, Col, Divider, Rate, Row, Skeleton, Tooltip } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDataAPI, patchDataAPI } from '../../../apis/fetchData';
import AppLayout from '../../../components/layouts/AppLayout';
import Filter from '../components/Filter';
import ItemProduct from '../components/ItemProduct';
import Search from '../components/Search';
import heart1 from '../../../assets/images/heart1.png';
import heart from '../../../assets/images/heart.png';
import { formatNumber } from '../../../utils/common';
import ShowMoreText from 'react-show-more-text';
import { addFavoriteInUser, removeFavoriteInUser } from '../../../redux/userSlice';
const CosmeticShop = () => {
    const categories = useSelector((state) => state.categories);
    const product = useSelector((state) => state.product.products);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const { favorites } = user?.user;
    const [loading, setLoading] = React.useState(false);
    const [detailproduct, setDetailProduct] = React.useState({
        isShow: false,
        data: {},
    });
    const [sort, setSort] = React.useState('new');
    const [category, setCategory] = React.useState([]);
    const [page, setPage] = React.useState(1);

    return (
        <AppLayout>
            <div className="flex w-full h-full">
                <div className="w-[240px] border-t-[1px] border-r-[1px] border-[#f2ecec] h-full overflow-y-auto custom_scroll">
                    <div>
                        <div className="h-[50px] font-bold text-lg border-[#f2ecec] border-b-[1px] flex items-center">
                            Tìm kiếm theo
                        </div>
                        <Filter
                            setSort={setSort}
                            setPage={setPage}
                            category={category}
                            setCategory={setCategory}
                            categories={categories}
                            loading={loading}
                        />
                    </div>
                </div>
                <div className="transition-all custom_scroll flex-1 px-[30px] pt-[10px] overflow-y-scroll pb-6">
                    <Search sort={sort} setSort={setSort} />

                    <div
                        className={`transition-all grid ${
                            detailproduct.isShow ? 'grid-cols-3' : 'grid-cols-3 2xl:grid-cols-4'
                        } gap-6`}
                    >
                        {product &&
                            product.length > 0 &&
                            product.map(
                                (item, index) =>
                                    index < 8 * page && (
                                        <ItemProduct
                                            user={user}
                                            setDetailProduct={setDetailProduct}
                                            key={index}
                                            item={item}
                                        />
                                    )
                            )}
                    </div>
                    <div className="flex justify-center mt-6">
                        {product.length > 8 && 8 * page < product.length && (
                            <button
                                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                onClick={() => setPage(page + 1)}
                            >
                                Tải thêm
                            </button>
                        )}
                    </div>
                </div>
                <div className={`relative transition-all ${detailproduct.isShow ? 'w-[340px]' : 'w-0'} `}>
                    <div className={`${detailproduct.isShow ? 'block h-full' : 'hidden'}`}>
                        <div className="px-[30px] pt-[20px] h-full">
                            <div className="h-full flex flex-col items-center justify-between">
                                <img className="h-[190px] w-[190px]" src={detailproduct?.data?.image} alt="detail" />
                                <div className="flex-1 text-[18px] no_scroll overflow-y-auto">
                                    <h2 className="font-mono  font-bold">{detailproduct?.data?.title}</h2>
                                    <div className="flex flex-col">
                                        <div className="flex items-center">
                                            <Rate allowHalf defaultValue={2.5} style={{ fontSize: '14px' }} />
                                            <span className="ml-2 text-[15px]">(12)</span>
                                        </div>

                                        <div className="flex mt-2 items-center">
                                            <div className="h-full text-[15px]">
                                                <span>Đã bán: </span>
                                                <span className="font-bold underline">123</span>
                                            </div>
                                            <div className="mx-3 mb-1">|</div>
                                            <div className="h-full text-[15px]">
                                                <span>Đánh giá: </span>
                                                <span className="font-bold underline">123</span>
                                            </div>
                                        </div>

                                        <h3 className="mt-1 text-[16px] text-[#ee4d2d]">
                                            ₫
                                            <span className="text-[20px]">
                                                {formatNumber(detailproduct?.data?.price)}
                                            </span>
                                        </h3>
                                        <div className="text-[13px] text-[#cdcaca] font-medium">
                                            <ShowMoreText
                                                lines={3}
                                                more="Xem thêm"
                                                less="Ẩn bớt"
                                                className="content-css"
                                                anchorclassName="my-anchor-css-class"
                                                // onClick={this.executeOnClick}
                                                expanded={false}
                                                truncatedEndingComponent={'... '}
                                            >
                                                <div
                                                    className="custom_desc"
                                                    dangerouslySetInnerHTML={{
                                                        __html:
                                                            detailproduct.data.description &&
                                                            detailproduct?.data?.description.replace(
                                                                /margin-bottom/g,
                                                                ''
                                                            ),
                                                    }}
                                                />
                                            </ShowMoreText>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between w-full bg-[rgba(0,0,0,.1)] px-6 py-2 rounded-3xl">
                                    {favorites && favorites?.includes(detailproduct?.data?._id) ? (
                                        <div className=" bg-[#ffc0cb73] p-2 rounded-xl flex items-center">
                                            <img
                                                onClick={async () => {
                                                    dispatch(removeFavoriteInUser(detailproduct.data._id));
                                                    const removeFavorite = favorites.filter(
                                                        (favorite) => favorite !== detailproduct.data._id
                                                    );
                                                    await patchDataAPI(
                                                        'addFavorite',
                                                        { favorites: removeFavorite },
                                                        user?.token
                                                    );
                                                }}
                                                className="h-[20px] w-[20px] cursor-pointer hover:brightness-75"
                                                src={heart}
                                                alt="heart"
                                            />
                                        </div>
                                    ) : (
                                        <div className="p-2">
                                            <Tooltip placement="top" title="Yêu thích sản phẩm">
                                                <img
                                                    onClick={async () => {
                                                        dispatch(addFavoriteInUser(detailproduct.data._id));
                                                        await patchDataAPI(
                                                            'addFavorite',
                                                            { favorites: [...favorites, detailproduct.data._id] },
                                                            user?.token
                                                        );
                                                    }}
                                                    className=" h-[26px] w-[26px] cursor-pointer hover:brightness-75"
                                                    src={heart1}
                                                    alt="heart1"
                                                />
                                            </Tooltip>
                                        </div>
                                    )}
                                    <button
                                        type="button"
                                        className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-full text-sm px-5 py-2.5 text-center "
                                    >
                                        Thêm vào giỏ hàng
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div
                            onClick={() => setDetailProduct(false)}
                            className="absolute top-0 right-0 font-bold text-xl cursor-pointer hover:opacity-80"
                        >
                            X
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default CosmeticShop;
