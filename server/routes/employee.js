const express = require('express');
const router = express.Router();

// admin model
const employees = require('../models/employee');

// get kuid
router.post('/kuid', (req, res) => {
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
  }, (err, data) => {
    if (err) return res.status(500).send(err);
    if (!data) return res.status(200).send(req.body);
    return res.status(200).send(data);
  });
});

// create new employee
router.post('/new', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send({ message: 'User is not authenticated' });
  employees.create(req.body, (err, user) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(user);
  });
});

module.exports = router;
