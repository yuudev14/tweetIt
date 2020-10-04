import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/home/home';
import Dashboard from './components/dashboard/dashboard';
import IsLoginProvider from './contexts/isLogin';
import UserData from './contexts/userData';


function App() {
  return (
    <Router>
      <IsLoginProvider>
        <UserData>
          <div className="App">
            <Switch>
                <Route path='/home' component={Home} />
                <Route exact path='/' component={Dashboard} />
                <Route exact path='/user' component={Dashboard} />
            </Switch>  
          </div>
        </UserData>
      </IsLoginProvider>
    </Router>
    
  );
}

export default App;
