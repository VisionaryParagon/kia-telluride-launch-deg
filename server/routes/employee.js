const express = require('express');
const router = express.Router();
const passport = require('passport');

// admin model
const employee = require('../models/employee');

// check sid duplicate
router.post('/users/dup-sid', function (req, res) {
  employee.findOne({
    sid: req.body.sid
  }, function (err, data) {
    let code = {
      exists: false
    };
    if (err) return res.status(500).send(err);
    if (!data) return res.status(200).send(code);
    code.exists = true;
    return res.status(200).send(code);
  });
});

// check sid validity
router.post('/users/valid-sid', function (req, res) {
  employee.findOne({
    sid: req.body.sid
  }, function (err, data) {
    let code = {
      message: 'Invalid SID code'
    };
    if (err) return res.status(500).send(err);
    if (!data) return res.status(200).send(code);
    return res.status(200).send(data);
  });
});

// check dealer validity
router.post('/users/valid-dealer', function (req, res) {
  employee.findOne({
    dealer: req.body.dealer
  }, function (err, data) {
    let code = {
      exists: false
    };
    if (err) return res.status(500).send(err);
    if (!data) return res.status(200).send(code);
    code.exists = true;
    return res.status(200).send(code);
  });
});

// create new employee
router.post('/users', function (req, res) {
  employee.create(req.body, function (err, user) {
    if (err) return res.status(500).send(err);
    return res.status(200).send(user);
  });
});

module.exports = router;
