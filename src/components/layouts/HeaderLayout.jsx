import React from 'react';
import SearchComponent from './SearchComponent';
import { Col, Row } from 'antd';
import { MenuOutlined, SearchOutlined } from '@ant-design/icons';
import location from '../../assets/images/pin.png';
import cart from '../../assets/images/cart.png';

const HeaderLayout = () => {
    return (
        <Row className="flex justify-between items-center mb-[20px]">
            <div className="w-[20px] relative pl-11 font-bold text-xl flex items-center">
                <div className="flex justify-end items-center absolute h-[40px] w-[40px] top-[50%] -translate-y-1/2 left-0 bg-[#f4de4d] rounded-full">
                    <span className="-mr-1 mb-[2px] text-2xl">Co</span>
                </div>
                <span>CoShop</span>
            </div>
            <Col span={6}>
                <SearchComponent />
            </Col>
            <div className="flex">
                <span className="shadow-xl bg-black inline-block h-min px-[14px] py-2 text-white rounded-tl-[50%] rounded-tr-xl rounded-bl-xl rounded-br-3xl">
                    +
                </span>
                <div className="font-bold ml-2">
                    <div>On Sale</div>
                    <div>Now</div>
                </div>
            </div>
            <div className="flex">
                <span>
                    <SearchOutlined className="text-[24px] text-[#545974]" />
                </span>
                <span className="px-4 text-[#ccc]">|</span>
                <span className="mr-4">
                    <img src={location} alt="pin" />
                </span>
                <span>
                    <img src={cart} alt="cart" />
                </span>
            </div>

            <div className="flex">
                <span className="shadow-xl bg-[#c8cdd9] inline-block h-min px-[14px] py-2 text-white rounded-tl-[50%] rounded-tr-xl rounded-bl-xl rounded-br-3xl">
                    <div className="flex items-center py-1">
                        <MenuOutlined style={{ color: 'black' }} />
                    </div>
                </span>
            </div>
        </Row>
    );
};

export default HeaderLayout;
