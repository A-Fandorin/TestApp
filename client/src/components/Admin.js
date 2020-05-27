import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Admin = () => {
  return (
    <Fragment>
      <h2 className='py-3 text-center'>База Данных</h2>
      <hr />
      <button className='btn btn-outline-warning'>
        <Link to='/admin/company'>Компании</Link>
      </button>
      <button className='btn btn-outline-warning ml-3'>
        <Link to='/admin/auto'>Автомобили</Link>
      </button>
    </Fragment>
  );
};

export default Admin;
