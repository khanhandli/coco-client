import React from 'react';
import moment from 'moment';
import { Avatar, Rate } from 'antd';

function CommentCard({ children, comment, reply }) {
    return (
        <div className={reply ? 'comment_card comment_card-reply' : 'comment_card comment_card-noreply'}>
            <div className="comment_card_row w-full">
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        color: 'white',
                        justifyContent: 'space-between',
                        width: '100%',
                    }}
                >
                    <div className="flex items-center">
                        <Avatar src={comment?.avatar} alt="Han Solo" />
                        <h3 className="text-black ml-2 mr-1">{comment?.username}</h3>
                    </div>
                    <div className="flex items-end flex-col">
                        {comment.rating !== 0 && <Rate allowHalf value={comment.rating} style={{ fontSize: '20px' }} />}
                        <span className="text-[#ccc] text-sm">{moment(comment.createdAt).fromNow()}</span>
                    </div>
                </div>
            </div>

            <p
                className=" text-[.900rem] text-black mb-2 ml-2"
                style={{ textTransform: 'capitalize', color: 'white !important' }}
                dangerouslySetInnerHTML={{ __html: comment.content }}
            ></p>

            {children}
        </div>
    );
}

export default CommentCard;
