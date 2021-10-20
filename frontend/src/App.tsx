import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './components/Pages/Home';
import Dashboard from './components/Pages/Dashboard';
import Login from './components/Pages/Login';
import SignUp from './components/Pages/SignUp';
import Profile from './components/Pages/Profile';
import NotFound from './components/Pages/NotFound';
import { AuthProvider, AuthContext } from './components/Contexts/Auth';
import MyteThemeProvider from './components/Core/Theme/Theme';

import { Redirect } from 'react-router';
import LatexProvider from './components/Contexts/Latex';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <LatexProvider>
        <MyteThemeProvider>
          <AppRouter />
        </MyteThemeProvider>
      </LatexProvider>
    </AuthProvider>
  );
}

const AppRouter: React.FC = () => {
  const { isAuth, auth } = useContext(AuthContext);
  console.log("AppRouter", { isAuth, auth })
  return (
    <Router>
      <Switch>
        <Route exact path='/' render={() => {
          return isAuth ? <Dashboard /> : <Home />
        }} />
        <Route exact path='/login' render={() => isAuth ? <Redirect to="/" /> : <Login />} />
        <Route exact path='/register' render={() => <Redirect to="/signup" />} />
        <Route exact path='/signup' render={() => isAuth ? <Redirect to="/" /> : <SignUp />} />
        <Route
          path='/:username([A-Za-z0-9]+)'
          render={({ match }) => match.params.username ? <Profile /> : <NotFound />}
        />
        <Route path='/' component={NotFound} />
      </Switch>
    </Router>
  )
}

export default App;
