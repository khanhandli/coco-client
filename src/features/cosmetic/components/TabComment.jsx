import { Rate } from 'antd';
import React from 'react';
import CommentItem from './CommentItem';
import FormInput from './FormInput';

const Comment = ({ comments, id, socket, product_name }) => {
    const [rating, setRating] = React.useState(0);
    const [loading, setLoading] = React.useState(false);

    return (
        <div className="comments w-full pb-4 bg-[rgba(255,255,255,.05)] rounded-2xl text-cyan-50">
            <h2 className="text-xl">Đánh Giá - Nhận Xét</h2>

            <div className="flex justify-between">
                <div className="w-[34%] ml-4">
                    <div className="flex items-center">
                        <div className="mr-2 text-black text-lg font-bold">Đánh giá | </div>
                        <Rate
                            allowHalf
                            value={rating || 0}
                            onChange={(value) => setRating(value)}
                            style={{ fontSize: '20px' }}
                        />
                    </div>

                    <FormInput product_name={product_name} id={id} socket={socket} rating={rating} />
                </div>
                <div className="w-[60%]">
                    <div className="comments_list">
                        {comments.map((comment) => (
                            <CommentItem
                                product_name={product_name}
                                key={comment._id}
                                comment={comment}
                                socket={socket}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comment;
