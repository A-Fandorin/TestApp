import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

let DriverBase = () => {
  const [driverId, setDriverId] = useState('');
  const [agent, setAgent] = useState([]);

  useEffect(() => {
    let ignore = false;
    async function fetchData() {
      let res = await fetch(`/driverDB`);
      let list = await res.json();
      if (!ignore) setAgent(list);
    }
    fetchData();
    return () => {
      ignore = true;
    };
  }, [agent]);

  let deleteObj = e => {
    fetch(`/driverDB/${e.target.id}`, {
      method: 'DELETE',
    }).then(res => res.text());
  };

  const changeObj = async e => {
    let button = e.target;
    const { value: newValue } = await Swal.fire({
      title: 'Введите Ф.И.О. водителя',
      input: 'text',
      inputValue: e.target.name,
      showCancelButton: true,
      inputValidator: value => {
        if (!value) {
          return 'You need to write something!';
        }
      },
    });
    let object = { driverId: newValue };
    fetch(`/driverDB/${button.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(object),
    });
  };
  let sendReq = () => {
    let object = {
      driverId: driverId,
    };
    if (driverId === '') {
      console.log('Заполните все поля пожалуйста...');
    } else {
      fetch(`/driverDB`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(object),
      }).then(console.log('Добавлено', 'success'));
      setDriverId('');
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
            placeholder='Ф.И.О. водителя'
            value={driverId}
            onChange={e => setDriverId(e.target.value)}
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
            <th scope='col'>Ф.И.О. водителя</th>
            <th scope='col'></th>
            <th scope='col'></th>
          </tr>
        </thead>
        <tbody>
          {agent.map((item, index) => (
            <tr key={item._id}>
              <td className='text-center'>{index + 1}</td>
              <td>{item.driverId}</td>
              <td className='text-center'>
                <button
                  onClick={changeObj}
                  className='btn btn-sm btn-outline-info'
                  name={item.driverId}
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

export default DriverBase;
