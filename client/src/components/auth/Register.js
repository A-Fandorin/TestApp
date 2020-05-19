import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const { name, email, password, password2 } = formData;
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const login = async e => {
    if (password !== password2) {
      console.log('Pass do ot Match');
    } else {
      const newUser = {
        name,
        email,
        password,
      };
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const body = JSON.stringify(newUser);
        const res = await axios.post('/api/users', body, config);
        console.log(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    }
  };
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
        Sign Up
      </h2>
      <h4 className='pb-2'>Create Your Account</h4>
      <form>
        <div className='form-group'>
          <input
            type='text'
            className='form-control'
            placeholder='Name'
            name='name'
            value={name}
            onChange={e => onChange(e)}
          ></input>
        </div>
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
        <div className='form-group'>
          <input
            type='password'
            className='form-control'
            value={password2}
            onChange={e => onChange(e)}
            placeholder='Confirm Password'
            name='password2'
          ></input>
        </div>
      </form>
      <button onClick={e => login(e)} className='btn btn-outline-success'>
        Sign Up
      </button>
      <div className='pt-2'>
        <small className='text-muted'>
          <em>
            Already have an account?<Link to='/'> Sign In</Link>
          </em>
        </small>
      </div>
    </Fragment>
  );
};

export default Register;
