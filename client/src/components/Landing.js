import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <Fragment>
      <div className='container-fluid bg'>
        <div className='hero-text'>
          <h1 className='mb-3 d-none d-sm-block'>
            <strong>iSecurity Systems</strong>
          </h1>
          <h5 className='mb-3'>
            <em>Report System for Capro-Oil Security</em>
          </h5>
          <div className='d-none d-md-block'>
            <Link className='btn btn-danger mr-md-4' to='/register'>
              Register
            </Link>
            <Link className='btn btn-info' to='/login'>
              Login
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Landing;
