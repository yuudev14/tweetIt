import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/home/home';
import Dashboard from './components/dashboard/dashboard';
import IsLoginProvider from './contexts/isLogin';
import UserData from './contexts/userData';
import NewsFeedContext from './contexts/news-feed-context';
import FriendSuggestions from './contexts/friendSuggestion-context';


function App() {
  
  return (
    <Router>
      <IsLoginProvider>
        <NewsFeedContext>
      
          <UserData>
            <FriendSuggestions>
              <div className="App">
                  <Switch>
                      <Route path='/home' component={Home} />
                      <Route exact path='/' component={Dashboard} />
                      <Route path='/user' component={Dashboard} />
                      <Route path='/:id' component={Dashboard} />
                  </Switch>  
                </div>
          
            </FriendSuggestions>
          
            
          </UserData>

        </NewsFeedContext>
        
      </IsLoginProvider>
    </Router>
    
  );
}

export default App;
