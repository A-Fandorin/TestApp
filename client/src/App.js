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
import PrivatRoute from './components/routing/PrivateRoute';

import './App.css';
import Admin from './components/Admin';
import CompanyBase from './components/CompanyBase';
import AutoBase from './components/AutoBase';
import Report from './components/Report';
import CarsReport from './components/CarsReport';
import DriverBase from './components/DriverBase';

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
          <div className='container-fluid'>
            <Alert />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <PrivatRoute exact path='/admin' component={Admin} />
              <PrivatRoute
                exact
                path='/admin/company'
                component={CompanyBase}
              />
              <PrivatRoute exact path='/admin/auto' component={AutoBase} />
              <PrivatRoute exact path='/admin/drivers' component={DriverBase} />
              <PrivatRoute exact path='/report' component={Report} />
              <PrivatRoute exact path='/report/auto' component={CarsReport} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
};
export default App;
