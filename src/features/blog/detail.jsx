import React from 'react';
import { useParams } from 'react-router-dom';
import { getDataAPI } from '../../apis/fetchData';
import HomeHeader from '../../components/layouts/HomeHeader';

const DetailBlog = () => {
    const { id } = useParams();
    const [detailBlog, setDetailBlog] = React.useState();

    React.useEffect(() => {
        (async () => {
            const res = await getDataAPI(`post/${id}`);
            if (res.status === 200) {
                setDetailBlog(res.data);
            }
        })();
    }, [id]);

    return (
        <div className="px-[60px] py-[30px] flex flex-col h-screen">
            <HomeHeader />
            <div className="flex-1 flex mt-[40px] overflow-y-auto custom_scroll">
                <div dangerouslySetInnerHTML={{ __html: detailBlog?.content }} />
            </div>
        </div>
    );
};

export default DetailBlog;
