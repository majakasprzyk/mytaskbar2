import React from 'react';
import './shared.css';
import {Login} from './components/service/Login';
import {HomePage} from './components/homePage/HomePage';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';
import Signup from './components/service/Signup';
import Boards from './components/boards/Boards';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/bartable" component={Boards} />
        </Switch>
        <Switch>
          <Route path="/bartable"></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
