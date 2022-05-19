import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
const SlideBlogPreview = ({ listBlog }) => {
    console.log('🚀 ~ file: SlideBlogPreview.jsx ~ line 4 ~ SlideBlogPreview ~ listBlog', listBlog);
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 4000,
        slidesToShow: 4,
        slidesToScroll: 2,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    return (
        <div className="w-[99%] mt-6">
            <Slider {...settings}>
                {listBlog &&
                    listBlog.length > 0 &&
                    listBlog.map((item, index) => (
                        <div key={index}>
                            <div className="flex justify-center">
                                <div className="w-[90%] bg-white h-[480px] flex flex-col justify-between">
                                    <div>
                                        <img className="object-cover h-[280px] w-full" src={item.image} alt="213" />
                                        <h2 className="uppercase text-lg truncate mt-3 font-bold">{item.title}</h2>
                                        <h3
                                            className="text-md truncate"
                                            dangerouslySetInnerHTML={{ __html: item.content.slice(0, 900) }}
                                        />
                                    </div>
                                    <Link to={`/home/tips/${item._id}`}>
                                        <div className="flex justify-end">
                                            <button
                                                type="button"
                                                className="flex text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium text-sm px-5 py-2.5 text-center mr-2 mb-2 rounded-full"
                                            >
                                                <span>Đọc tiếp</span>
                                                <svg
                                                    className="w-5 h-5 ml-2 -mr-1"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    ></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
            </Slider>
        </div>
    );
};

export default SlideBlogPreview;
