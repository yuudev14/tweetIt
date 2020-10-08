import React, {useEffect, useState} from 'react';
import user from '../../../assets/user.png';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import NewsFeeds from '../../dashboard/dashboard-components/news-feed';

const OtherProfile = (props) => {
    const username = props.match.params.id;
    const [userInfo, setUserInfo] = useState({
        posts : [{
            _id : '',
            Likes : [],
            comments : [],
        }]
    });
    useEffect(()=>{
        axios.get(`/dashboard/other-user/${username}`)
            .then(res => {
                setUserInfo(res.data);
            });


    },[]);
    useEffect(() => {
        console.log(userInfo);
    },[userInfo]);



    return ( 
        <section className='userHomeProfile-section'>
            <div className='Userpicture'>
                <div className='coverPhoto'>

                </div>
                <div className='profilePicAndBtn'>
                    <div className='prof-pic'>
                        <img src={user} />
                        <p>{userInfo.username}</p>



                    </div>
                    <button>Edit Profile</button>

                </div>
                

            </div>
            <div className='friend-total-container'>
                <h3>Friends</h3>
                <button>See All</button>
            </div>
            


            <div className='user-posts'>
                <div className='news-feed-container'>
                    {userInfo.posts.map((post, i) => <NewsFeeds key={i} post={post} index = {i} username={userInfo.username}/>) || null}
                    
                </div>
                
            </div>

        </section>
     );
}
 
export default withRouter(OtherProfile);