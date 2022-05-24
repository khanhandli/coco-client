import { Affix, Button, Col, Input, Result, Row, Steps, Tabs } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { patchDataAPI, postDataAPI } from '../../apis/fetchData';
import AppLayout from '../../components/layouts/AppLayout';
import {
    clearCart,
    decrementQuantity,
    incrementQuantity,
    removeQuantity,
    updateQuantity,
    updateShipping,
} from '../../redux/userSlice';
import { UserOutlined, SolutionOutlined, LoadingOutlined, SmileOutlined } from '@ant-design/icons';
import { formatNumber, getNotification } from '../../utils/common';
import CashCheckout from './components/CashCheckout';
import ModalUpdateShipping from './components/ModalUpdateShipping';
import PaypalCheckout from './components/PaypalCheckout';
import Cart from './components/Cart';
import TypeCheckout from './components/TypeCheckout';
import { useNavigate } from 'react-router-dom';
const { Step } = Steps;
const CartProduct = () => {
    const [value, setValue] = React.useState(1);
    const [finish, setFinish] = React.useState(false);
    const navigate = useNavigate();

    const [current, setCurrent] = React.useState({
        current: 0,
    });

    const { user } = useSelector((state) => state);
    const {
        user: { cart, shipping },
    } = user;

    const dispatch = useDispatch();

    const [total, setTotal] = React.useState(0);
    const [sell, setSell] = React.useState(0);

    const onChange = (currentId) => {
        console.log('onChange:', current);
        setCurrent({ ...current, current: currentId });
    };

    React.useEffect(() => {
        const getTotal = () => {
            let priceSell = 0;
            const total = cart.reduce((prev, item) => {
                return prev + item.price * item.quantity_cart;
            }, 0);

            // caculate total price sell for discount
            cart.forEach((item) => {
                if (item.discount) {
                    priceSell += (item.price * item.discount) / 100;
                }
            });

            setSell(priceSell);
            setTotal(total);
        };
        if (cart && cart.length > 0) {
            getTotal();
        }
    }, [cart]);

    const tranSuccess = React.useCallback(
        async (payment) => {
            const { paymentID, address } = payment;
            console.log('🚀 ~ file: index.jsx ~ line 71 ~ tranSuccess ~ payment', payment);

            setCurrent({ ...current, current: 2 });

            const res = await postDataAPI(
                'payment',
                {
                    cart,
                    name: dataShipping.name,
                    address: dataShipping.address,
                    phone: dataShipping.phone,
                    priceCheckout: total - sell,
                    status: '2',
                    type: 'paypal',
                },
                user.token
            );
            if (res.status === 200) {
                setFinish(true);
                dispatch(clearCart());
                getNotification(res.data.msg, 'success');

                // delete cart
                const res2 = await patchDataAPI('addcart', { cart: [] }, user?.token);
                if (res2.status === 200) {
                    navigate('/shop');
                }
            }
        },
        [user.token]
    );

    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [dataShipping, setDataShipping] = React.useState({
        name: '',
        phone: '',
        address: '',
    });

    React.useEffect(() => {
        if (shipping?.address) {
            setDataShipping(shipping);
        } else {
            setDataShipping({
                name: '',
                phone: '',
                address: '',
            });
        }
    }, [shipping, isModalVisible]);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        dispatch(updateShipping(dataShipping));

        const res = await patchDataAPI('addship', { shipping: dataShipping }, user?.token);
        if (res.status === 200) {
            setIsModalVisible(false);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onSubmit = async () => {
        setCurrent({ ...current, current: 2 });
        if (dataShipping.name === '' || dataShipping.address === '' || dataShipping.phone === '') {
            getNotification('Vui lòng nhập đầy đủ thông tin giao hàng', 'error');
            return;
        }
        const res = await postDataAPI(
            'payment',
            {
                cart,
                name: dataShipping.name,
                address: dataShipping.address,
                phone: dataShipping.phone,
                priceCheckout: total - sell,
                status: '0',
                type: 'money',
            },
            user.token
        );
        if (res.status === 200) {
            setFinish(true);
            dispatch(clearCart());
            getNotification(res.data.msg, 'success');

            // delete cart
            const res2 = await patchDataAPI('addcart', { cart: [] }, user?.token);
            if (res2.status === 200) {
                navigate('/shop');
            }
        }
    };

    return (
        <AppLayout>
            <Row gutter={[40, 20]}>
                <Col span={16}>
                    <Steps type="navigation" current={current.current} className="site-navigation-steps">
                        <Step status={current.current === 0 ? 'process' : 'finish'} title="Giỏ hàng" />
                        <Step
                            status={current.current === 1 ? 'process' : current.current === 0 ? 'wait' : 'finish'}
                            title="Phương thức"
                        />
                        <Step
                            icon={current.current === 2 && <LoadingOutlined />}
                            status={
                                current.current === 2
                                    ? 'process'
                                    : current.current === 0 || current.current === 1
                                    ? 'wait'
                                    : finish && 'finish'
                            }
                            title="Thanh toán"
                        />
                    </Steps>
                    {current.current === 0 && <Cart user={user} cart={cart} dispatch={dispatch} />}
                    {current.current === 1 && <TypeCheckout value={value} setValue={setValue} onChange={onChange} />}
                </Col>
                <Col span={8}>
                    <h2 className="text-[20px] font-bold">Thông tin thanh toán</h2>
                    <div className="px-6 mt-6 w-full rounded-lg shadow-xl border border-[#f3f3f3] pb-10">
                        <Tabs activeKey={value.toString()}>
                            <Tabs.TabPane tab="Tiền mặt" key="1">
                                <CashCheckout
                                    cart={cart}
                                    onSubmit={onSubmit}
                                    current={current}
                                    onChange={onChange}
                                    shipping={shipping}
                                    showModal={showModal}
                                    total={total}
                                    sell={sell}
                                />
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="Paypal" key="2">
                                <PaypalCheckout
                                    onChange={onChange}
                                    shipping={shipping}
                                    showModal={showModal}
                                    total={total}
                                    sell={sell}
                                    tranSuccess={tranSuccess}
                                />
                            </Tabs.TabPane>
                        </Tabs>
                    </div>
                </Col>
            </Row>
            <ModalUpdateShipping
                dataShipping={dataShipping}
                setDataShipping={setDataShipping}
                isModalVisible={isModalVisible}
                handleOk={handleOk}
                handleCancel={handleCancel}
            />
        </AppLayout>
    );
};

export default CartProduct;
