const express = require('express');
const router = express.Router();

// admin model
const employees = require('../models/employee');

// get kuid
router.post('/kuid', (req, res) => {
  employees.findOne({
    email: {
      $regex: '^' + req.body.email + '$',
      $options: 'i'
    }
  }, (err, data) => {
    if (err) return res.status(500).send(err);
    if (!data) return res.status(200).send(req.body);
    return res.status(200).send(data);
  });
});

// validate dealer
router.post('/dealer', (req, res) => {
  employees.findOne({
    dealer: req.body.dealer
  }, (err, data) => {
    if (err) return res.status(500).send(err);
    if (!data) return res.status(200).send(req.body);
    const info = {
      _id: data._id,
      dealer: data.dealer
    };
    return res.status(200).send(info);
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
