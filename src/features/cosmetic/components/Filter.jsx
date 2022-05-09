import React from 'react';
import { Tree, Switch, Rate, Skeleton } from 'antd';
import { CarryOutOutlined, FormOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { setProductByCategory } from '../../../redux/productSlice';

const Filter = ({ categories, loading, category, setCategory, setPage, setSort }) => {
    const dispatch = useDispatch();
    const onSelect = async (selectedKeys, info) => {
        setCategory(selectedKeys);
        dispatch(setProductByCategory(selectedKeys[0]));
        setPage(1);
        setSort('new');
    };
    return (
        <div>
            <div
                onClick={() => {
                    dispatch(setProductByCategory('all'));
                    setCategory([]);
                    setPage(1);
                    setSort('new');
                }}
                className="mt-[20px] font-medium text-[15px] mb-4 cursor-pointer"
            >
                <span
                    className={` hover:bg-slate-100 inline-flex items-center ${
                        category.length === 0 ? 'bg-[#BAE7FF]' : ''
                    } rounded-[8px] h-[34px] px-[18px]`}
                >
                    Tất cả sản phẩm
                </span>
            </div>

            <div className="mt-[20px] font-medium text-[15px] mb-4">Danh mục</div>
            {!loading ? (
                <Tree
                    selectedKeys={category}
                    showLine={{ showLeafIcon: false }}
                    showIcon
                    // defaultExpandedKeys={['0-0-0']}
                    onSelect={onSelect}
                    treeData={categories}
                    showLeafIcon={false}
                    rootClassName="tree_category"
                />
            ) : (
                <div className="pr-[20px]">
                    <Skeleton.Button active size="small" block shape="round" />
                    <Skeleton.Button className="mt-2" active size="small" block shape="round" />
                    <Skeleton.Button className="mt-2" active size="small" block shape="round" />
                    <Skeleton.Button className="mt-2" active size="small" block shape="round" />
                    <Skeleton.Button className="mt-2" active size="small" block shape="round" />
                </div>
            )}

            <div className="mt-4 border-t-[1px] border-[#f2ecec] text-[15px] font-medium pt-4 pb-2">Đánh giá</div>
            <Rate allowHalf defaultValue={2.5} style={{ fontSize: '18px' }} />
        </div>
    );
};

export default Filter;
