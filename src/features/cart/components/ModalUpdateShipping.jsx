import { Col, Input, Modal, Row } from 'antd';
import React from 'react';

const ModalUpdateShipping = ({ dataShipping, setDataShipping, isModalVisible, handleOk, handleCancel }) => {
    return (
        <Modal
            cancelText="Hủy"
            okText="Cập nhật"
            title="Địa chỉ nhận hàng"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            centered
            maskClosable={false}
            okButtonProps={{
                style: {
                    borderRadius: '999px',
                    width: '100px',
                    margin: '6px 8px',
                },
            }}
            cancelButtonProps={{
                style: {
                    borderRadius: '999px',
                    width: '100px',
                    margin: '6px 8px',
                },
            }}
        >
            <Row gutter={[0, 10]}>
                <Col span={24}>
                    <Input
                        value={dataShipping.name}
                        onChange={(e) => setDataShipping({ ...dataShipping, name: e.target.value })}
                        placeholder="Nhập họ tên"
                    />
                </Col>
                <Col span={24}>
                    <Input
                        value={dataShipping.address}
                        onChange={(e) => setDataShipping({ ...dataShipping, address: e.target.value })}
                        placeholder="Nhập địa chỉ"
                    />
                </Col>
                <Col span={24}>
                    <Input
                        value={dataShipping.phone}
                        onChange={(e) => setDataShipping({ ...dataShipping, phone: e.target.value })}
                        placeholder="Nhập số điện thoại"
                    />
                </Col>
            </Row>
        </Modal>
    );
};

export default ModalUpdateShipping;
