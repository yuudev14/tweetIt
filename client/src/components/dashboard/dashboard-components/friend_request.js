import React from 'react';
import user from '../../../assets/user.png'
const FriendRequest = () => {
    return ( 
        <div className='friend_request_content'>
            <div className='user_profile'>
                <img src={user}/>
                <p>YuTakaki</p>
            </div>
            <div className='accept_delete'>
                <button className='accept'>Accept</button>
                <button className='delete'>Delete</button>
            </div>

        </div>
     );
}
 
export default FriendRequest;