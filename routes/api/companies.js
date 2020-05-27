const express = require('express');
const router = express.Router();
const Company = require('../../models/Company');
const jsonParser = express.json();

router.get('/', (req, res) => {
  Company.find({}, (err, array) => {
    if (err) return console.error(err);
    res.send(array);
  });
});

router.post('/', jsonParser, function (req, res) {
  Company.create(req.body, (err, obj) => {
    if (err) return console.log(err);
    res.send(obj);
  });
});

router.delete('/:id', function (req, res) {
  Company.findOneAndDelete({ _id: req.params.id }, (err, array) => {
    if (err) return console.log(array, err);
    if (array != null && array.length == 0) {
      res.send('ok');
    } else res.send('ok');
  });
});

router.put('/:id', jsonParser, function (req, res) {
  Company.findOneAndUpdate({ _id: req.params.id }, req.body, (err, array) => {
    if (err) return console.log(array, err);
    if (array != null && array.length == 0) {
      res.send(array);
    } else res.send(array);
  });
});

module.exports = router;
