import { Button, Radio, Input, Space, PageHeader } from 'antd';
import React from 'react';

const TypeCheckout = ({ onChange, setValue, value }) => {
    const onChangeCheckBox = (e) => {
        setValue(e.target.value);
    };

    return (
        <div className="mt-6">
            <PageHeader
                onBack={() => {
                    onChange(0);
                    setValue(1);
                }}
                title={<div className="text-lg font-bold mt-1">Chọn hình thức thanh toán</div>}
            >
                <div>
                    <Radio.Group onChange={onChangeCheckBox} value={value}>
                        <Space size={16} direction="vertical">
                            <Radio style={{ display: 'flex', alignItems: 'center' }} value={1}>
                                <div className="flex items-center">
                                    <img
                                        src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-cod.svg"
                                        alt="pay"
                                    />
                                    <div className="ml-2 mt-1">Thanh toán tiền mặt khi nhận hàng</div>
                                </div>
                            </Radio>
                            <Radio style={{ display: 'flex', alignItems: 'center' }} value={2}>
                                <div className="flex items-center">
                                    <img
                                        className="h-[23px] w-[23px]"
                                        src="https://www.paypalobjects.com/images/shared/momgram@2x.png"
                                        alt="pay"
                                    />
                                    <div className="ml-2 mt-1">Thanh toán paypal</div>
                                </div>
                            </Radio>
                        </Space>
                    </Radio.Group>
                </div>
            </PageHeader>
        </div>
    );
};

export default TypeCheckout;
