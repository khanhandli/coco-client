import React from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

function SearchComponent() {
    const [dataSearch, setDataSearch] = React.useState([]);
    const [search, setSearch] = React.useState('');

    const typingTimeoutRef = React.useRef(null);
    const handleOnSearch = async (string, results) => {
        setSearch(string);
    };

    // React.useEffect(() => {
    //     if (typingTimeoutRef.current) {
    //         clearTimeout(typingTimeoutRef.current);
    //     }
    //     (async () => {
    //         typingTimeoutRef.current = setTimeout(async () => {
    //             const res = await getDataAPI(`cl_form?size=10&search=${search}`);
    //             setDataSearch(res.data.category);
    //         }, 500);
    //     })();

    //     return () => clearTimeout(typingTimeoutRef.current);
    // }, [search]);

    const handleOnHover = (result) => {};

    const handleOnSelect = (item) => {
        if (!item) return;
        // the item selected
        setSearch('');
    };

    const handleOnFocus = () => {};

    const formatResult = (item) => {
        return (
            <span
                className="cursor-pointer truncate"
                style={{ display: 'block', textAlign: 'left', alignItems: 'center' }}
            >
                {item.name}
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
            styling={{ borderRadius: '999px', zIndex: '100', fontSize: '16px' }}
            placeholder="Tìm kiếm sản phẩm"
        />
    );
}

export default SearchComponent;
