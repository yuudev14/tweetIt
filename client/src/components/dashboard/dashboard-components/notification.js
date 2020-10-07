import React from 'react';
import heart from '../../../assets/heart.png';
import user from '../../../assets/user.png';
import {Link} from 'react-router-dom'

const Notification = ({notification}) => {
    const link = notification.post_id ? '' : notification.username
    return ( 
        <Link to={`/${link}`}>
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

        </Link>
        
     );
}
 
export default Notification;