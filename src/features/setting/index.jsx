import { Col, Row } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { patchDataAPI } from '../../apis/fetchData';
import AppLayout from '../../components/layouts/AppLayout';
import { updateAvatar, updateProfileSettings } from '../../redux/userSlice';
import { getNotification, imageUpload } from '../../utils/common';

const Setting = () => {
    const user = useSelector((state) => state.user);
    const {
        user: { cart, shipping },
    } = user;
    const dispatch = useDispatch();
    const [loading, setloading] = React.useState(false);
    const [userInfo, setUserInfo] = React.useState();

    React.useEffect(() => {
        setUserInfo({
            name: user?.user?.name,
            description: user?.user?.description || '',
            name_ship: shipping?.name,
            address_ship: shipping?.address,
            phone_ship: shipping?.phone,
        });
    }, [user]);

    const handleChangeFile = async (e) => {
        const target = e.target;
        const files = target.files;

        setloading(true);
        const { url } = await imageUpload(files[0]);
        if (url) {
            dispatch(updateAvatar(url));
            await patchDataAPI('avatar', { avatar: url }, user.token);
            setloading(false);
        } else {
            getNotification('Có lỗi xảy ra', 'error');
            setloading(false);
        }
    };
    return (
        <AppLayout>
            <h2 className="text-xl font-bold">Cài đặt thông tin</h2>
            <Row gutter={[40, 20]}>
                <Col span={10}>
                    <Row gutter={[40, 20]}>
                        <Col span={24}>
                            <div className="w-full shadow-md border border-[#f3f3f3] rounded-md p-8">
                                <div className="flex">
                                    <img
                                        className="h-[112px] w-[112px] shadow-md rounded-lg object-cover"
                                        src={user?.user?.avatar}
                                        alt="ab"
                                    />
                                    <div className="ml-4">
                                        <div className="text-xl font-bold font-mono mb-1">{user?.user?.name}</div>
                                        <div className="text-[16px] text-[#666]">
                                            {user?.user?.description || 'Software Engineer'}
                                        </div>
                                        <label
                                            style={{ display: 'contents', cursor: 'pointer' }}
                                            htmlhtmlFor="raised-button-file"
                                        >
                                            <input
                                                onChange={handleChangeFile}
                                                type="file"
                                                id="raised-button-file"
                                                hidden
                                            />

                                            <div
                                                type="button"
                                                hidden={loading}
                                                className="text-white mt-3 bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center "
                                            >
                                                <svg
                                                    className="w-6 mr-2 h-4"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z"></path>
                                                    <path d="M9 13h2v5a1 1 0 11-2 0v-5z"></path>
                                                </svg>
                                                Tải ảnh
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col span={24}>
                            <div className="w-full shadow-md border border-[#f3f3f3] rounded-md p-8">
                                <h2 className="text-[17px] font-bold">Thông tin mật khẩu</h2>
                                <div className="flex justify-between">
                                    <div className="mb-6 flex-1 mx-3">
                                        <label
                                            htmlFor="password"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Mật khẩu cũ
                                        </label>
                                        <input
                                            type="password"
                                            id="password1"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                                            required
                                            placeholder="**************"
                                        />
                                    </div>
                                    <div className="mb-6 flex-1 mx-3">
                                        <label
                                            htmlFor="password"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Mật khẩu mới
                                        </label>
                                        <input
                                            type="password"
                                            id="password2"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            required
                                            placeholder="**************"
                                        />
                                    </div>
                                </div>
                                <div className="mb-6 flex-1 mx-3">
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                                        Nhập lại mật khẩu
                                    </label>
                                    <input
                                        type="password"
                                        id="password3"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        required
                                        placeholder="**************"
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2 focus:outline-none "
                                    >
                                        Cập nhật
                                    </button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col span={14}>
                    <div className="w-full shadow-md border border-[#f3f3f3] rounded-md p-8">
                        <h2 className="text-[17px] font-bold">Thông tin chung</h2>
                        <Row>
                            <Col span={12}>
                                <div className="mb-6 flex-1 mx-3">
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                                        Tài khoản
                                    </label>
                                    <input
                                        type="text"
                                        value={user?.user?.email}
                                        id="email"
                                        className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                                        required
                                        disabled
                                    />
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className="mb-6 flex-1 mx-3">
                                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">
                                        Họ tên
                                    </label>
                                    <input
                                        type="username"
                                        id="username"
                                        defaultValue={user?.user?.name}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                                        required
                                        onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                                    />
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className="mb-6 flex-1 mx-3">
                                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">
                                        Mô tả
                                    </label>
                                    <textarea
                                        defaultValue={user?.user?.description}
                                        id="message"
                                        rows="2"
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Mô tả ngắn..."
                                        onChange={(e) => setUserInfo({ ...userInfo, description: e.target.value })}
                                    ></textarea>
                                </div>
                            </Col>
                        </Row>
                        <h2 className="text-[17px] font-bold">Thông tin giao hàng</h2>
                        <Row>
                            <Col span={12}>
                                <div className="mb-6 flex-1 mx-3">
                                    <label htmlFor="Họ tên" className="block mb-2 text-sm font-medium text-gray-900">
                                        Họ tên
                                    </label>
                                    <input
                                        type="text"
                                        id="Họ tên"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                                        required
                                        defaultValue={shipping?.name}
                                        onChange={(e) => setUserInfo({ ...userInfo, name_ship: e.target.value })}
                                    />
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className="mb-6 flex-1 mx-3">
                                    <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900">
                                        Địa chỉ
                                    </label>
                                    <input
                                        type="text"
                                        id="address"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                                        required
                                        defaultValue={shipping?.address}
                                        onChange={(e) => setUserInfo({ ...userInfo, address_ship: e.target.value })}
                                    />
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className="mb-6 flex-1 mx-3">
                                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">
                                        Số điện thoại
                                    </label>
                                    <input
                                        type="text"
                                        id="phone"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                                        required
                                        defaultValue={shipping?.phone}
                                        onChange={(e) => setUserInfo({ ...userInfo, phone_ship: e.target.value })}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <div className="flex justify-end">
                            <button
                                onClick={async () => {
                                    dispatch(
                                        updateProfileSettings({
                                            name: userInfo.name,
                                            description: userInfo.description,
                                            shipping: {
                                                name: userInfo.name_ship,
                                                address: userInfo.address_ship,
                                                phone: userInfo.phone_ship,
                                            },
                                        })
                                    );
                                    await patchDataAPI(
                                        'setting',
                                        {
                                            name: userInfo.name,
                                            description: userInfo.description,
                                            name_ship: userInfo.name_ship,
                                            address_ship: userInfo.address_ship,
                                            phone_ship: userInfo.phone_ship,
                                        },
                                        user.token
                                    );
                                }}
                                type="button"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2 focus:outline-none "
                            >
                                Cập nhật
                            </button>
                        </div>
                    </div>
                </Col>
            </Row>
        </AppLayout>
    );
};

export default Setting;
