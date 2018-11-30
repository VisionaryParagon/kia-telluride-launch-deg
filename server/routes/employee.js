const express = require('express');
const router = express.Router();
const passport = require('passport');

// admin model
const employees = require('../models/employee');

// get kuid
router.post('/kuid', function (req, res) {
  employees.findOne({
    dealer: {
      $regex: '^' + req.body.dealer + '$',
      $options: 'i'
    },
    first_name: {
      $regex: '^' + req.body.first_name + '$',
      $options: 'i'
    },
    last_name: {
      $regex: '^' + req.body.last_name + '$',
      $options: 'i'
    }
  }, function (err, data) {
    if (err) return res.status(500).send(err);
    if (!data) return res.status(200).send(req.body);
    return res.status(200).send(data);
  });
});

// create new employee
router.post('/new', function (req, res) {
  employees.create(req.body, function (err, user) {
    if (err) return res.status(500).send(err);
    return res.status(200).send(user);
  });
});

module.exports = router;
