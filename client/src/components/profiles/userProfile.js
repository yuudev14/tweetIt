import React, {useEffect} from 'react';
import HomeNewsFeed from '../dashboard/dashboard-components/homeNewsFeed';
import user from '../../assets/user.png';

const UserProfile = () => {
    useEffect(()=>{
        document.querySelector('.dashboard footer').style.display = 'none';

    }, [])
    
    return ( 
        <section className='userHomeProfile-section'>
            <div className='Userpicture'>
                <div className='coverPhoto'>

                </div>
                <div className='profilePicAndBtn'>
                    <div className='prof-pic'>
                        <img src={user} />
                        <p>Username</p>



                    </div>
                    <button>Edit Profile</button>

                </div>
                

            </div>
            <div className='friend-total-container'>
                <h3>Friends</h3>
                <button>See All</button>
            </div>
            <div className='user-posts'>
                <HomeNewsFeed />
            </div>

        </section>
     );
}
 
export default UserProfile;