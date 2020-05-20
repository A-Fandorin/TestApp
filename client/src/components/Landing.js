import React, { useState, useContext, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <Fragment>
      <div className='container-fluid bg'>
        <div className='hero-text'>
          <h1 className='mb-3'>
            <strong>iSecurity Systems</strong>
          </h1>
          <h5 className='mb-3'>
            <em>Report System for Capro-Oil Security</em>
          </h5>
          <Link className='btn btn-danger mr-4' to='/register'>
            Register
          </Link>
          <Link className='btn btn-info mr-4' to='/login'>
            Login
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
