import React, {useContext, useEffect} from 'react';
import user from '../../../assets/user.png';
import FriendSuggestion from './friend_suggestion';
import axios from 'axios';
import { IsLogin } from '../../../contexts/isLogin';
import {withRouter, Link} from 'react-router-dom';
import { USERDATA } from '../../../contexts/userData';
import { NEWS_FEED } from '../../../contexts/news-feed-context';
import { FRIEND_SUGGESTION } from '../../../contexts/friendSuggestion-context';

const Profile = (props) => {
    const {userData, dispatchUser} = useContext(USERDATA);
    const {suggestionList, dispatch_suggestion} = useContext(FRIEND_SUGGESTION);
    const {auth, dispatch} = useContext(IsLogin);
    const {dispatch_newsFeed} = useContext(NEWS_FEED);
    useEffect(() => {
        axios.get(`/dashboard/friends-suggestion/${auth.code}`)
            .then(res =>{
    
                dispatch_suggestion({type :'SUGGESTION', data : res.data});
            });
    },[]);
    
    const logout = () => {
        axios.get('/authentication/log-out')
            .then(res => {
                dispatch({type : 'LOGOUT'});
                props.history.push('/home');
                dispatchUser({type: 'RESET'});
                dispatch_newsFeed({type: 'RESET'});

            })
    }
    const profPic = userData.profilePic === '' ? user : userData.profilePic
    return ( 
        <>
            <div className='profile'>
                <div className='profile_info'>
                    <Link to='/user'><img src={profPic} alt='profile'/></Link>
                    <p>{userData.username}</p>
                </div>
                
                <button onClick={logout} className='log-out'>Log-out</button>
            </div>
            <h1>Friend Suggestions</h1>
            <div className='friend_suggestion_container'>
                {suggestionList.map((friend, i) => (
                    <FriendSuggestion index = {i} key={i} friend={friend}/>
                ))}
                
            </div>
        </>

     );
}
 
export default withRouter(Profile);