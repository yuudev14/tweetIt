import React, {useContext, useState, useEffect} from 'react';
import user from '../../../assets/user.png';
import { IsLogin } from '../../../contexts/isLogin';
import axios from 'axios';
import { USERDATA } from '../../../contexts/userData';
import Comment from './comment';
import {Link, withRouter} from 'react-router-dom';
import { NEWS_FEED } from '../../../contexts/news-feed-context';
import profile from './profile';

const NewsFeeds = (props) => {
    const {post, username,index} = props;
    
    const {newsFeed, dispatch_newsFeed} = useContext(NEWS_FEED);
    const [statePost, setPost] = useState({
        _id : '',
        Likes : [],
        comments : [],


    });

    const [profilePic, setProfilePic] = useState();

    useEffect(() => {
        axios.get(`/dashboard/other-user/${username}`)
            .then(res => {
                setProfilePic(res.data.profilePic);
            });
    }, []);
    const [commentInput, setCommentInput] = useState('');
    const [postContent, setPostContent] = useState('')

    const {auth} = useContext(IsLogin);
    const {userData, dispatchUser} = useContext(USERDATA);

    useEffect(() => {
        setPostContent(statePost.tweet);
    },[statePost])
    useEffect(() => {
        setPost(post);
        if(props.match.params.id){
            if(index === 0){
                axios.get(`/dashboard/other-user/${props.match.params.id}`)
                    .then(res => {
                        setPost(res.data.posts[0]);
                        console.log(res.data.profilePic);
                        setProfilePic(res.data.profilePic);
                    });
            }
        }else{
            if(profilePic === undefined){
                axios.get(`/dashboard/other-user/${username}`)
                .then(res => {
                    document.querySelector('.weirdPic').src = res.data.profilePic
                });
            }
        }
    },[]);

    
    if(!props.match.params.id && newsFeed[index]){
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
    const deleting = () => {
        axios.post(`dashboard/delete-post/${auth.code}`,{post_id : statePost._id})
            .then(res => {
                dispatchUser({type : 'USERDATA', data : res.data});
                axios.get(`/dashboard/news-feed/${auth.code}`)
                    .then(res => {
                        dispatch_newsFeed({type : 'NEWSFEED', data : res.data});
                    })
            })
    }

    const update = (value) => {
        axios.post(`/dashboard/update-post/${auth.code}`,{
            post_id : statePost._id,
            tweet : value
        }).then(res =>{
                setPost(res.data)

        })
        


    }
    const edit = (e) => {
        e.target.parentElement.parentElement.parentElement.nextSibling.nextSibling.firstChild.classList.add('pop');
        e.target.parentElement.parentElement.parentElement.nextSibling.nextSibling.firstChild.focus();
        e.target.parentElement.parentElement.parentElement.nextSibling.nextSibling.firstChild.disabled = false
        
        e.target.parentElement.classList.remove('dropdown-active')
    }
    const notif = statePost.comments !== 'undefined' ? statePost.comments.map((comment, i) => (
        <Comment index={i} setPost={setPost} key={i} post_id={statePost._id} comment_id={comment._id} comment={comment.comment} username={comment.username} postOwner={username}/>
    )) : null;

    const keyPress = (e) => {
        if(e.which === 13){
            update(e.target.value);
            e.target.classList.remove('pop');
            e.target.value = ''
        }

    }

    const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    const date = new Date(statePost.date)
    const dateText = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} ${date.getHours()}: ${date.getMinutes()}`;
    return (
        <div className='news-feed'>
            <div className='profile_logo'>
                <div className='logo'>
                    <img className='weirdPic' src={profilePic === '' || profilePic === undefined ? user : profilePic} />
                </div>
            </div>
            <div className='feed-content'>
                <div className='feed-user-info'>
                    <Link to={`/${link}`}><p className='feed-username'>{username}</p></Link>
                    
                    <div className='date'>
                        <p id='Postdate'>{dateText}</p>
                        {userData.username === username ? (
                            <>
                                <i onClick={dropdownToggle } className='fa fa-angle-down'></i>
                                <div className='dropdownOption'>
                                    
                                    <button onClick={deleting}>Delete</button>
                                    <button onClick={edit}>Edit</button>
                                    

                                </div>
                            </>
                        ) : null}

                    </div>
                    
                    
                </div>
                <p>{postContent}</p> 
                
                <form onSubmit={update} className='tweet-content'>
                    
                    <textarea onKeyPress={keyPress} placeholder='type updated post' ></textarea>

                </form>
                <img src={statePost.image}/>
              
                

            
                
                <div className='icons'>
                    <ul>
                        <li>
                            {statePost.Likes ? statePost.Likes.some(like => like.username === userData.username) ? 
                                <i onClick={like} className='fa fa-heart liked'></i>:
                                <i onClick={like} className='fa fa-heart'></i> : null}
                            
                            <p>{statePost.Likes ? statePost.Likes.length : ''}</p>
                        </li>
                        <li>
                            <i onClick={comment} className='fa fa-comment'></i>
                            <p>{statePost.comments ? statePost.comments.length : ''}</p>
                        </li>
                    </ul>
                </div>
                <div className='comment-section'>
                    <form onSubmit={addComment}>
                        <input onChange={setComment} value={commentInput} type='text' placeholder='write a comment...'/>
                    </form>
                    <div className='comment-container'>
                    {notif}

                    </div>

                </div>
            </div>
        </div>
      );
}
 
export default withRouter(NewsFeeds);