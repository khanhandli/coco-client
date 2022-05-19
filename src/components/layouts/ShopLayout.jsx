import React from 'react';
import Filter from '../../features/cosmetic/components/Filter';
import AppLayout from './AppLayout';

const ShopLayout = ({ setSort, setPage, category, setCategory, categories, loading, children }) => {
    return (
        <AppLayout>
            <div className="flex w-full h-full">
                <div className="w-[240px] border-t-[1px] border-r-[1px] border-[#f2ecec] h-full overflow-y-auto custom_scroll">
                    <div>
                        <div className="h-[50px] font-bold text-lg border-[#f2ecec] border-b-[1px] flex items-center">
                            Tìm kiếm theo
                        </div>
                        <Filter
                            setSort={setSort}
                            setPage={setPage}
                            category={category}
                            setCategory={setCategory}
                            categories={categories}
                            loading={loading}
                        />
                    </div>
                </div>
                {children}
            </div>
        </AppLayout>
    );
};

export default ShopLayout;
