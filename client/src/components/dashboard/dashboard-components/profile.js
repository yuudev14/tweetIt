import React, {useContext, useEffect, useState} from 'react';
import user from '../../../assets/user.png';
import FriendSuggestion from './friend_suggestion';
import axios from 'axios';
import { IsLogin } from '../../../contexts/isLogin';
import {withRouter, Link} from 'react-router-dom';
import { USERDATA } from '../../../contexts/userData';

const Profile = (props) => {
    const {userData} = useContext(USERDATA)
    const {auth, dispatch} = useContext(IsLogin);
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
                {friendSuggestions.map(friend => (
                    <FriendSuggestion friend={friend} setFriendSuggestion = {setFriendSuggestion}/>

                ))}
                
            </div>
        </>

     );
}
 
export default withRouter(Profile);