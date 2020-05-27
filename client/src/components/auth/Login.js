import React, { useState } from 'react';
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
    return <Redirect to='/report' />;
  }
  return (
    <div className='container'>
      <h2
        className='pt-4 pb-1'
        style={{
          color: 'olive',
          fontFamily: 'Archivo Black',
          fontSize: '45px',
        }}
      >
        Capro-Oil Security
      </h2>
      <h4 className='pb-2'>Войти в аккаунт</h4>
      <form>
        <div className='form-group'>
          <input
            type='text'
            className='form-control'
            value={email}
            onChange={e => onChange(e)}
            placeholder='Еmail'
            name='email'
          ></input>
          <small className='text-muted'>Введите свой email</small>
        </div>
        <div className='form-group'>
          <input
            type='password'
            className='form-control'
            placeholder='Пароль'
            value={password}
            onChange={e => onChange(e)}
            name='password'
          ></input>
        </div>
      </form>
      <button onClick={e => submit(e)} className='btn btn-outline-success'>
        Войти
      </button>
      <div className='pt-2'>
        <small className='text-muted'>
          <em>
            У Вас еще нет аккаунта?
            <Link to='/register'> Зарегистрироваться</Link>
          </em>
        </small>
      </div>
    </div>
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
