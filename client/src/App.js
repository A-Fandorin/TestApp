import React, { Fragment, useEffect } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Landing from './components/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/Alert';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import { Provider } from 'react-redux';
import store from './store';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <div className='container'>
            <Alert />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
};
export default App;
