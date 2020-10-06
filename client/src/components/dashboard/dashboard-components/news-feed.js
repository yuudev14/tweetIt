import React, {useContext, useState, useEffect} from 'react';
import user from '../../../assets/user.png';
import { IsLogin } from '../../../contexts/isLogin';
import axios from 'axios';
import { USERDATA } from '../../../contexts/userData';
import Comment from './comment';

const NewsFeeds = ({post, username}) => {
    const [statePost, setPost] = useState(post);
    const [commentInput, setCommentInput] = useState('');

    const {auth} = useContext(IsLogin);
    const {userData, dispatch} = useContext(USERDATA);

    useEffect(() => {
        console.log(statePost);
    },[statePost])

    const like = () => {
        axios.post(`/dashboard/like/${auth.code}`, {
            _id : post._id, 
            username
        }).then(res => {
            setPost(res.data)
        });
    };

    const comment = (e) => {
        e.target.parentElement.parentElement.parentElement.nextSibling.classList.toggle('comment-active');
    };

    const addComment = (e) => {
        e.preventDefault();
        axios.post(`/dashboard/add-comment/${auth.code}`, {
            _id : post._id, 
            comment : commentInput,
            username
        }).then(res => {
            setPost(res.data);
            setCommentInput('');
            
        });
        

    };

    const setComment = (e) => {
        setCommentInput(e.target.value);
    }
    return (
        <div className='news-feed'>
            <div className='profile_logo'>
                <div className='logo'>
                    <img src={user} />
                </div>
            </div>
            <div className='feed-content'>
                <div className='feed-user-info'>
                    <p className='feed-username'>{username}</p>
                    <p className='date'>10/06/20</p>
                </div>
                <div className='tweet-content'>
                    <p>{statePost.tweet}</p>
                </div>
                <div className='icons'>
                    <ul>
                        <li>
                            {statePost.Likes.some(like => like.username === userData.username) ? 
                                <i onClick={like} className='fa fa-heart liked'></i>:
                                <i onClick={like} className='fa fa-heart'></i>}
                            
                            <p>{statePost.Likes.length}</p>
                        </li>
                        <li>
                            <i onClick={comment} className='fa fa-comment'></i>
                            <p>{statePost.comments.length}</p>
                        </li>
                    </ul>
                </div>
                <div className='comment-section'>
                    <form onSubmit={addComment}>
                        <input onChange={setComment} value={commentInput} type='text' placeholder='write a comment...'/>
                    </form>
                    <div className='comment-container'>
                    {statePost.comments.map((comment, i) => (
                        <Comment key={i} comment={comment.comment} username={comment.username} />
                    ))}

                    </div>

                </div>
            </div>
        </div>
      );
}
 
export default NewsFeeds;