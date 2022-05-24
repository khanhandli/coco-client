import { Button, Input } from 'antd';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { patchDataAPI } from '../../../apis/fetchData';
// import { patchData } from '../../ultils/FetchData';
function FormInput({ id, socket, rating, setReply, send, name, product_name }) {
    const user = useSelector((state) => state.user.user);
    const contentRef = useRef();

    useEffect(() => {
        if (name) {
            contentRef.current.innerHTML = `
                <a href="#!"
                    style="
                    font-weight: 600;
                    text-reansform: capitatlize;
                    color: #ccc;
                    font-size: 14px;"
                >${name}: </a>
            `;
        }
    }, [name]);

    const commentClick = () => {
        const content = contentRef.current.innerHTML;

        if (contentRef.current.textContent.trim().length < 10)
            return alert('Nội dung quá ngắn, nội dung lớn hơn 10 kí tự!');

        const createdAt = new Date().toISOString();

        socket.emit('createComment', {
            username: user.name,
            content,
            avatar: user.avatar,
            product_id: id,
            createdAt,
            product_name,
            rating,
            send,
        });

        if (rating && rating !== 0) {
            patchDataAPI(`product/${id}`, { rating });
        }

        contentRef.current.innerHTML = '';

        if (setReply) setReply(false);
    };
    return (
        <div className="form_input mt-4">
            <div
                ref={contentRef}
                contentEditable="true"
                placeholder="Nhập đánh giá ..."
                className="rounded-lg bg-[rgb(239,239,239)]"
                style={{
                    height: '100px',
                    border: '1px solid #d9d9d9',
                    padding: '4px 11px',
                    outline: 'none',
                    color: '#000000d9',
                    fontSize: '15px',
                    margin: '14px 4px',
                    transition: 'all .3s,height 0s',
                }}
            />
            <div className="flex justify-end">
                <Button type="primary" style={{ padding: '0 40px', borderRadius: '20px' }} onClick={commentClick}>
                    Gửi
                </Button>
            </div>
        </div>
    );
}

export default FormInput;
