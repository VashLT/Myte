import React from 'react';
import logo from './logo.svg';
import './static/sass/App.sass';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Home from './components/Pages/Home';
import Dashboard from './components/Pages/Dashboard';
import Login from './components/Pages/Login';
import Register from './components/Pages/Register';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home}/>
      </Switch>
    </Router>
  );
}

export default App;
