import React,{useContext} from 'react';
import heart from '../../../assets/heart.png';
import user from '../../../assets/user.png';
import {Link, withRouter} from 'react-router-dom'
import { NEWS_FEED } from '../../../contexts/news-feed-context';
import axios from 'axios';

const Notification = (props) => {
    const {notification, username}=props;

    const{dispatch_newsFeed} = useContext(NEWS_FEED);

    const link = notification.post_id ? `post?username=${username}&post_id=${notification.post_id}` : notification.username;
    const go = () => {
        axios.get(`/dashboard/${link}`)
            .then(res => {
                console.log(res.data);
                if(res.data !== false){
                    dispatch_newsFeed({type : 'NEWSFEED', data : res.data})
                    console.log(res.data);
                    // props.location.push(`/dashboard/${link}`)
                }
            })
    }
    return ( 
        <Link onClick={go}>
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
 
export default withRouter(Notification);