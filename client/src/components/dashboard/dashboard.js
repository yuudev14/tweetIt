import React from 'react';
import '../../styles/css/dashboard.css';
import FriendRequest from './dashboard-components/friend_request';
import NewsFeeds from './dashboard-components/news-feed';
import NewTweet from './dashboard-components/newTweet';
import Notification from './dashboard-components/notification'
import Profile from './dashboard-components/profile';

const Dashboard = () => {
    const navView = (e, liClass, sectionClass, liActive, sectionctive) => {
        const li = document.querySelectorAll(liClass);
        const section = document.querySelectorAll(sectionClass);
        li.forEach(li=> {
            if(e.target.className === li.className){
                li.classList.add(liActive);
                section.forEach(section => section.classList[0] === li.classList[0] 
                    ? section.classList.add(sectionctive) : section.classList.remove(sectionctive))

            }else{
                li.classList.remove(liActive)
            }
        });
    };
    const newTweetToggle=()=>{
        document.querySelector('.new-Tweet').classList.toggle('active-new-tweet');
    }
    return ( 
        <div className='dashboard'>
            <header>
                <nav>
                    <div className='logo'>
                        <h1>tweetIt</h1>
                    </div>
                    <label htmlFor='search' className='search'>
                        <label className='fa fa-search' htmlFor='search'></label>
                        <input type='text' id='search'/>
                    </label>
                    <div className='dashboard-options'>
                        <ul>
                            <li></li>
                        </ul>

                    </div>
                    
                </nav>
            </header>
            <main>
                <section className='notification-section'>
                    <div className='choose-notification'>
                        <button  onClick={(e) => navView(e, '.notification-section button', '.notification-section section', 'notif-active','notif-container-active' )}
                        className='notification-container notif-active'>Notification</button>
                        <button onClick={(e) => navView(e, '.notification-section button', '.notification-section section', 'notif-active','notif-container-active' )}
                         className='friend_request'>Friend Request</button>
                    </div>
                    <section className='notification-container notif-container-active'>
                        <Notification />
                        <Notification />
                        <Notification />
                        <Notification />
                        <Notification />
                        <Notification />
                    </section>
                    <section className='friend_request'>
                        <FriendRequest />
                        <FriendRequest />
                        <FriendRequest />
                        <FriendRequest />
                        <FriendRequest />
                        <FriendRequest />
                        <FriendRequest />
                        <FriendRequest />
                        <FriendRequest />
                        <FriendRequest />
                        <FriendRequest />
                        <FriendRequest />
                        <FriendRequest />
                        <FriendRequest />
                        <FriendRequest />
                        <FriendRequest />
                    </section>
                </section>
                <section className='newsFeed-section main-active'>
                    <div className='new-Tweet'>
                        <NewTweet />
                    </div>
                    <div className='news-feed-container'>
                        <NewsFeeds />
                        <NewsFeeds />
                        <NewsFeeds />
                        <NewsFeeds />
                        
                    </div>
                </section>
                <section className='profile_suggestion-section'>
                    <Profile />
                </section>
            </main>
            <footer>
                <nav>
                    <ul>
                        <li onClick={(e) => navView(e, '.dashboard footer li', '.dashboard main section', 'footer-active','main-active' )} className='notification-section fa fa-bell'></li>
                        <li onClick={(e) => navView(e, '.dashboard footer li', '.dashboard main section', 'footer-active','main-active' )} className='newsFeed-section footer-active fa fa-home'></li>
                        <li onClick={(e) => navView(e, '.dashboard footer li', '.dashboard main section', 'footer-active','main-active' )} className='profile_suggestion-section fa fa-user'></li>
                    </ul>
                </nav>
            </footer>
            <div onClick={newTweetToggle} className='newTweetIcon'>
                <i className='fas fa-pen'></i>
            </div>
        </div>
     );
}
 
export default Dashboard;