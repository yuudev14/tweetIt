import React, {useEffect} from 'react';
import HomeNewsFeed from '../dashboard/dashboard-components/NewsFeedandNewTweet';
import user from '../../assets/user.png';

const UserProfile = ({navView}) => {
    useEffect(()=>{
        document.querySelector('.dashboard footer').classList.remove('footer-nav-show');
        document.querySelector('.dashboard footer').classList.add('footer-nav-none');
        document.querySelector('main .profile_suggestion-section').classList.remove('main-active');
        

    }, []);
    useEffect(()=>{
        return () =>{
            document.querySelector('.dashboard footer').classList.remove('footer-nav-none');
            document.querySelector('.dashboard footer').classList.add('footer-nav-show');
            navView('newsFeed-section footer-active fa fa-home', '.dashboard footer li', '.dashboard main section', 'footer-active','main-active' );
            document.querySelector('main .profile_suggestion-section').classList.remove('main-active');
        } 

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
                <HomeNewsFeed category='user' />
            </div>

        </section>
     );
}
 
export default UserProfile;