import React from 'react';
import HomeHeader from '../../components/layouts/HomeHeader';
import { RulesForm } from '../../utils/common';
import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Col, Form, Image, Input, notification, Row, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { postDataAPI } from '../../apis/fetchData';
import { getNotification } from '../../utils/common';

const Register = () => {
    const [loading, setLoading] = React.useState(false);

    const onSubmit = async (data) => {
        setLoading(true);
        const res = await postDataAPI('register', data);
        if (res.status === 200) {
            getNotification(res?.data?.msg, 'success');
            setLoading(false);
        }
    };
    return (
        <div className="pt-[30px] flex flex-col h-screen">
            <div className="px-[60px] pb-[20px]">
                <HomeHeader />
            </div>
            <div className="bg-[#f3f3f3] flex-1 flex justify-center items-center border-t-[1px]">
                <Spin spinning={loading}>
                    <div className="shadow-xl border p-10 -mt-10 rounded-2xl w-[460px] bg-white">
                        <h2 className="text-xl text-center font-bold">ĐĂNG KÝ TÀI KHOẢN</h2>
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onSubmit}
                            layout="vertical"
                        >
                            <Form.Item
                                className="form_item"
                                name="name"
                                label="Họ và tên"
                                autoComplete={0}
                                rules={RulesForm.name}
                            >
                                <Input
                                    className="input_auth input-radius"
                                    placeholder="Nhập họ và tên"
                                    prefix={<UserOutlined className="site-form-item-icon" />}
                                />
                            </Form.Item>
                            <Form.Item
                                className="form_item"
                                name="email"
                                label="Email"
                                autoComplete={0}
                                rules={RulesForm.email}
                            >
                                <Input
                                    className="input_auth input-radius"
                                    placeholder="Nhập địa chỉ email"
                                    prefix={<UserOutlined className="site-form-item-icon" />}
                                />
                            </Form.Item>
                            <Form.Item
                                className="form_item"
                                name="password"
                                label="Mật khẩu"
                                autoComplete={0}
                                rules={RulesForm.password}
                                hasFeedback
                            >
                                <Input.Password
                                    className="input_auth input-radius"
                                    placeholder="Nhập mật khẩu"
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                />
                            </Form.Item>
                            <Form.Item
                                className="form_item"
                                name="repassword"
                                label="Nhập lại mật khẩu"
                                dependencies={['password']}
                                rules={RulesForm.re_password}
                                hasFeedback
                            >
                                <Input.Password
                                    className="input_auth input-radius"
                                    placeholder="Nhập lại mật khẩu"
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                />
                            </Form.Item>
                            <Form.Item style={{ margin: '20px 0 4px 0' }}>
                                <Row alignItems="center">
                                    <Col span={14}>
                                        <div className="flex items-center">
                                            <Link to="/Login" className="login-form-button login-form flex-end">
                                                <a className="flex items-center h-full">Đăng nhập</a>
                                            </Link>
                                        </div>
                                    </Col>
                                    <Col span={10}>
                                        <Button
                                            type="primary"
                                            className="login-form-button bg-[#368EDA]"
                                            htmlType="submit"
                                        >
                                            Đăng ký tài khoản
                                        </Button>
                                    </Col>
                                </Row>
                            </Form.Item>
                        </Form>
                        {/* <h4 className="text-sm text-center mt-4">Hoặc đăng nhập bằng</h4> */}
                        {/* <SocicalLogin popupCenter={popupCenter} setLoading={setLoading} /> */}
                    </div>
                </Spin>
            </div>
        </div>
    );
};

export default Register;
