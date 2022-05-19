import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

function SearchComponent() {
    const navigate = useNavigate();

    const [dataSearch, setDataSearch] = React.useState([]);
    const [search, setSearch] = React.useState('');
    const productAll = useSelector((state) => state.product.fullProduct);

    const typingTimeoutRef = React.useRef(null);
    const handleOnSearch = async (string, results) => {
        setSearch(string);
    };

    React.useEffect(() => {
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }
        (async () => {
            typingTimeoutRef.current = setTimeout(async () => {
                // search product by title
                const productByTitle = productAll.filter((item) =>
                    item.title.toLowerCase().includes(search.toLowerCase())
                );
                // add key name to search results
                const data = productByTitle.map((item) => ({
                    ...item,
                    name: item.title,
                }));

                setDataSearch(data);
            }, 200);
        })();

        return () => clearTimeout(typingTimeoutRef.current);
    }, [search]);

    const handleOnHover = (result) => {};

    const handleOnSelect = (item) => {
        if (!item) return;
        // the item selected
        navigate(`/shop/detail/${item._id}`);
        setSearch(item.name);
    };

    const handleOnFocus = () => {};

    const formatResult = (item) => {
        console.log('🚀 ~ file: SearchComponent.jsx ~ line 47 ~ formatResult ~ item', item);
        return (
            <span
                className="cursor-pointer truncate"
                style={{ display: 'block', textAlign: 'left', alignItems: 'center' }}
            >
                {item.title}
            </span>
        );
    };

    return (
        <ReactSearchAutocomplete
            inputSearchString={search}
            items={dataSearch}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            formatResult={formatResult}
            styling={{ zIndex: '100', fontSize: '16px' }}
            placeholder="Tìm kiếm sản phẩm"
        />
    );
}

export default SearchComponent;
