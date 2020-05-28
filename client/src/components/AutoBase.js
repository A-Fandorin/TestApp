import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

let AutoBase = () => {
  const [formData, setFormData] = useState({
    auto: '',
    autosign: '',
    trailer: '',
    trailersign: '',
  });
  const [autos, setAutos] = useState([]);
  const { auto, autosign, trailer, trailersign } = formData;

  useEffect(() => {
    let ignore = false;
    async function fetchData() {
      let res = await fetch('/autoDB');
      let arr = await res.json();
      if (!ignore) setAutos(arr);
    }
    fetchData();
    return () => {
      ignore = true;
    };
  }, [autos]);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  let addInfo = () => {
    let obj = {
      auto: auto,
      autosign: autosign,
      trailer: trailer,
      trailersign: trailersign,
    };
    fetch('/autoDB', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj),
    }).then(console.log('OK'));
  };

  let deleteObj = e => {
    fetch(`/autoDB/${e.target.id}`, {
      method: 'DELETE',
    }).then(res => res.text());
  };

  let changeObj = async e => {
    let button = e.target;
    let res = await fetch(`/autoDB/${button.id}`);
    let car = await res.json();
    const { value: formValues } = await Swal.fire({
      title: 'Введите данные',
      html:
        `<input id="auto" class="swal2-input" value=${car.auto}>` +
        `<input id="autosign" class="swal2-input" value=${car.autosign}>` +
        `<input id="trailer" class="swal2-input" value=${car.trailer}>` +
        `<input id="trailersign" class="swal2-input" value=${car.trailersign}>`,
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById('auto').value,
          document.getElementById('autosign').value,
          document.getElementById('trailer').value,
          document.getElementById('trailersign').value,
        ];
      },
    });
    if (formValues) {
      fetch(`/autoDB/${button.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      });
    }
  };

  return (
    <div className='container'>
      <form>
        <button className='btn btn-sm btn-outline-dark mt-3'>
          <Link to='/admin'>Назад</Link>
        </button>

        <div className='row pt-3'>
          <div className='col'>
            <input
              placeholder='Марка авто'
              value={auto}
              onChange={e => onChange(e)}
              className='form-control border-info'
              name='auto'
            />
          </div>
          <div className='col'>
            <input
              placeholder='Гос. номер авто'
              value={autosign}
              onChange={e => onChange(e)}
              className='form-control border-info'
              name='autosign'
            />
          </div>
          <div className='col'>
            <input
              placeholder='Марка прицепа'
              value={trailer}
              onChange={e => onChange(e)}
              className='form-control border-info'
              name='trailer'
            />
          </div>
          <div className='col'>
            <input
              placeholder='Гос. номер прицепа'
              value={trailersign}
              onChange={e => onChange(e)}
              className='form-control border-info'
              name='trailersign'
            />
          </div>
          <div className='col'>
            <button className='btn btn-outline-success' onClick={addInfo}>
              Добавить
            </button>
          </div>
        </div>
      </form>
      <Table responsive bordered className='mt-3'>
        <thead className='table-dark'>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Марка и модель авто</th>
            <th scope='col'>Гос. номер</th>
            <th scope='col'>Прицеп</th>
            <th scope='col'>Гос. номер прицепа</th>
            <th scope='col'></th>
            <th scope='col'></th>
          </tr>
        </thead>
        <tbody>
          {autos.map((item, i) => (
            <tr key={item._id}>
              <td className='text-center'>{i + 1}</td>
              <td>{item.auto}</td>
              <td>{item.autosign}</td>
              <td>{item.trailer}</td>
              <td>{item.trailersign}</td>
              <td className='text-center'>
                <button
                  onClick={changeObj}
                  className='btn btn-sm btn-outline-info'
                  id={item._id}
                  name={item.autosign}
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

export default AutoBase;
