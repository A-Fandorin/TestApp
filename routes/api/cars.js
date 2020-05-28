const express = require('express');
const router = express.Router();
const Car = require('../../models/Car');
const jsonParser = express.json();
let http = require('request');

router.get('/', (req, res) => {
  Car.find({}, (err, obj) => {
    if (err) return console.log(err);
    res.send(obj);
  })
    .sort({ _id: -1 })
    .limit(20);
});

router.post('/telegram', jsonParser, function (req, res) {
  let infos = [
    req.body.inOut,
    '<b>Дата: </b>' + req.body.date,
    '<b>Время: </b>' + req.body.time,
    '<b>Компания: </b>' + req.body.company,
    '<b>Гос. номер Авто </b>' + req.body.sign,
    '<b>Водитель: </b>' + req.body.driver,
    '<b>ТТН: </b>' + req.body.ttn,
    '<b>Нетто: </b>' + req.body.netto,
  ];
  let msg = '';
  infos.forEach(info => {
    msg += info + '\n';
  });
  msg = encodeURI(msg);
  http.post(
    `https://api.telegram.org/bot1089327900:AAHSyPB9TdnnvmEHHqHj_CLsfH1_3-yHoo4/sendMessage?chat_id=-431436388&parse_mode=html&text=${msg}`,
    function (err, resp, body) {
      console.log('error', err);
      if (resp.statusCode === 200) {
        res.status(200).json({ status: 'ok', message: 'OK' });
      }
      if (resp.statusCode !== 200) {
        res.status(400).json({ status: 'error', message: 'Error' });
      }
    }
  );
});

router.post('/', jsonParser, function (req, res) {
  Car.create(req.body, (err, obj) => {
    if (err) return console.log(err);
    res.send(obj);
  });
});

module.exports = router;
