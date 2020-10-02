import React from 'react';
import heart from '../../../assets/heart.png';
import user from '../../../assets/user.png'

const Notification = () => {
    return ( 
        <div className='notification'>
            
            <div className='notification-type'>
                <img src={heart} />
                

            </div>
            <div className='notification-content'>
                
                <div className='username-pic'>
                    <img src={user} />

                </div>
                <p className='notif-about'>kil liked a tweet you were mentioned in</p>
                <p className='notif-info'>HAHAHHA ito parang tanga</p>

            </div>
        </div>
     );
}
 
export default Notification;