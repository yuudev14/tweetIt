import React, {useState, useEffect} from 'react';
import user from '../../../assets/user.png';

const Comment = ({comment, username}) => {
    return ( 
        <div className='comment-content'>
            <div className='username-profile-comment'>
                <img src={user} />
            </div>
            <div className='comment'>
                <h3>{username}</h3>
                <p>{comment}</p>
            </div>
        </div>
     );
}
 
export default Comment;