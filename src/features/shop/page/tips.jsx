import { PageHeader } from 'antd';
import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getDataAPI } from '../../../apis/fetchData';
import AppLayout from '../../../components/layouts/AppLayout';

const Tips = () => {
    const navigate = useNavigate();
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
        <AppLayout>
            <PageHeader
                title={
                    <span className="mr-6 text-[1rem] font-medium text-[#888] uppercase ">
                        <Link to="/home">Cửa hàng</Link> / MẸO LÀM ĐẸP - ĐÁNH GIÁ
                    </span>
                }
                onBack={() => navigate(-1)}
            >
                <div className="mt-2" dangerouslySetInnerHTML={{ __html: detailBlog?.content }} />
            </PageHeader>
        </AppLayout>
    );
};

export default Tips;
