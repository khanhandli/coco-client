import React from 'react';
import HomeHeader from '../../components/layouts/HomeHeader';
import { getNotification, RulesForm } from '../../utils/common';
import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Col, Form, Image, Input, notification, Row, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { postDataAPI } from '../../apis/fetchData';

const Login = () => {
    const [loading, setLoading] = React.useState(false);

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const res = await postDataAPI('login', data);
            if (res.status === 200) {
                localStorage.setItem('firstLogin', true);

                getNotification(res.data.msg, 'success');
                setLoading(false);

                window.location.href = '/home';
            }
        } catch (error) {
            getNotification(error.response.data.msg, 'error');
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
                        <h2 className="text-xl text-center font-bold mb-6">ĐĂNG NHẬP</h2>
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{
                                remember: false,
                            }}
                            onFinish={onSubmit}
                            autoComplete="off"
                            layout="vertical"
                        >
                            <Form.Item
                                className="form_item"
                                name="email"
                                label="Email"
                                autoComplete={0}
                                rules={RulesForm.email}
                                initialValue=""
                            >
                                <Input
                                    autoComplete="off"
                                    placeholder="Nhập địa chỉ email"
                                    prefix={<UserOutlined className="site-form-item-icon" />}
                                    className="input_auth input-radius"
                                />
                            </Form.Item>
                            <Form.Item
                                initialValue=""
                                className="form_item"
                                name="password"
                                label="Mật khẩu"
                                rules={RulesForm.password}
                            >
                                <Input.Password
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    placeholder="Nhập mật khẩu"
                                    type="password"
                                    autoComplete="off"
                                    className="input_auth input-radius"
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                            </Form.Item>
                            <Form.Item style={{ margin: '20px 0 20px 0' }}>
                                <Row alignItems="center">
                                    <Col span={16}>
                                        <Row className="h-full">
                                            <Col span={10}>
                                                <Link to="/register" className="login-form-button login-form flex-end">
                                                    <a className="flex items-center h-full text-black">Đăng ký</a>
                                                </Link>
                                            </Col>
                                            <Col span={10}>
                                                <Link
                                                    to="/forgot_password"
                                                    className="login-form-button login-form flex-end"
                                                >
                                                    <a className="flex items-center h-full text-black">Quên mật khẩu</a>
                                                </Link>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={8}>
                                        <Button
                                            type="primary"
                                            className="login-form-button bg-[#368EDA]"
                                            htmlType="submit"
                                        >
                                            Đăng nhập
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

export default Login;
