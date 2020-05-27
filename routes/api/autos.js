const express = require('express');
const router = express.Router();
const Auto = require('../../models/Auto');
const jsonParser = express.json();

router.get('/', (req, res) => {
  Auto.find({}, (err, array) => {
    if (err) return console.error(err);
    res.send(array);
  });
});

router.post('/', jsonParser, function (req, res) {
  Auto.create(req.body, (err, obj) => {
    if (err) return console.log(err);
    res.send(obj);
  });
});

router.delete('/:id', function (req, res) {
  Auto.findOneAndDelete({ _id: req.params.id }, (err, array) => {
    if (err) return console.log(array, err);
    if (array != null && array.length == 0) {
      res.send('ok');
    } else res.send('ok');
  });
});

router.put('/:id', jsonParser, function (req, res) {
  let obj = {
    auto: req.body[0],
    autosign: req.body[1],
    trailer: req.body[2],
    trailersign: req.body[3],
  };
  let id = req.params.id;

  Auto.findByIdAndUpdate(id, obj, { new: true }, (err, array) => {
    if (err) return console.log(array, err);
    if (array != null && array.length == 0) {
      res.send(array);
    } else {
      res.send(array);
    }
  });
});

module.exports = router;
