import React from 'react';
import user from '../../../assets/user.png';
const FriendSuggestion = () => {
    return (
        <div className='suggestion'>
            <div className='suggestion_user_profile'>
                <img className='friend_sugg_prof' src={user}/>
                <p>YuTakaki</p>
            </div>
            <button className='send_request'>Add Friend</button>
        </div>
      );
}
 
export default FriendSuggestion;