import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './components/Pages/Home';
import Dashboard from './components/Pages/Dashboard';
import Login from './components/Pages/Login';
import Register from './components/Pages/Register';
import Profile from './components/Pages/Profile';
import NotFound from './components/Pages/NotFound';
import { AuthProvider, AuthContext } from './components/Contexts/Auth';
import MyteThemeProvider from './components/Core/Theme/Theme';

const App: React.FC = () => {
  const { isAuth } = useContext(AuthContext);
  return (
    <AuthProvider>
      <MyteThemeProvider>
        <Router>
          <Switch>
            <Route exact path='/' render={() => {
              return isAuth ? <Dashboard /> : <Home />
            }} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route
              path='/:username([A-Za-z0-9]+)'
              render={({ match }) => match.params.username ? <Profile /> : <NotFound />}
            />
            <Route path='/' component={NotFound} />
          </Switch>
        </Router>
      </MyteThemeProvider>
    </AuthProvider>
  );
}

export default App;
