import React, {useContext, useEffect, useState} from 'react';
import user from '../../../assets/user.png';
import FriendSuggestion from './friend_suggestion';
import axios from 'axios';
import { IsLogin } from '../../../contexts/isLogin';
import {withRouter, Link} from 'react-router-dom';
import { USERDATA } from '../../../contexts/userData';
import { NEWS_FEED } from '../../../contexts/news-feed-context';

const Profile = (props) => {
    const {userData, dispatchUser} = useContext(USERDATA);
    const {auth, dispatch} = useContext(IsLogin);
    const {dispatch_newsFeed} = useContext(NEWS_FEED);
    const [friendSuggestions, setFriendSuggestion] = useState([{username : '', _id : ''}]);
    useEffect(() => {
        axios.get(`/dashboard/friends-suggestion/${auth.code}`)
            .then(res =>{
                setFriendSuggestion(res.data);
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
    return ( 
        <>
            <div className='profile'>
                <div className='profile_info'>
                    <Link to='/user'><img src={user}/></Link>
                    <p>{userData.username}</p>
                </div>
                
                <button onClick={logout} className='log-out'>Log-out</button>
            </div>
            <h1>Friend Suggestions</h1>
            <div className='friend_suggestion_container'>
                {friendSuggestions.map((friend, i) => (
                    <FriendSuggestion key={i} friend={friend} setFriendSuggestion = {setFriendSuggestion}/>

                ))}
                
            </div>
        </>

     );
}
 
export default withRouter(Profile);