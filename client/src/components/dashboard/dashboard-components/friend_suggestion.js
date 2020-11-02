import React, {useContext} from 'react';
import user from '../../../assets/user.png';
import axios from 'axios';
import { IsLogin } from '../../../contexts/isLogin';
import { USERDATA } from '../../../contexts/userData';
import { FRIEND_SUGGESTION } from '../../../contexts/friendSuggestion-context';
import {Link} from 'react-router-dom';

const FriendSuggestion = ({friend}) => {
    const {auth} = useContext(IsLogin);
    const {dispatch_suggestion} = useContext(FRIEND_SUGGESTION);
    const {dispatchUser} = useContext(USERDATA);

    const addFriend = () => {
        axios.post('/dashboard/add-friend',{
            username : friend.username,
            _id : friend._id,
            user_id : auth.code
        })
            .then(res => {
                if(res.data !== 'already a friend'){
                    dispatchUser({type: 'USERDATA', data : res.data});
                    axios.get(`/dashboard/friends-suggestion/${auth.code}`)
                        .then(res =>{
                            dispatch_suggestion({type :'SUGGESTION', data : res.data});
                        });  
                };
                
            });
    };
    return (
        <div className='suggestion' key={friend._id}>
            <div className='suggestion_user_profile'>
                <img className='friend_sugg_prof' src={user} alt=''/>
                <Link to={`/${friend.username}`}><p>{friend.username}</p></Link>
            </div>
            <button onClick={addFriend} className='send_request'>Add Friend</button>
        </div>
      );
}
 
export default FriendSuggestion;