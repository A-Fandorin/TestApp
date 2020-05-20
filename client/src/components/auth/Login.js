import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuth }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const submit = async e => {
    login(email, password);
  };
  if (isAuth) {
    return <Redirect to='/menu' />;
  }
  return (
    <Fragment>
      <h2
        className='pt-4 pb-1'
        style={{
          color: 'olive',
          fontFamily: 'Archivo Black',
          fontSize: '45px',
        }}
      >
        Sign In
      </h2>
      <h4 className='pb-2'>Sign into your Account</h4>
      <form>
        <div className='form-group'>
          <input
            type='text'
            className='form-control'
            value={email}
            onChange={e => onChange(e)}
            placeholder='Email Adress'
            name='email'
          ></input>
          <small className='text-muted'>Lorem Adress</small>
        </div>
        <div className='form-group'>
          <input
            type='password'
            className='form-control'
            placeholder='Password'
            value={password}
            onChange={e => onChange(e)}
            name='password'
          ></input>
        </div>
      </form>
      <button onClick={e => submit(e)} className='btn btn-outline-success'>
        Login
      </button>
      <div className='pt-2'>
        <small className='text-muted'>
          <em>
            Don`t have an account?<Link to='/register'> Sign Up</Link>
          </em>
        </small>
      </div>
    </Fragment>
  );
};

login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuth: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { login })(Login);
