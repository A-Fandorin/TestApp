import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Row, Col, Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

const Cars = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [company, setCompany] = useState('');
  const [tara, setTara] = useState('');
  const [sign, setSign] = useState('');
  const [driver, setDriver] = useState('');
  const [ttn, setTtn] = useState('');
  const [brutto, setBrutto] = useState('');
  const [netto, setNetto] = useState('');
  const [inout, setinout] = useState('Въезд');
  const [companyList, setCompnyList] = useState([]);
  const [vodila, setVodila] = useState([]);
  const [nomer, setNomer] = useState([]);
  const [searchcar, setSearchcar] = useState([]);

  useEffect(() => {
    let ignore = false;
    fetch(`/companyDB`).then(res =>
      res.json().then(list => {
        if (!ignore) setCompnyList(list);
      })
    );
    return () => {
      ignore = true;
    };
  }, [companyList]);

  useEffect(() => {
    let ignore = false;
    fetch(`/driverDB`).then(res =>
      res.json().then(list => {
        if (!ignore) setVodila(list);
      })
    );
    return () => {
      ignore = true;
    };
  }, [vodila]);

  useEffect(() => {
    let ignore = false;
    fetch(`/autoDB`).then(res =>
      res.json().then(list => {
        if (!ignore) setNomer(list);
      })
    );
    return () => {
      ignore = true;
    };
  }, [nomer]);

  useEffect(() => {
    let ignore = false;
    async function fetchData() {
      let res = await fetch('/cars', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      let list = await res.json();
      if (!ignore) setSearchcar(list);
    }
    fetchData();
    return () => {
      ignore = true;
    };
  }, [searchcar]);

  const sendInfo = () => {
    let info = {
      inOut: inout,
      date: date,
      time: time,
      company: company,
      tara: tara,
      sign: sign,
      driver: driver,
      ttn: ttn,
      brutto: brutto,
      netto: netto,
    };
    if (
      inout === '' ||
      date === '' ||
      time === '' ||
      company === '' ||
      tara === '' ||
      sign === '' ||
      driver === '' ||
      ttn === '' ||
      brutto === '' ||
      netto === ''
    ) {
      alert('Заполните все поля пожалуйста...');
    } else {
      fetch(`/cars`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(info),
      }).then(alert('Отчет сохранен!', 'success'));
      setBrutto('');
      setinout('');
      setDate('');
      setTime('');
      setTara('');
      setSign('');
      setDriver('');
      setTtn('');
      setNetto('');
    }
  };

  const rows = searchcar.map((item, i) => (
    <tr key={item._id}>
      <td>{i + 1}</td>
      <td>{item.inOut}</td>
      <td>{new Date(item.date).toLocaleDateString()} г.</td>
      <td>{item.time}</td>
      <td>{item.company}</td>
      <td>{item.sign}</td>
      <td>{item.driver}</td>
      <td>{item.ttn}</td>
      <td>{item.tara} кг</td>
      <td>{item.brutto} кг</td>
      <td>{item.netto} кг</td>
    </tr>
  ));

  return (
    <>
      <Container>
        <Row className='mt-5'>
          <Form.Group as={Col}>
            <Form.Label className='mt-2'>Въезд/Выезд</Form.Label>
            <Form.Control
              as='select'
              value={inout}
              onChange={e => setinout(e.target.value)}
            >
              <option value='Въезд'>Въезд</option>
              <option value='Выезд'>Выезд</option>
            </Form.Control>
            <Form.Label className='mt-2'>Дата</Form.Label>
            <Form.Control
              type='date'
              placeholder='Date'
              value={date}
              onChange={e => setDate(e.target.value)}
            />
            <Form.Label className='mt-2'>Время</Form.Label>
            <Form.Control
              type='time'
              placeholder='Time'
              value={time}
              onChange={e => setTime(e.target.value)}
            />
            <Form.Label className='mt-2'>Наименование компании</Form.Label>
            <Form.Control
              list='companyList'
              onChange={e => setCompany(e.target.value)}
            />
            <datalist id='companyList'>
              {companyList.map(item => (
                <option key={item._id} value={item.company} />
              ))}
            </datalist>
            <Form.Label className='mt-2'>Тара (кг)</Form.Label>
            <Form.Control
              value={tara}
              onChange={e => setTara(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label className='mt-2'>Гос. номер авто</Form.Label>
            <Form.Control
              list='nomer'
              onChange={e => setSign(e.target.value)}
            />
            <datalist id='nomer'>
              {nomer.map(item => (
                <option key={item._id} value={item.autosign} />
              ))}
            </datalist>
            <Form.Label className='mt-2'>Ф.И.О. водителя</Form.Label>
            <Form.Control
              list='vodila'
              onChange={e => setDriver(e.target.value)}
            />
            <datalist id='vodila'>
              {vodila.map(item => (
                <option key={item._id} value={item.driverId} />
              ))}
            </datalist>
            <Form.Label className='mt-2'>№ ТТН</Form.Label>
            <Form.Control
              type='text'
              value={ttn}
              onChange={e => setTtn(e.target.value)}
            />
            <Form.Label className='mt-2'>Брутто (кг)</Form.Label>
            <Form.Control
              type='text'
              value={brutto}
              onChange={e => setBrutto(e.target.value)}
            />
            <Form.Label className='mt-2'>Нетто (кг)</Form.Label>
            <Form.Control
              type='text'
              value={netto}
              onChange={e => setNetto(e.target.value)}
            />
          </Form.Group>
          <Col sm={12} className='justify-content-center'>
            <button
              onClick={sendInfo}
              className='mt-5 p-3 btn btn-outline-info'
            >
              Отправить
            </button>
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <h1 className='my-5 text-center'>Последние отчеты</h1>
        <Table responsive bordered className='mt-2'>
          <thead className='table-dark'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Вьезд/Выезд</th>
              <th scope='col' style={{ width: '8%' }}>
                Дата
              </th>
              <th scope='col'>Время</th>
              <th scope='col'>Компания</th>
              <th scope='col'>Гос. номер авто</th>
              <th scope='col'>Ф.И.О. водителя</th>
              <th scope='col'>№ ТТН</th>
              <th scope='col' style={{ width: '7%' }}>
                Тара
              </th>
              <th scope='col'>Брутто (кг)</th>
              <th scope='col'>Netto (кг)</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Container>
    </>
  );
};

export default Cars;
