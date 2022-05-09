import React from 'react';
import { useDispatch } from 'react-redux';
import { useVoice } from '../../../hooks/useVoice';
import { setProductBySearch, setProductBySort } from '../../../redux/productSlice';

const ListSearch = [
    {
        title: 'Phổ biến',
        path: 'sold',
    },
    {
        title: 'Mới nhất',
        path: 'new',
    },
    {
        title: 'Cũ nhất',
        path: 'old',
    },
    {
        title: 'Giá',
        path: 'price',
    },
];

const Search = ({ sort, setSort }) => {
    const dispatch = useDispatch();
    const { text, isListening, listen, voiceSupported } = useVoice();
    const [search, setSearch] = React.useState('');

    if (!voiceSupported) {
        return (
            <div className="app">
                <h1>
                    Voice recognition is not supported by your browser, please retry with a supported browser e.g.
                    Chrome
                </h1>
            </div>
        );
    }

    React.useEffect(() => {
        if (text) {
            if (text === 'hủy tìm kiếm' || text === 'đóng' || text === 'hủy') {
                setSearch('');
                dispatch(setProductBySearch(''));
                return;
            }
            setSearch(text);
            dispatch(setProductBySearch(text));
        }
    }, [text]);

    return (
        <div>
            <label htmlFor="voice-search" className="sr-only">
                Search
            </label>
            <div className="relative w-full">
                <div className="flex absolute inset-y-0 left-2 items-center pl-3 pointer-events-none">
                    <svg
                        className="w-5 h-5 text-gray-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </div>
                <input
                    type="text"
                    value={search}
                    id="voice-search"
                    className="transition-all bg-gray-50 shadow-sm text-gray-900 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 outline-[1px] outline-sky-200 block w-full pl-12 p-3 px-4"
                    placeholder="Nhập để tìm kiếm..."
                    required
                    onChange={(e) => {
                        dispatch(setProductBySearch(e.target.value));
                        setSearch(e.target.value);
                    }}
                />
                {search && (
                    <button
                        onClick={() => {
                            setSearch('');
                            dispatch(setProductBySearch(''));
                        }}
                        type="button"
                        className="flex absolute inset-y-0 right-8 items-center pr-3"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            style={{ fill: '#000000' }}
                        >
                            <path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z"></path>
                        </svg>
                    </button>
                )}
                <button onClick={listen} type="button" className="flex absolute inset-y-0 right-2 items-center pr-3">
                    <svg
                        className={`w-4 h-4 ${isListening ? 'text-gray-900' : 'text-gray-500'} hover:text-gray-900`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                    {isListening ? (
                        <span className="flex h-3 w-3">
                            <span className="animate-ping absolute top-0 right-3 inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                        </span>
                    ) : (
                        <></>
                    )}
                </button>
            </div>
            {search && (
                <div className="text-[18px] mt-6 mb-5 font-medium">
                    <span className="font-normal text-[15px] italic mr-2 text-[#ccc]">Kết quả tìm kiếm cho</span>
                    <span className="font-bold">"{search}"</span>
                </div>
            )}

            <div className="flex items-center my-6">
                <span className="mr-6 text-lg font-medium text-[#888]">Lọc</span>

                {ListSearch.map((item, index) => {
                    if (item.path === sort) {
                        return (
                            <button
                                type="button"
                                className="text-gray-500 w-[140px] bg-gradient-to-r from-teal-200 mx-2 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 :focus:ring-teal-700 font-medium rounded-full text-sm px-5 py-2.5 text-center"
                            >
                                {item.title}
                            </button>
                        );
                    } else {
                        return (
                            <button
                                onClick={() => {
                                    dispatch(setProductBySort(item.path));
                                    setSort(item.path);
                                }}
                                className="relative inline-flex items-center justify-center p-0.5 mx-2 overflow-hidden text-sm font-medium text-gray-500 w-[140px] rounded-full group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 focus:ring-4 focus:outline-none focus:ring-lime-200"
                            >
                                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white w-[140px]  rounded-full group-hover:bg-opacity-0">
                                    {item.title}
                                </span>
                            </button>
                        );
                    }
                })}
            </div>
        </div>
    );
};

export default Search;
