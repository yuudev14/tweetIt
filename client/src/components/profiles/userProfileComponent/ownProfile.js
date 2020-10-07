import React, {useEffect, useContext} from 'react';
import HomeNewsFeed from '../../dashboard/dashboard-components/NewsFeedandNewTweet';
import user from '../../../assets/user.png';
import { USERDATA } from '../../../contexts/userData';

const OwnProfile = () => {
    const {userData} = useContext(USERDATA);

    
    return ( 
        <section className='userHomeProfile-section'>
            <div className='Userpicture'>
                <div className='coverPhoto'>

                </div>
                <div className='profilePicAndBtn'>
                    <div className='prof-pic'>
                        <img src={user} />
                        <p>{userData.username}</p>



                    </div>
                    <button>Edit Profile</button>

                </div>
                

            </div>
            <div className='friend-total-container'>
                <h3>Friends</h3>
                <button>See All</button>
            </div>
            <div className='user-posts'>
                <HomeNewsFeed category='user' />
            </div>

        </section>
     );
}
 
export default OwnProfile;