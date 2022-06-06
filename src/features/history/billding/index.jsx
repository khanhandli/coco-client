import React from 'react';
import './style.css';
import { formatNumber } from '../../../utils/common';
// import logo from './logo.jpg';
// import { formatNumber } from '../../../../commonFunction/NumberFortmat';

// import NumberFormat from 'react-number-format';

const ReceiptBill = React.forwardRef(({ cart, userr, total, id, discount }, ref) => {
    const getDateTime = new Date();

    return (
        <div className="wrapper-container" ref={ref}>
            <div className="containerLetter" style={{ paddingTop: 20 }}>
                <div className="form">
                    <div className="form-top">
                        <div className="form-top_left">
                            <h2>
                                {/* <img src={logo} /> */}
                                <span>CocoShop</span>
                            </h2>
                            <p>Thiên đường mỹ phẩm</p>
                        </div>
                        <div className="form-top_right">
                            <h4>Mẫu số 01-TT</h4>
                            <p>(Ban hành theo TT số: 133/2016/TT/BTC ngày 26/08/2016 của Bộ trưởng BTC)</p>
                        </div>
                    </div>
                    <div className="form-body">
                        <div className="form-body_title">
                            <h2>HÓA ĐƠN</h2>
                            <h4>
                                {' '}
                                Ngày {getDateTime.getDate()} tháng {getDateTime.getMonth() + 1} năm{' '}
                                {getDateTime.getFullYear()}
                            </h4>
                        </div>
                        <div className="infor_form">
                            <div className="list_infor">
                                <ul>
                                    <li>
                                        <h4>Số : {id}</h4>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="form-type">
                            <div className="form_type-item">
                                <h4>
                                    Họ và tên khách hàng: <span style={{ fontWeight: 'bold' }}>{userr?.name}</span>
                                </h4>
                            </div>
                            <div className="form_type-item">
                                <h4>
                                    Địa chỉ: <span style={{ fontWeight: 'bold' }}>{userr?.address}</span>
                                </h4>
                            </div>
                            <div className="form_type-item">
                                <h4>
                                    Số điện thoại: <span style={{ fontWeight: 'bold' }}>{userr?.phone}</span>
                                </h4>
                            </div>
                            <div className="form_type-item">
                                <div className="amount">
                                    {' '}
                                    <h4>
                                        Số tiền: <span style={{ fontWeight: 'bold' }}>{formatNumber(total)}</span>
                                    </h4>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="panel panel-default invoice" id="invoice">
                                    <div className="panel-body">
                                        <div>
                                            <table className="table-auto table_bill" style={{ width: '100%' }}>
                                                <thead>
                                                    <tr>
                                                        <th className="text-center" style={{ width: '5%' }}>
                                                            STT
                                                        </th>
                                                        <th style={{ width: '50%' }}>Sản phẩm</th>
                                                        <th className="text-right" style={{ width: '15%' }}>
                                                            Số lượng
                                                        </th>
                                                        <th className="text-right" style={{ width: '15%' }}>
                                                            Giá
                                                        </th>
                                                        <th className="text-right" style={{ width: '15%' }}>
                                                            Tổng giá
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {cart &&
                                                        cart.map((item, index) => (
                                                            <tr key={index}>
                                                                <td className="text-center">{index + 1}</td>
                                                                <td>{item.title}</td>
                                                                <td className="text-right">{item.quantity_cart}</td>
                                                                <td className="text-right">
                                                                    {formatNumber(item.price)}
                                                                </td>
                                                                <td className="text-right">
                                                                    {formatNumber(item.price * item.quantity_cart)}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                </tbody>
                                            </table>
                                        </div>

                                        <div className="row">
                                            <div className="col-xs-6 margintop"></div>
                                            <div className="col-xs-6 text-right pull-right invoice-total">
                                                <div className="date_created">
                                                    <h4>
                                                        {' '}
                                                        Hà Nội, Ngày {getDateTime.getDate()} tháng{' '}
                                                        {getDateTime.getMonth() + 1} năm {getDateTime.getFullYear()}
                                                    </h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="signature">
                            <div className="signature-item">
                                <div>
                                    <h4>Người thu tiền</h4>
                                    <p>(Ký, họ tên)</p>
                                </div>
                                <span>Bùi Thị Minh Phương</span>
                            </div>
                            <div className="signature-item">
                                <div>
                                    <h4>Người nộp tiền</h4>
                                    <p>(Ký, họ tên)</p>
                                </div>
                                <span>{userr?.name}</span>
                            </div>
                        </div>
                        <div className="confirm">
                            <div className="form_type-item">
                                <h4>Xin chân thành cảm ơn!</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default ReceiptBill;
