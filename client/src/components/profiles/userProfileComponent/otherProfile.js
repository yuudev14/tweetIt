import React, {useEffect, useState, useContext} from 'react';
import user from '../../../assets/user.png';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import NewsFeeds from '../../dashboard/dashboard-components/news-feed';
import { USERDATA } from '../../../contexts/userData';

const OtherProfile = (props) => {
    const {userData} = useContext(USERDATA);
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
    if(props.match.params.id !== userInfo.username){
        console.log('hi');
        axios.get(`/dashboard/other-user/${username}`)
            .then(res => {
                setUserInfo(res.data);
            });
    }
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
                    {userData.friends !== undefined ? userData.friends.some(friend => friend.username === userInfo.username && friend.accepted === true) ?
                          <button>Friends</button>  : userData.friends.some(friend => friend.username === userInfo.username && friend.accepted === false) ?
                          <button>Cancel Request</button> : userData.friendRequest.some(friend => friend.username === userInfo.username) ?  <button>Accept Friend</button> : <button>Add Friend</button> : null}
                    

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