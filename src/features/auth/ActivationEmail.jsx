import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { postDataAPI } from '../../apis/fetchData';
import { getNotification } from '../../utils/common';

function ActivationEmail() {
    const navigate = useNavigate();

    const { search } = useLocation();

    useEffect(() => {
        if (search) {
            const activationEmail = async () => {
                try {
                    const res = await postDataAPI('activation', { activation_token: search.slice(7) });

                    if (res.status == 200) {
                        getNotification(res.data.msg, 'success');
                    }

                    navigate('/login');
                } catch (err) {
                    getNotification(err?.response?.data?.msg, 'error');
                }
            };
            activationEmail();
        }
    }, [search]);

    return (
        <div className="active_page">
            {/* {err && showErrMsg(err)}
            {success && showSuccessMsg(success)} */}
        </div>
    );
}

export default ActivationEmail;
