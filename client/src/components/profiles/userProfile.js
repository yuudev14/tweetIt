import React, {useEffect} from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import OtherProfile from './userProfileComponent/otherProfile';
import OwnProfile from './userProfileComponent/ownProfile';


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
        <Router>
            <Switch>
                <Route exact path='/user' component={OwnProfile}/>
                <Route path='/:id' component={OtherProfile}/>
                
                
            </Switch>
        </Router>
     );
}
 
export default UserProfile;