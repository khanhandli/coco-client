import { Col, Row } from 'antd';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { getDataAPI } from '../../apis/fetchData';
import HomeHeader from '../../components/layouts/HomeHeader';

const Blogs = () => {
    const [blogs, setBlogs] = React.useState([]);

    React.useEffect(() => {
        (async () => {
            const res = await getDataAPI('post');
            if (res.status === 200) {
                setBlogs(res.data);
            }
        })();
    }, []);

    return (
        <div className="px-[60px] py-[30px] flex flex-col h-screen">
            <HomeHeader />
            <div className="flex-1 flex mt-[40px]">
                <Row gutter={[40, 40]} className="w-full">
                    {blogs.map((item, index) => (
                        <Col key={index} sm={12} xs={24} lg={12} xl={8} className="h-fit">
                            <div className="shadow-xl border mt-6 flex justify-center  p-4 rounded-2xl pt-10">
                                <div className="w-full bg-white h-[530px] flex flex-col justify-between">
                                    <div>
                                        <img className="object-cover h-[300px] w-full" src={item?.image} alt="213" />
                                        <h2 className="uppercase text-lg truncate mt-3 font-bold">{item.title}</h2>
                                        <h3
                                            className="text-md truncate truncate"
                                            dangerouslySetInnerHTML={{ __html: item?.content?.slice(0, 1000) }}
                                        />
                                    </div>
                                    <div className="flex justify-end">
                                        <NavLink to={`/blog/${item._id}`}>
                                            <button
                                                type="button"
                                                className="flex text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium text-sm px-5 py-2.5 text-center mr-2 mb-2 rounded-full"
                                            >
                                                <span>Xem chi tiết</span>
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
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
};

export default Blogs;
