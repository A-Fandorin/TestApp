import React, { Fragment, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/auth';
const Navbar = ({ auth: { isAuth, loading }, logout }) => {
  const authLinks = (
    <ul className='navbar-nav ml-md-auto'>
      <li className='nav-item'>
        <a onClick={logout} href='#!'>
          Logout
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className='navbar-nav ml-md-auto'>
      <li className='nav-item'>
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
        className='navbar navbar-expand navbar-light fixed'
        style={{ backgroundColor: '#bee5eb' }}
      >
        <Link className='navbar-brand' to='/'>
          <strong>iSecurity</strong>
        </Link>
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
