import React from 'react';
import { Link } from 'react-router-dom';

const Admin = () => {
  return (
    <div className='container'>
      <h2 className='py-3 text-center'>База Данных</h2>
      <hr />
      <button className='btn btn-outline-warning'>
        <Link to='/admin/company'>Компании</Link>
      </button>
      <button className='btn btn-outline-warning ml-3'>
        <Link to='/admin/auto'>Автомобили</Link>
      </button>
      <button className='btn btn-outline-warning ml-3'>
        <Link to='/admin/drivers'>Водителя</Link>
      </button>
    </div>
  );
};

export default Admin;
