import React, {useContext} from 'react';
import user from '../../../assets/user.png';
import FriendSuggestion from './friend_suggestion';
import axios from 'axios';
import { IsLogin } from '../../../contexts/isLogin';
import {withRouter, Link} from 'react-router-dom';

const Profile = (props) => {
    const {dispatch} = useContext(IsLogin);
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
                    <p>YuTakaki</p>
                </div>
                
                <button onClick={logout} className='log-out'>Log-out</button>
            </div>
            <h1>Friend Suggestions</h1>
            <div className='friend_suggestion_container'>
                
                <FriendSuggestion />
                <FriendSuggestion />
                <FriendSuggestion />
                <FriendSuggestion />
                <FriendSuggestion />
                <FriendSuggestion />
                <FriendSuggestion />
                <FriendSuggestion />
                
            </div>
        </>

     );
}
 
export default withRouter(Profile);