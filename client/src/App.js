import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/home/home';
import Dashboard from './components/dashboard/dashboard';
import IsLoginProvider from './contexts/isLogin';
import UserData from './contexts/userData';
import NewsFeedContext from './contexts/news-feed-context';


function App() {
  return (
    <Router>
      <IsLoginProvider>
      <NewsFeedContext>
      <UserData>
          
            <div className="App">
              <Switch>
                  <Route path='/home' component={Home} />
                  <Route exact path='/' component={Dashboard} />
                  <Route exact path='/user' component={Dashboard} />
              </Switch>  
            </div>
        </UserData>

      </NewsFeedContext>
        
      </IsLoginProvider>
    </Router>
    
  );
}

export default App;
