import React, {useEffect, useState, useContext} from 'react';
import user from '../../../assets/user.png';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import NewsFeeds from '../../dashboard/dashboard-components/news-feed';
import { USERDATA } from '../../../contexts/userData';
import { IsLogin } from '../../../contexts/isLogin';
import { FRIEND_SUGGESTION } from '../../../contexts/friendSuggestion-context';

const OtherProfile = (props) => {
    const {userData, dispatchUser} = useContext(USERDATA);
    const {dispatch_suggestion} = useContext(FRIEND_SUGGESTION);
    const {auth} = useContext(IsLogin);
    const username = props.match.params.id;
    const [userInfo, setUserInfo] = useState({
        posts : []
    });
    useEffect(()=>{
        axios.get(`/dashboard/other-user/${username}`)
            .then(res => {
                if(res.status === 404){
                    props.history.push('/')
                }else{
                    setUserInfo(res.data);

                }
                
            });
    },[]);
    if(props.match.params.id !== userInfo.username){
       
        axios.get(`/dashboard/other-user/${username}`)
            .then(res => {
                setUserInfo(res.data);
            });
    }


    const acceptFriend = () => {
        axios.post(`dashboard/acceptFriend/${auth.code}`, {
            username : userInfo.username, 
            _id : userInfo._id
        }).then(res => {

            axios.get(`/dashboard/user/${auth.code}`)
                .then(res => {
                    dispatchUser({type : 'USERDATA', data : res.data});
                });
        });
    };

    const cancelRequest = () => {
        axios.post(`/dashboard/cancel-request/${auth.code}`, {username : userInfo.username})
            .then(res => {
                dispatchUser({type : 'USERDATA', data : res.data});
            });
    };

    const addFriend = () => {
        axios.post('/dashboard/add-friend',{
            username : userInfo.username,
            _id : userInfo._id,
            user_id : auth.code
        })
            .then(res => {
                if(res.data !== 'already a friend'){
                    dispatchUser({type: 'USERDATA', data : res.data});
                    axios.get(`/dashboard/friends-suggestion/${auth.code}`)
                        .then(res =>{
                            dispatch_suggestion({type :'SUGGESTION', data : res.data});
                        });
                };
            });
    };

    const unFriend = (req, res) => {
        axios.post(`/dashboard/unFriend/${auth.code}`, {username : userInfo.username})
            .then(res => {
                dispatchUser({type : 'USERDATA', data : res.data});
            });
    }

    const profPic = userInfo.profilePic === '' ? user : userInfo.profilePic



    return ( 
        
        <section className='userHomeProfile-section'>
            <div className='Userpicture'>
                <div className='coverPhoto'>

                </div>
                <div className='profilePicAndBtn'>
                    <div className='prof-pic'>
                        <img src={profPic} alt='prof-pic'/>
                        <p>{userInfo.username}</p>
                    </div>
                    {userData.friends !== undefined ? userData.friends.some(friend => friend.username === userInfo.username && friend.accepted === true) ?
                          <button onClick={unFriend}>Unfriend</button>  : userData.friends.some(friend => friend.username === userInfo.username && friend.accepted === false) ?
                          <button onClick={cancelRequest}>Cancel Request</button> : userData.friendRequest.some(friend => friend.username === userInfo.username) ?  <button onClick={acceptFriend}>Accept Friend</button> : <button onClick={addFriend}>Add Friend</button> : null}
                </div>
                

            </div>
            


            <div className='user-posts'>
                <div className='news-feed-container'>
                    {userInfo !== undefined ? userInfo.posts.map((post, i) => <NewsFeeds key={i} post={post} index = {i} username={userInfo.username}/>) || null : null}
                    
                </div>
                
            </div>

        </section>
     );
}
 
export default withRouter(OtherProfile);