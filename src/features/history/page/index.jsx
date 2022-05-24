import React from 'react';
import AppLayout from '../../../components/layouts/AppLayout';
import { Table, Badge, Menu, Dropdown, Space, Tooltip } from 'antd';
import { ReconciliationOutlined } from '@ant-design/icons';
import { getDataAPI } from '../../../apis/fetchData';
import { useSelector } from 'react-redux';
import { formatNumber } from '../../../utils/common';

const HistoryOrder = () => {
    const [table1, setTable1] = React.useState([]);
    const [table2, setTable2] = React.useState([]);
    const user = useSelector((state) => state.user);

    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        if (!user?.token) return;
        const getData = async () => {
            setLoading(true);
            const res = await getDataAPI('history', user?.token);
            if (res.status === 200) {
                setTable2(res.data);
            }
            const res2 = await getDataAPI('history?type=1', user?.token);
            if (res2.status === 200) {
                setTable1(res2.data);
            }
            setLoading(false);
        };
        getData();
    }, [user?.token]);

    const expandedRowRender = (props) => {
        const data = table2.filter((item) => item.id_product === props._id);
        const columns = [
            { title: 'Tên sản phẩm', dataIndex: 'title', key: 'title' },
            {
                title: 'Danh mục',
                dataIndex: 'category',
                key: 'category',
                render: (value) => <span>{value?.name}</span>,
            },
            {
                title: 'Hình ảnh',
                key: 'image',
                dataIndex: 'image',
                render: (value) => <img className="h-[30px] w-[30px]" src={value} alt="123" />,
            },
            {
                title: 'Giá tiền',
                dataIndex: 'price',
                key: 'price',
                render: (value, row) => (
                    <span className="font-bold text-yellow-600">
                        {formatNumber(value)} <span className="text-[12px] text-red-500">(x{row?.quantity_cart})</span>
                    </span>
                ),
            },
        ];

        return <Table columns={columns} dataSource={data} pagination={false} />;
    };

    const columns = [
        { title: 'Họ tên', dataIndex: 'name', key: 'name' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Số điện thoại', dataIndex: 'phone', key: 'phone' },
        { title: 'Địa chỉ', dataIndex: 'address', key: 'address' },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (value) => {
                if (value == 1) {
                    return <span className="font-bold text-yellow-300">Chờ xác nhận</span>;
                }
                if (value == 2) {
                    return <span className="font-bold text-green-300">Đang giao</span>;
                }
                if (value == 3) {
                    return <span className="font-bold text-green-300">Thành công</span>;
                }

                return <span className="font-bold text-red-300">Hủy</span>;
            },
        },
        {
            title: 'Phương thức',
            dataIndex: 'type',
            key: 'type',
            render: (value) => {
                if (value == 'money') {
                    return <span>Tiền mặt</span>;
                }
                if (value == 'paypal') {
                    return <span>Đã thanh toán</span>;
                }
            },
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'priceCheckout',
            key: 'priceCheckout',
            render: (value) => <span className="font-bold text-yellow-600">{formatNumber(value)}</span>,
        },
        {
            title: ' ',
            dataIndex: '_id',
            key: '_',
            render: (value) => (
                <div className="cursor-pointer hover:text-black">
                    <Tooltip placement="top" title="Xem hóa đơn">
                        <ReconciliationOutlined style={{ fontSize: '20px', color: 'inherit' }} />
                    </Tooltip>
                </div>
            ),
        },
    ];

    return (
        <AppLayout>
            <Table
                className="components-table-demo-nested"
                columns={columns}
                expandable={{ expandedRowRender }}
                dataSource={table1}
                pagination={{ pageSize: 10 }}
                loading={loading}
            />
        </AppLayout>
    );
};

export default HistoryOrder;
