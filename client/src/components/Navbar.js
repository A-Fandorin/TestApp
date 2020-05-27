import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/auth';
const Navbar = ({ auth: { isAuth, loading }, logout }) => {
  const authLinks = (
    <>
      <ul className='navbar-nav mr-md-auto'>
        <li className='nav-item'>
          <Link className='nav-link disabled' to='/admin'>
            <strong>База данных</strong>
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to='/report'>
            Подать Отчет
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link disabled' to='/report'>
            <strong>Поиск информации</strong>
          </Link>
        </li>
        <li className='nav-item mr-3'>
          <Link className='nav-link disabled' to='/departments'>
            Отделы
          </Link>
        </li>
      </ul>
      <button className='btn btn-danger' onClick={logout}>
        Выход
      </button>
    </>
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
        className='navbar navbar-expand navbar-light fixed'
        style={{ backgroundColor: '#bee5eb' }}
      >
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
