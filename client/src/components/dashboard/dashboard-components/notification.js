import React from 'react';
import heart from '../../../assets/heart.png';
import user from '../../../assets/user.png'

const Notification = ({notification}) => {
    return ( 
        <div className='notification'>
            
            <div className='notification-type'>
                <img src={heart} />
                

            </div>
            <div className='notification-content'>
                
                <div className='username-pic'>
                    <img src={user} />

                </div>
                <p className='notif-about'><span className='username'>{notification.username}</span> {notification.about}</p>

            </div>
        </div>
     );
}
 
export default Notification;