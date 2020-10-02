import React from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/home/home';
import Dashboard from './components/dashboard/dashboard';
import IsLogin from './contexts/isLogin';


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <IsLogin>
            <Route path='/home' component={Home} />
            <Route exact path='/' component={Dashboard} />
          </IsLogin>
        </Switch>  
      </div>
    </Router>
    
  );
}

export default App;
