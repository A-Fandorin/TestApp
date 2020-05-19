import React, { Fragment, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Authcontext } from '../context/Authcontext';

const Navbar = () => {
  return (
    <Fragment>
      <nav
        className='navbar navbar-expand navbar-light fixed'
        style={{ backgroundColor: '#bee5eb' }}
      >
        <Link className='navbar-brand' to='/'>
          <strong>iSecurity</strong>
        </Link>
        <ul className='navbar-nav ml-md-auto'>
          <li className='nav-item'>
            <Link className='nav-link' to='/register'>
              <strong>Register</strong>
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/login'>
              <strong>Login</strong>
            </Link>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
};

export default Navbar;
