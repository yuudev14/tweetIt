import React, {useState,useContext, useEffect} from 'react';
import { HashRouter as Router, Redirect, Route, Switch, Link } from 'react-router-dom';
import { IsLogin } from '../../contexts/isLogin';
import '../../styles/css/dashboard.css';
import UserProfile from '../profiles/userProfile';
import FriendRequest from './dashboard-components/friend_request';
import HomeNewsFeed from './dashboard-components/NewsFeedandNewTweet';
import Notification from './dashboard-components/notification'
import Profile from './dashboard-components/profile';
import axios from 'axios';
import { USERDATA } from '../../contexts/userData';
import { NEWS_FEED } from '../../contexts/news-feed-context';

const Dashboard = (props) => {
    const {auth} = useContext(IsLogin);
    const {userData, dispatchUser} = useContext(USERDATA);
    const {dispatch_newsFeed} = useContext(NEWS_FEED);
    const [notification, setNotification] = useState([]);
    const [searchList, setSearchList] = useState([]);
    
    useEffect(()=>{
        console.log('hi')
        axios.get(`/dashboard/user/${auth.code}`)
            .then(res => {
                dispatchUser({type : 'USERDATA', data : res.data});
                axios.get(`/dashboard/news-feed/${auth.code}`)
                    .then(res => {
                        dispatch_newsFeed({type : 'NEWSFEED', data : res.data});
                    });
                axios.get(`/dashboard/notifications/${auth.code}`)
                    .then(res => {
                        console.log(res);
                        setNotification(res.data);
                    })
                
            });
        
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
    const search = (e) => {
        if(e.target.value !==''){
            document.querySelector('.search-list').classList.add('search-list-active')
        }else{
            document.querySelector('.search-list').classList.remove('search-list-active')
        }
        axios.get(`/dashboard/search?search=${e.target.value}`)
            .then(res => {
                setSearchList(res.data);
            });
        
    }

    const emptySearch = () => {
        document.querySelector('#search').value = '';
        document.querySelector('.search-list').classList.remove('search-list-active')
    }
    const home = () => {
        axios.get(`/dashboard/news-feed/${auth.code}`)
            .then(res => {
                dispatch_newsFeed({type : 'NEWSFEED', data : res.data});
            });
    }

    return ( 
        <div className='dashboard'>
            {!auth.isAuth ? (<Redirect to='/home'/>) : (
                <>
                    <header>
                        <nav>
                            <div className='logo'>
                                <Link onClick={home} to='/'><h1>tweetIt</h1></Link>
                            </div>
                            <label htmlFor='search' className='search'>
                                <label className='fa fa-search' htmlFor='search'></label>
                                <input onChange={search} type='text' id='search' autocomplete="off"/>
                            </label>
                            <div className='search-list'>
                                <ul>
                                    {searchList.map(search =>{
                                        let link = search.username === userData.username ? '/user' : `/${search.username}`;
                                        return (<Link onClick={emptySearch} to={link}><li>{search.username}</li></Link>)
                                    })}
                                   
                                </ul>

                            </div>

                            {/* <div className='dashboard-options'>
                                <ul>
                                    <li></li>
                                </ul>

                            </div> */}
                            
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
                                {notification.map(notif => <Notification username={userData.username} notification={notif}/> )}
                            </section>
                            <section className='friend_request'>
                                {userData.friendRequest ? userData.friendRequest.map(friendRequest => (
                                    <FriendRequest friendRequest={friendRequest}/>
                                )) : null}
                            </section>
                        </section>

                        <Router>
                            <Switch>
                                <Route exact path='/' render={(props) => <HomeNewsFeed {...props} categpry={'home'}/>}/>
                                <Route path='/user' render={(props) => <UserProfile {...props} navView={navView}/>} />
                                <Route path='/post' render={(props) => <UserProfile {...props} navView={navView}/>} />
                                <Route path='/:id' render={(props) => <UserProfile {...props} navView={navView}/>} />
                                
                                
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