import React, {useContext, useEffect} from 'react';
import { HashRouter as Router, Redirect, Route, Switch, Link } from 'react-router-dom';
import { IsLogin } from '../../contexts/isLogin';
import '../../styles/css/dashboard.css';
import UserProfile from '../profiles/userProfile';
import FriendRequest from './dashboard-components/friend_request';
import HomeNewsFeed from './dashboard-components/homeNewsFeed';
import Notification from './dashboard-components/notification'
import Profile from './dashboard-components/profile';
import axios from 'axios';
import { USERDATA } from '../../contexts/userData';

const Dashboard = (props) => {
    const {auth} = useContext(IsLogin);
    const {dispatch} = useContext(USERDATA);
    useEffect(()=>{
        axios.get(`/dashboard/user/${auth.code}`)
            .then(res => {
                dispatch({type : 'USERDATA', data : res.data});
            })

    },[])
    const navView = (className, liClass, sectionClass, liActive, sectionctive) => {
        const li = document.querySelectorAll(liClass);
        const section = document.querySelectorAll(sectionClass);
        li.forEach(li=> {
            if(className === li.className){
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
            {!auth.isAuth ? (<Redirect to='/home'/>) : (
                <>
                    <header>
                        <nav>
                            <div className='logo'>
                                <Link to='/'><h1>tweetIt</h1></Link>
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
                                <button  onClick={(e) => navView(e.target.className, '.notification-section button', '.notification-section section', 'notif-active','notif-container-active' )}
                                className='notification-container notif-active'>Notification</button>
                                <button onClick={(e) => navView(e.target.className, '.notification-section button', '.notification-section section', 'notif-active','notif-container-active' )}
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

                        <Router>
                            <Switch>
                                <Route exact path='/' component={HomeNewsFeed} />
                                <Route path='/user' render={(props) => <UserProfile {...props} navView={navView}/>} />
                            </Switch>
                        </Router>
                        
                        <section className='profile_suggestion-section'>
                            <Profile />
                        </section>
                    </main>
                    <footer>
                        <nav>
                            <ul>
                                <li onClick={(e) => navView(e.target.className, '.dashboard footer li', '.dashboard main section', 'footer-active','main-active' )} className='notification-section fa fa-bell'></li>
                                <li onClick={(e) => navView(e.target.className, '.dashboard footer li', '.dashboard main section', 'footer-active','main-active' )} className='newsFeed-section footer-active fa fa-home'></li>
                                <li onClick={(e) => navView(e.target.className, '.dashboard footer li', '.dashboard main section', 'footer-active','main-active' )} className='profile_suggestion-section fa fa-user'></li>
                            </ul>
                        </nav>
                    </footer>
                    <div onClick={newTweetToggle} className='newTweetIcon'>
                        <i className='fas fa-pen'></i>
                    </div>
                </>
            )}
            
        </div>
     );
}
 
export default Dashboard;