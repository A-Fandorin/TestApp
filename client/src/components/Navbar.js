import React, { Fragment, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/auth';
import PrivateRoute from './routing/PrivateRoute';
const Navbar = ({ auth: { isAuth, loading }, logout }) => {
  const authLinks = (
    <ul className='navbar-nav ml-md-auto'>
      <li className='nav-item'>
        <Link className='nav-link' to='/admin/company'>
          <strong>База данных</strong>
        </Link>
      </li>
      <li className='nav-item'>
        <PrivateRoute className='nav-link' to='/securityreport/cars'>
          <strong>Подать Отчет</strong>
        </PrivateRoute>
      </li>
      <li className='nav-item'>
        <Link className='disabled nav-link' to='/report'>
          <strong>Поиск информации</strong>
        </Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' to='/departments'>
          <strong>Отделы</strong>
        </Link>
      </li>
      <button className='btn btn-danger' onClick={logout}>
        Выход
      </button>
    </ul>
  );

  const guestLinks = (
    <ul className='navbar-nav ml-md-auto'>
      <li className='nav-item pr-3'>
        <Link to='/login'>Login</Link>
      </li>
      <li className='nav-item'>
        <Link to='/register'>Register</Link>
      </li>
    </ul>
  );

  return (
    <Fragment>
      <nav
        className='navbar navbar-expand navbar-light fixed-top'
        style={{ backgroundColor: '#bee5eb' }}
      >
        <h2 className='pl-3'>
          <strong style={{ color: 'olive' }}>iSecurity</strong>
        </h2>
        {!loading && <Fragment>{isAuth ? authLinks : guestLinks}</Fragment>}
      </nav>
    </Fragment>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
