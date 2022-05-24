import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import ShopLayout from '../../../components/layouts/ShopLayout';
import ItemProduct from '../components/ItemProduct';
import { Link } from 'react-router-dom';

const ShopPromotion = () => {
    const { id } = useParams();
    const { name, id_promotion } = useLocation()?.state;

    const categories = useSelector((state) => state.categories);
    const product = useSelector((state) => state.product.products);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const productAll = useSelector((state) => state.product.fullProduct);

    const { favorites, cart } = user?.user;
    const [loading, setLoading] = React.useState(false);
    const [detailproduct, setDetailProduct] = React.useState({
        isShow: false,
        data: {},
    });
    const [sort, setSort] = React.useState('new');
    const [category, setCategory] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [listProduct, setListProduct] = React.useState([]);

    React.useEffect(() => {
        if (id === 'discount' && !(category.length > 0)) {
            const productByDiscount = productAll.filter((item) => item.discount > 0);
            setListProduct(productByDiscount);
        }

        if (category.length > 0 && id === 'discount') {
            const productByCategory = productAll.filter((item) =>
                category[0] === 'all' ? true : item.category._id === category[0] && item.discount > 0
            );
            setListProduct(productByCategory);
        }

        if (id === 'sale' && !(category.length > 0)) {
            const productByPromotion = productAll.filter((item) => item?.promotion?._id);

            setListProduct(productByPromotion);
        }

        if (category.length > 0 && id === 'sale') {
            const productByCategory = productAll.filter((item) =>
                category[0] === 'all' ? true : item.category._id === category[0] && item?.promotion
            );
            setListProduct(productByCategory);
        }

        if (id_promotion) {
            const productByPromotion = productAll.filter((item) => item?.promotion?._id === id_promotion);

            setListProduct(productByPromotion);
        }
    }, [id, category, productAll, id_promotion, name]);

    React.useEffect(() => {}, []);

    return (
        <ShopLayout
            setSort={setSort}
            setPage={setPage}
            category={category}
            setCategory={setCategory}
            categories={categories}
            loading={loading}
        >
            <div className="transition-all custom_scroll flex-1 px-[30px] pt-[10px] overflow-y-scroll pb-6">
                <span className="mr-6 text-[1rem] font-medium text-[#888] uppercase">
                    <Link to="/shop">Cửa hàng</Link> /{' '}
                    <span className="font-bold text-black">
                        {id === 'discount' ? 'Sản phẩm nổi bật' : name ? name : 'Sản phẩm khuyến mại'}
                    </span>
                </span>
                <div className={`transition-all grid grid-cols-3 2xl:grid-cols-4 gap-6 mt-10`}>
                    {listProduct &&
                        listProduct.length > 0 &&
                        listProduct.map(
                            (item, index) =>
                                index < 20 * page && (
                                    <ItemProduct
                                        user={user}
                                        setDetailProduct={setDetailProduct}
                                        key={index}
                                        item={item}
                                    />
                                )
                        )}
                </div>
            </div>
        </ShopLayout>
    );
};

export default ShopPromotion;
