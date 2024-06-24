import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postActions } from '../action/postAction';

const CommentInput = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [ newComment, setNewComment ] = useState('');
    const { user } = useSelector((state) => state.user);

    // 댓글 보내기 기능
    const createComment = (e) => {
        e.preventDefault();
        dispatch(postActions.createComment(id, newComment))
    }

    return (
        <div className='comment-input'>
            <div className='header'>
                <div className='img'><img src={user?.profileImage} alt=''/></div>
                <div>{user?.nickName}</div>
            </div>
            <Form className='body' onSubmit={createComment}>
                <Form.Group controlId="comment">
                    <Form.Control
                        as="textarea"
                        type="text"
                        rows={3}
                        placeholder='댓글을 작성해주세요.'
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                </Form.Group>
                <button type='submit' className='green-btn'>등록</button>
            </Form>
        </div>
    )
}

export default CommentInput