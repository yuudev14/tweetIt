import React from 'react';
import user from '../../../assets/user.png';
import FriendSuggestion from './friend_suggestion';

const Profile = () => {
    return ( 
        <>
            <div className='profile'>
                <div className='profile_info'>
                    <img src={user}/>
                    <p>YuTakaki</p>
                </div>
                
                <button className='log-out'>Log-out</button>
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
 
export default Profile;