import React from 'react';
import SearchComponent from './SearchComponent';
import { Badge, Col, Drawer, Row, Tooltip, List, Avatar, Button, Rate, Empty } from 'antd';
import { MenuOutlined, BellOutlined } from '@ant-design/icons';
import location from '../../assets/images/pin.png';
import cartimg from '../../assets/images/cart.png';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCart, logOut, removeFavoriteInUser } from '../../redux/userSlice';
import heart1 from '../../assets/images/heart1.png';
import heart from '../../assets/images/heart.png';
import { formatNumber, getNotification } from '../../utils/common';
import ShowMoreText from 'react-show-more-text';
import { getDataAPI, patchDataAPI } from '../../apis/fetchData';
import Notification from './Notification';

const HeaderLayout = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const productAll = useSelector((state) => state.product.fullProduct);
    const [visibleNoti, setVisibleNoti] = React.useState(false);

    const [listNoti, setListNoti] = React.useState([]);

    const { favorites, cart } = user?.user;
    const navigate = useNavigate();
    const [visible, setVisible] = React.useState(false);
    const [page, setPage] = React.useState(1);

    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };

    React.useEffect(() => {
        (async () => {
            const res = await getDataAPI('notification?limit=' + page * 4);
            if (res.status === 200) {
                setListNoti(res.data);
            }
        })();
    }, [page]);

    return (
        <Row className="flex justify-between items-center mb-[20px]">
            <div className="w-[20px] relative pl-11 font-bold text-xl flex items-center">
                <Link to="/">
                    <div className="flex justify-end items-center absolute h-[40px] w-[40px] top-[50%] -translate-y-1/2 left-0 bg-[#f4de4d] rounded-full">
                        <span className="text-black -mr-1 mb-[2px] text-2xl">Co</span>
                    </div>
                    <span className="text-black">CoShop</span>
                </Link>
            </div>
            <Col span={6}>
                <SearchComponent />
            </Col>
            {user?.isLogged ? (
                <div className="flex items-center cursor-pointer">
                    <img className="h-[48px] w-[48px] rounded-full" src={user?.user?.avatar} alt="avt" />
                    <div className="font-bold ml-2">
                        <div className="text-lg">{user.user.name}</div>
                        <div
                            onClick={() => {
                                dispatch(logOut());
                                localStorage.removeItem('firstLogin');
                                window.location.href = '/home';
                            }}
                            className="italic text-[#666] hover:opacity-80 font-medium"
                        >
                            Thoát
                        </div>
                    </div>
                </div>
            ) : (
                <div
                    onClick={() => {
                        navigate('/login');
                    }}
                    className="flex items-center cursor-pointer hover:opacity-80"
                >
                    <span className="shadow-xl bg-black inline-block h-min px-[14px] py-2 text-white rounded-tl-[50%] rounded-tr-xl rounded-bl-xl rounded-br-3xl">
                        +
                    </span>
                    <div className="font-bold ml-2">
                        <div className="text-lg">Đăng nhập</div>
                        <div>Nows</div>
                    </div>
                </div>
            )}

            <div className="flex">
                {/* <span>
                    <SearchOutlined className="text-[24px] text-[#545974] mr-4" />
                </span> */}
                <span>
                    <Tooltip placement="top" title="Danh sách yêu thích">
                        <Badge count={favorites && favorites.length} overflowCount={10}>
                            <img
                                onClick={() => {
                                    if (!user.token) {
                                        return getNotification(
                                            'Vui lòng đăng nhập để thực hiện chức năng này',
                                            'warning'
                                        );
                                    }
                                    showDrawer(true);
                                }}
                                style={{ filter: favorites && favorites.length > 0 ? '' : 'brightness(0.1)' }}
                                className=" h-[26px] w-[26px] cursor-pointer hover:brightness-75"
                                src={heart1}
                                alt="heart1"
                            />
                        </Badge>
                    </Tooltip>
                </span>
                <span className="px-4 text-[#ccc]">|</span>
                <span
                    className="mr-4"
                    onClick={() => {
                        navigate('/map');
                    }}
                >
                    <Tooltip placement="top" title="Vị trí cửa hàng">
                        <img className="cursor-pointer" src={location} alt="pin" />
                    </Tooltip>
                </span>
                <span
                    onClick={() => {
                        if (!user.token) {
                            return getNotification('Vui lòng đăng nhập để thực hiện chức năng này', 'warning');
                        }
                        navigate('/cart');
                    }}
                >
                    <Tooltip placement="top" title="Giỏ hàng">
                        <Badge count={cart && cart.length} overflowCount={10}>
                            <img className="cursor-pointer" src={cartimg} alt="cart" />
                        </Badge>
                    </Tooltip>
                </span>
            </div>

            <div className="flex">
                <span
                    onClick={() => setVisibleNoti(!visibleNoti)}
                    className="shadow-xl cursor-pointer bg-[#c8cdd9] inline-block h-min px-[14px] py-2 text-white rounded-tl-[50%] rounded-tr-xl rounded-bl-xl rounded-br-3xl"
                >
                    <Badge
                        count={listNoti?.data && listNoti?.data.length > 0 ? listNoti?.data?.length : 0}
                        overflowCount={10}
                    >
                        <div className="flex items-center py-1">
                            <BellOutlined style={{ color: '#222', fontSize: '20px' }} />
                        </div>
                    </Badge>
                </span>
            </div>
            <Drawer
                title="Danh sách sản phẩm yêu thích"
                placement="right"
                onClose={onClose}
                size="large"
                visible={visible}
            >
                {productAll.filter((product) => favorites?.includes(product._id)).length > 0 ? (
                    <List
                        itemLayout="vertical"
                        size="large"
                        pagination={false}
                        dataSource={
                            favorites &&
                            productAll &&
                            productAll.length > 0 &&
                            productAll.filter((product) => favorites?.includes(product._id))
                        }
                        renderItem={(item) => (
                            <List.Item
                                key={item.title}
                                extra={
                                    <img
                                        className="hover:scale-110 p-2 cursor-pointer rounded-t-lg h-full w-full max-h-[200px] object-cover"
                                        alt="logo"
                                        src={item.image}
                                    />
                                }
                            >
                                <List.Item.Meta
                                    title={<div>{item.title}</div>}
                                    description={
                                        <>
                                            <div className="text-[13px] text-[#cdcaca] font-medium">
                                                <ShowMoreText
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
                                                        className="custom_desc"
                                                        dangerouslySetInnerHTML={{
                                                            __html:
                                                                item?.description &&
                                                                item?.description.replace(/margin-bottom/g, ''),
                                                        }}
                                                    />
                                                </ShowMoreText>
                                            </div>
                                            <div className="flex items-center justify-between mt-3">
                                                <div className="flex flex-col">
                                                    <Rate
                                                        disabled
                                                        allowHalf
                                                        defaultValue={Number(
                                                            (item?.rating / item?.numReviewers).toFixed(1)
                                                        )}
                                                        style={{ fontSize: '20px' }}
                                                    />
                                                    <div className="text-lg mt-3">
                                                        $<span className="font-bold">{formatNumber(item.price)}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <button
                                                        onClick={async () => {
                                                            const check = cart.every((cartItem) => {
                                                                return cartItem._id !== item._id;
                                                            });
                                                            if (check) {
                                                                dispatch(addCart(item));

                                                                await patchDataAPI(
                                                                    'addcart',
                                                                    { cart: [...cart, { ...item, quantity_cart: 1 }] },
                                                                    user?.token
                                                                );
                                                            } else {
                                                                getNotification(
                                                                    'Sản phẩm đã có trong giỏ hàng',
                                                                    'warning'
                                                                );
                                                            }
                                                        }}
                                                        type="button"
                                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                    >
                                                        <svg
                                                            className="w-5 h-5 mr-2 -ml-1"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                                                        </svg>
                                                        Mua ngay
                                                    </button>
                                                    <div className=" bg-[#ffc0cb73] p-2 rounded-xl flex items-center ml-2">
                                                        <img
                                                            onClick={async () => {
                                                                if (!user.token) {
                                                                    return getNotification(
                                                                        'Vui lòng đăng nhập để thực hiện chức năng này',
                                                                        'warning'
                                                                    );
                                                                }

                                                                dispatch(removeFavoriteInUser(item._id));
                                                                const removeFavorite = favorites.filter(
                                                                    (favorite) => favorite !== item._id
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
                                                </div>
                                            </div>
                                        </>
                                    }
                                />
                            </List.Item>
                        )}
                    />
                ) : (
                    <div className="flex justify-center">
                        <Empty
                            className="flex flex-col items-center"
                            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                            imageStyle={{
                                height: 60,
                            }}
                            description={<span className="text-xl">Bạn chưa yêu thích sản phẩm nào!</span>}
                        ></Empty>
                    </div>
                )}
            </Drawer>
            <Drawer
                title="Thông báo"
                drawerStyle={{ background: '#f1f1f1' }}
                onClose={() => setVisibleNoti(!visibleNoti)}
                placement="right"
                visible={visibleNoti}
                className="list_noti"
            >
                <div>
                    {listNoti?.data &&
                        listNoti?.data?.length > 0 &&
                        listNoti?.data.map((item, index) => {
                            return <Notification key={index} item={item} />;
                        })}
                    {listNoti?.total >= 4 && page * 4 < listNoti?.total && (
                        <div className="flex justify-center mt-4">
                            <button
                                onClick={() => setPage(page + 1)}
                                className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-full group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300"
                            >
                                <span className="relative px-5 py-2 transition-all ease-in duration-75 bg-white rounded-full group-hover:bg-opacity-0">
                                    Xem thêm
                                </span>
                            </button>
                        </div>
                    )}
                </div>
            </Drawer>
        </Row>
    );
};

export default HeaderLayout;
