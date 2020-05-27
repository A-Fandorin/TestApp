const express = require('express');
const router = express.Router();
const Car = require('../../models/Car');
const jsonParser = express.json();

router.get('/', (req, res) => {
  Car.find({}, (err, obj) => {
    if (err) return console.log(err);
    res.send(obj);
  })
    .sort({ _id: -1 })
    .limit(10);
});

router.post('/', jsonParser, function (req, res) {
  Car.create(req.body, (err, obj) => {
    if (err) return console.log(err);
    res.send(obj);
  });
});

module.exports = router;
