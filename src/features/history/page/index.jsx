import React from 'react';
import AppLayout from '../../../components/layouts/AppLayout';
import { Table, Badge, Menu, Dropdown, Space, Tooltip, Input, Button } from 'antd';
import { ReconciliationOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { getDataAPI } from '../../../apis/fetchData';
import { useSelector } from 'react-redux';
import { formatNumber } from '../../../utils/common';
import ReceiptBill from '../billding';
import ReactToPrint, { useReactToPrint } from 'react-to-print';

const HistoryOrder = () => {
    const [table1, setTable1] = React.useState([]);
    const [table2, setTable2] = React.useState([]);
    const user = useSelector((state) => state.user);
    const [searchText, setSearchText] = React.useState('');

    const [loading, setLoading] = React.useState(false);
    const [infoProduct, setInfoProduct] = React.useState({});

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

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={(node) => node}
                    placeholder={`Tìm ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                        className="text-blue-500"
                    >
                        Tìm kiếm
                    </Button>
                    <Button
                        onClick={() => {
                            handleReset(clearFilters);
                            handleSearch([], confirm, dataIndex);
                        }}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
        render: (text) => text,
    });

    const componentRef = React.useRef(null);

    const handlePrintAfter = (e) => {
        setInfoProduct({});
    };

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        onAfterPrint: (e) => handlePrintAfter(e),
    });

    const exportLetter = (record) => {
        setInfoProduct(record);
        handlePrint();
    };

    const columns = [
        { title: 'Họ tên', dataIndex: 'name', key: 'name', ...getColumnSearchProps('name') },
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
            filters: [
                {
                    text: 'Chờ xác nhận',
                    value: 1,
                },
                {
                    text: 'Đang giao',
                    value: 2,
                },
                {
                    text: 'Thành công',
                    value: 3,
                },
                {
                    text: 'Hủy',
                    value: 0,
                },
            ],
            onFilter: (value, record) => record.status.indexOf(value) === 0,
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
                    return <span>Paypal</span>;
                }
            },
            filters: [
                {
                    text: 'Tiền mặt',
                    value: 'money',
                },
                {
                    text: 'Paypal',
                    value: 'paypal',
                },
            ],
            onFilter: (value, record) => record.type.indexOf(value) === 0,
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
            render: (value, rc) => (
                <div className="cursor-pointer hover:text-black">
                    <Tooltip placement="top" title="Xem hóa đơn">
                        <ReconciliationOutlined
                            onClick={() => exportLetter(rc)}
                            style={{ fontSize: '20px', color: 'inherit' }}
                        />
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

            {infoProduct?.name && (
                <ReceiptBill
                    id={infoProduct._id}
                    cart={infoProduct?.cart}
                    total={infoProduct.priceCheckout}
                    userr={{ name: infoProduct?.name, address: infoProduct?.address, phone: infoProduct?.phone }}
                    ref={componentRef}
                />
            )}
        </AppLayout>
    );
};

export default HistoryOrder;
