import { Col, Row } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import AppLayout from '../../components/layouts/AppLayout';

const Setting = () => {
    const user = useSelector((state) => state.user);
    const {
        user: { cart, shipping },
    } = user;
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
                                        className="h-[112px] w-[112px] shadow-md rounded-lg"
                                        src={user?.user?.avatar}
                                        alt="ab"
                                    />
                                    <div className="ml-4">
                                        <div className="text-xl font-bold font-mono mb-1">{user?.user?.name}</div>
                                        <div className="text-[16px] text-[#666]">
                                            {user?.user?.description || 'Software Engineer'}
                                        </div>
                                        <button
                                            type="button"
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
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col span={24}>
                            <div className="w-full shadow-md border border-[#f3f3f3] rounded-md p-8">
                                <h2 className="text-[17px] font-bold">Thông tin mật khẩu</h2>
                                <div className="flex justify-between">
                                    <div className="mb-6 flex-1 mx-3">
                                        <label for="password" className="block mb-2 text-sm font-medium text-gray-900">
                                            Mật khẩu cũ
                                        </label>
                                        <input
                                            type="password"
                                            id="password"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                                            required
                                            placeholder="**************"
                                        />
                                    </div>
                                    <div className="mb-6 flex-1 mx-3">
                                        <label for="password" className="block mb-2 text-sm font-medium text-gray-900">
                                            Mật khẩu mới
                                        </label>
                                        <input
                                            type="password"
                                            id="password"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            required
                                            placeholder="**************"
                                        />
                                    </div>
                                </div>
                                <div className="mb-6 flex-1 mx-3">
                                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900">
                                        Nhập lại mật khẩu
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        required
                                        placeholder="**************"
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2 focus:outline-none "
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
                                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900">
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
                                    <label for="username" className="block mb-2 text-sm font-medium text-gray-900">
                                        Họ tên
                                    </label>
                                    <input
                                        type="username"
                                        id="username"
                                        value={user?.user?.name}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                                        required
                                        placeholder="**************"
                                    />
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className="mb-6 flex-1 mx-3">
                                    <label for="message" className="block mb-2 text-sm font-medium text-gray-900">
                                        Mô tả
                                    </label>
                                    <textarea
                                        id="message"
                                        rows="2"
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Mô tả ngắn..."
                                    ></textarea>
                                </div>
                            </Col>
                        </Row>
                        <h2 className="text-[17px] font-bold">Thông tin giao hàng</h2>
                        <Row>
                            <Col span={12}>
                                <div className="mb-6 flex-1 mx-3">
                                    <label for="Họ tên" className="block mb-2 text-sm font-medium text-gray-900">
                                        Họ tên
                                    </label>
                                    <input
                                        type="text"
                                        id="Họ tên"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                                        required
                                        value={shipping?.name}
                                    />
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className="mb-6 flex-1 mx-3">
                                    <label for="address" className="block mb-2 text-sm font-medium text-gray-900">
                                        Địa chỉ
                                    </label>
                                    <input
                                        type="text"
                                        id="address"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                                        required
                                        value={shipping?.address}
                                    />
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className="mb-6 flex-1 mx-3">
                                    <label for="phone" className="block mb-2 text-sm font-medium text-gray-900">
                                        Số điện thoại
                                    </label>
                                    <input
                                        type="text"
                                        id="phone"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                                        required
                                        value={shipping?.phone}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2 focus:outline-none "
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
