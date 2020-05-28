import React from 'react';
import { Link } from 'react-router-dom';

const Report = () => {
  return (
    <div className='container'>
      <h2 className='py-3 text-center'>Отчеты</h2>
      <hr />
      <button className='btn btn-outline-warning'>
        <Link to='/report/auto'>Автомбили</Link>
      </button>
      {/* <button className='btn btn-outline-warning ml-3'>
        <Link to='/report/tmc'>ТМЦ</Link>
      </button>
      <button className='btn btn-outline-warning ml-3'>
        <Link to='/report/visitors'>Посетитили</Link>
      </button>
      <button className='btn btn-outline-warning ml-3'>
        <Link to='/report/employees'>Сотрудники</Link>
      </button>
      <button className='btn btn-outline-warning ml-3'>
        <Link to='/report/pass'>Временные пропуска</Link>
      </button> */}
    </div>
  );
};

export default Report;
