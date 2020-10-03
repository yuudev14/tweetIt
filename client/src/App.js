import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/home/home';
import Dashboard from './components/dashboard/dashboard';
import IsLoginProvider from './contexts/isLogin';


function App() {
  return (
    <Router>
    <IsLoginProvider>
      <div className="App">
        <Switch>
          
            <Route path='/home' component={Home} />
            <Route exact path='/' component={Dashboard} />
            <Route exact path='/user' component={Dashboard} />
          
            
        </Switch>  
      </div>
      </IsLoginProvider>
    </Router>
    
  );
}

export default App;
