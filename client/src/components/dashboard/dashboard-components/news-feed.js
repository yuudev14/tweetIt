import React, {useContext, useState, useEffect} from 'react';
import user from '../../../assets/user.png';
import { IsLogin } from '../../../contexts/isLogin';
import axios from 'axios';
import { USERDATA } from '../../../contexts/userData';
import Comment from './comment';
import {Link, withRouter} from 'react-router-dom';
import { NEWS_FEED } from '../../../contexts/news-feed-context';

const NewsFeeds = (props) => {
    const {post, username,index} = props;
    
    const {newsFeed} = useContext(NEWS_FEED);
    const [statePost, setPost] = useState({
        _id : '',
        Likes : [],
        comments : [],

    });
    const [commentInput, setCommentInput] = useState('');

    const {auth} = useContext(IsLogin);
    const {userData} = useContext(USERDATA);

    // useEffect(() => {
    //     console.log(statePost);
    // },[statePost])
    useEffect(() => {
        setPost(post);
        if(props.match.params.id){
            if(index === 0){
                axios.get(`/dashboard/other-user/${props.match.params.id}`)
                    .then(res => {
                        console.log(res.data)
                        setPost(res.data.posts[0]);
                    });
            }
    
        }
    },[]);

    
    if(!props.match.params.id){
        if(statePost._id !== newsFeed[index]._id){
            setPost(newsFeed[index])
        }
    }

    

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

    const dropdownToggle = (e) => {
        document.querySelectorAll('.news-feed .dropdownOption').forEach(d => d === e.target.nextSibling ?
             d.classList.toggle('dropdown-active') : d.classList.remove('dropdown-active'))
        // e.target.nextSibling.classList.toggle('dropdown-active')
    }
    const link = username === userData.username ? 'user' : username;
    return (
        <div className='news-feed'>
            <div className='profile_logo'>
                <div className='logo'>
                    <img src={user} />
                </div>
            </div>
            <div className='feed-content'>
                <div className='feed-user-info'>
                    <Link to={`/${link}`}><p className='feed-username'>{username}</p></Link>
                    <p className='date'>10/06/20</p>
                    {userData.username === username ? (
                        <>
                            <i onClick={dropdownToggle } className='fa fa-angle-down'></i>
                            <div className='dropdownOption'>
                                
                                <button>Delete</button>
                                <button>Edit</button>
                                

                            </div>
                        </>
                    ) : null}
                    
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
                        <Comment key={i} id={comment._id} comment={comment.comment} username={comment.username} postOwner={statePost.username}/>
                    ))}

                    </div>

                </div>
            </div>
        </div>
      );
}
 
export default withRouter(NewsFeeds);