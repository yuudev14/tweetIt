import React, {useState, useEffect, useContext} from 'react';
import user from '../../../assets/user.png';
import axios from 'axios';
import { IsLogin } from '../../../contexts/isLogin';
import { USERDATA } from '../../../contexts/userData';

const FriendSuggestion = ({friend, setFriendSuggestion}) => {
    const {auth} = useContext(IsLogin);
    const {dispatchUser} = useContext(USERDATA);

    const addFriend = () => {
        axios.post('/dashboard/add-friend',{
            username : friend.username,
            _id : friend._id,
            user_id : auth.code
        })
            .then(res => {
                dispatchUser({type: 'USERDATA', data : res.data});
                axios.get(`/dashboard/friends-suggestion/${auth.code}`)
                    .then(res =>{
                        setFriendSuggestion(res.data);
                    });  
            });
    };
    return (
        <div className='suggestion' key={friend._id}>
            <div className='suggestion_user_profile'>
                <img className='friend_sugg_prof' src={user}/>
                <p>{friend.username}</p>
            </div>
            <button onClick={addFriend} className='send_request'>Add Friend</button>
        </div>
      );
}
 
export default FriendSuggestion;