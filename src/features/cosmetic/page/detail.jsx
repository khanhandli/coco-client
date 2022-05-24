import { Col, Divider, PageHeader, Rate, Row, Tabs, Tooltip } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import AppLayout from '../../../components/layouts/AppLayout';
import { formatNumber, getNotification } from '../../../utils/common';
import heart1 from '../../../assets/images/heart1.png';
import heart from '../../../assets/images/heart.png';
import { getDataAPI, patchDataAPI } from '../../../apis/fetchData';
import { addCart, addFavoriteInUser, removeFavoriteInUser } from '../../../redux/userSlice';
import ReactShowMoreText from 'react-show-more-text';
import TabComment from '../components/TabComment';
import ItemProduct from '../components/ItemProduct';
const DetailProduct = () => {
    const { id } = useParams();
    const {
        user,
        product: { fullProduct },
    } = useSelector((state) => state);
    const [detailProduct, setDetailProduct] = React.useState(null);
    console.log('🚀 ~ file: detail.jsx ~ line 21 ~ DetailProduct ~ detailProduct', detailProduct);
    const { favorites, cart } = user?.user;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    React.useEffect(() => {
        const findProduct = fullProduct.filter((item) => item._id === id);

        setDetailProduct(findProduct[0]);
    }, [user.token, id]);

    function callback(key) {
        console.log(key);
    }

    const [comments, setComments] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        setLoading(true);
        getDataAPI(`comments/${id}?limit=${1 * 6}`)
            .then((res) => {
                setComments((r) => (r = res.data.comments));
            })
            .catch((err) => console.log(err.response.data.msg));
    }, [id]);

    React.useEffect(() => {
        if (user?.socket) {
            user?.socket.emit('joinRoom', id);
        }
    }, [user?.socket, id]);

    React.useEffect(() => {
        if (user?.socket) {
            user?.socket.on('sendCommentToClient', (msg) => {
                setComments([msg, ...comments]);
            });

            return () => user?.socket.off('sendCommentToClient');
        }
    }, [user?.socket, comments]);

    // Reply Comments
    React.useEffect(() => {
        if (user?.socket) {
            user?.socket.on('sendReplyCommentToClient', (msg) => {
                const newArr = [...comments];

                newArr.forEach((cm) => {
                    if (cm._id === msg._id) {
                        cm.reply = msg.reply;
                    }
                });

                setComments(newArr);
            });

            return () => user?.socket.off('sendReplyCommentToClient');
        }
    }, [user?.socket, comments]);

    return (
        <AppLayout>
            {detailProduct && (
                <div className="flex flex-col w-full h-full">
                    <PageHeader className="site-page-header" onBack={() => navigate(-1)} title={detailProduct.title} />
                    <div className="flex w-full mt-4 px-[40px]">
                        <div className="w-[400px] flex justify-center border py-12 shadow-sm rounded-sm border-[#f3f3f3]">
                            <img
                                className="w-[300px] h-[300px] object-cover"
                                src={detailProduct.image}
                                alt="shopcosmetics"
                            />
                        </div>
                        <div className="flex-1 pl-10">
                            <div className="flex justify-between items-center w-full">
                                <div className="uppercase font-bold font-mono">{detailProduct.category.name}</div>
                                <div>
                                    {favorites?.includes(detailProduct._id) ? (
                                        <div className="bg-[#ffc0cb73] p-2 rounded-xl">
                                            <img
                                                onClick={async () => {
                                                    if (!user.token) {
                                                        return getNotification(
                                                            'Vui lòng đăng nhập để thực hiện chức năng này',
                                                            'warning'
                                                        );
                                                    }
                                                    dispatch(removeFavoriteInUser(detailProduct._id));
                                                    const removeFavorite = favorites.filter(
                                                        (favorite) => favorite !== detailProduct._id
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
                                        <div className=" p-2">
                                            <Tooltip placement="top" title="Yêu thích sản phẩm">
                                                <img
                                                    onClick={async () => {
                                                        if (!user.token) {
                                                            return getNotification(
                                                                'Vui lòng đăng nhập để thực hiện chức năng này',
                                                                'warning'
                                                            );
                                                        }

                                                        dispatch(addFavoriteInUser(detailProduct._id));
                                                        await patchDataAPI(
                                                            'addFavorite',
                                                            { favorites: [...favorites, detailProduct._id] },
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
                                </div>
                            </div>
                            <h3 className="mt-2 text-[20px] font-normal w-[70%]">{detailProduct.title}</h3>
                            <div className="flex justify-between">
                                <div className="w-[70%]">
                                    <ReactShowMoreText
                                        lines={2}
                                        more="Xem thêm"
                                        less="Ẩn bớt"
                                        className="content-css"
                                        anchorclassName="my-anchor-css-class"
                                        // onClick={this.executeOnClick}
                                        expanded={false}
                                        truncatedEndingComponent={'... '}
                                    >
                                        <div
                                            className="custom_desc_detail"
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    detailProduct.description &&
                                                    detailProduct?.description.replace(/margin-bottom/g, ''),
                                            }}
                                        />
                                    </ReactShowMoreText>
                                </div>
                                <div>
                                    <div className="flex items-center h-min">
                                        {detailProduct?.rating ? (
                                            <div className="font-bold pt-1 mr-2">
                                                {Number(
                                                    (detailProduct?.rating / detailProduct?.numReviewers).toFixed(1)
                                                )}
                                            </div>
                                        ) : (
                                            <></>
                                        )}

                                        <Rate
                                            disabled
                                            allowHalf
                                            defaultValue={Number(
                                                (detailProduct?.rating / detailProduct?.numReviewers).toFixed(1)
                                            )}
                                            style={{ fontSize: '16px' }}
                                        />
                                    </div>
                                    {detailProduct?.numReviewers ? (
                                        <div className="underline text-right w-full text-[#888] mt-2">
                                            {detailProduct?.numReviewers} đánh giá
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </div>
                            <Divider style={{ height: '2px' }} />
                            <div className="flex">
                                {detailProduct.discount ? (
                                    <div className="flex">
                                        <div className="text-white shadow-md rounded-xl bg-red-500 p-3 flex flex-col items-center">
                                            <span className="text-[15px] font-bold">%{detailProduct.discount}</span>
                                            <span>Giảm giá</span>
                                        </div>
                                        <div className="ml-3">
                                            <div className="text-[#777] text-[14px] font-bold ">
                                                <span className="line-through">
                                                    ${formatNumber(detailProduct.price)}
                                                </span>{' '}
                                                | Số lượng: {detailProduct?.quantity}
                                            </div>
                                            <div className="font-medium text-2xl mt-1">
                                                $
                                                {formatNumber(
                                                    detailProduct.price -
                                                        (detailProduct.price * detailProduct.discount) / 100
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="font-medium text-2xl">
                                        ${formatNumber(detailProduct.price)} |{' '}
                                        <span className="text-sm text-red-500">
                                            Số lượng: {detailProduct?.quantity}
                                        </span>
                                    </div>
                                )}
                            </div>
                            {detailProduct?.quantity ? (
                                <button
                                    onClick={async () => {
                                        if (!user.token) {
                                            return getNotification(
                                                'Vui lòng đăng nhập để thực hiện chức năng này',
                                                'warning'
                                            );
                                        }
                                        const check = cart.every((cartItem) => {
                                            return cartItem._id !== detailProduct._id;
                                        });
                                        if (check) {
                                            dispatch(addCart(detailProduct));

                                            const res = await patchDataAPI(
                                                'addcart',
                                                { cart: [...cart, { ...detailProduct, quantity_cart: 1 }] },
                                                user?.token
                                            );
                                            if (res.status == 200) {
                                                navigate('/cart');
                                            }
                                        } else {
                                            getNotification('Sản phẩm đã có trong giỏ hàng', 'warning');
                                        }
                                    }}
                                    type="button"
                                    className="mt-4 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    Mua ngay
                                </button>
                            ) : (
                                <div className="mt-5 text-red-500 text-xl font-bold">Hết hàng</div>
                            )}
                        </div>
                    </div>
                    <div className="px-[40px] mt-4 relative flex-1">
                        <Tabs defaultActiveKey="1" onChange={callback}>
                            <Tabs.TabPane tab="Chi tiết" key="1">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: detailProduct?.detail ? detailProduct.detail : '',
                                    }}
                                />
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="Bình luận" key="2">
                                <TabComment
                                    comments={comments}
                                    product_name={detailProduct?.title}
                                    id={id}
                                    socket={user.socket}
                                />
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="Sản phẩm liên quan" key="3">
                                <div className={`transition-all grid grid-cols-3 2xl:grid-cols-4 gap-6 pb-6`}>
                                    {detailProduct &&
                                        fullProduct &&
                                        fullProduct.length > 0 &&
                                        fullProduct.map(
                                            (item, index) =>
                                                item?.category?._id == detailProduct?.category._id && (
                                                    <ItemProduct isDetail user={user} key={index} item={item} />
                                                )
                                        )}
                                </div>
                            </Tabs.TabPane>
                        </Tabs>
                    </div>
                </div>
            )}
        </AppLayout>
    );
};

export default DetailProduct;
