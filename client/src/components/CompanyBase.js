import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

let CompanyBase = () => {
  const [company, setCompany] = useState('');
  const [agent, setAgent] = useState([]);

  useEffect(() => {
    let ignore = false;
    async function fetchData() {
      let res = await fetch(`/companyDB`);
      let list = await res.json();
      if (!ignore) setAgent(list);
    }
    fetchData();
    return () => {
      ignore = true;
    };
  }, [agent]);

  let deleteObj = e => {
    fetch(`/companyDB/${e.target.id}`, {
      method: 'DELETE',
    }).then(res => res.text());
  };

  const changeObj = async e => {
    let button = e.target;
    const { value: newValue } = await Swal.fire({
      title: 'Введите новое название компании',
      input: 'text',
      inputValue: e.target.name,
      showCancelButton: true,
      inputValidator: value => {
        if (!value) {
          return 'You need to write something!';
        }
      },
    });
    let object = { company: newValue };
    fetch(`/companyDB/${button.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(object),
    });
  };
  let sendReq = () => {
    let object = {
      company: company,
    };
    if (company === '') {
      console.log('Заполните все поля пожалуйста...');
    } else {
      fetch(`/companyDB`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(object),
      }).then(console.log('Добавлено', 'success'));
      setCompany('');
    }
  };
  return (
    <div className='container'>
      <button className='btn btn-sm btn-outline-dark mt-3'>
        <Link to='/admin'>Назад</Link>
      </button>
      <div className='row'>
        <div className='col-sm-4 pt-3'>
          <input
            placeholder='Наименовании компании'
            value={company}
            onChange={e => setCompany(e.target.value)}
            className='form-control border-info'
          />
        </div>
        <div className='col-sm-2'>
          <button className='btn btn-outline-success mt-3' onClick={sendReq}>
            Добавить
          </button>
        </div>
      </div>
      <Table responsive bordered className='mt-3'>
        <thead className='table-dark'>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Наменование компании</th>
            <th scope='col'></th>
            <th scope='col'></th>
          </tr>
        </thead>
        <tbody>
          {agent.map((item, index) => (
            <tr key={item._id}>
              <td className='text-center'>{index + 1}</td>
              <td>{item.company}</td>
              <td className='text-center'>
                <button
                  onClick={changeObj}
                  className='btn btn-sm btn-outline-info'
                  name={item.company}
                  id={item._id}
                >
                  Изменить
                </button>
              </td>
              <td className='text-center'>
                <button
                  onClick={deleteObj}
                  className='btn btn-sm btn-outline-danger'
                  id={item._id}
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CompanyBase;
