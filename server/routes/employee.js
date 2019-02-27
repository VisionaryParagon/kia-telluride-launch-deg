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

// validate employee
router.post('/validate', (req, res) => {
  const info = {
    kuidUsed: false,
    emailUsed: false
  };
  employees.findOne({
    kuid: {
      $regex: '^' + req.body.kuid + '$',
      $options: 'i'
    }
  }, (err, data) => {
    if (err) return res.status(500).send(err);
    if (!data) {
      employees.findOne({
        email: {
          $regex: '^' + req.body.email + '$',
          $options: 'i'
        }
      }, (emlErr, emlData) => {
        if (emlErr) return res.status(500).send(emlErr);
        if (!emlData) return res.status(200).send(info);
        info.emailUsed = true;
        return res.status(200).send(info);
      });
    } else {
      info.kuidUsed = true;
      return res.status(200).send(info);
    }
  });
});

// create new employee
router.post('/employees', (req, res) => {
  employees.create(req.body, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(data);
  });
});

// get all employees
router.get('/employees', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send({ message: 'User is not authenticated' });
  employees.find({}, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(data);
  });
});

// get one employee
router.get('/employees/:id', (req, res) => {
  employees.findById(req.params.id, (err, data) => {
    const notFound = {
      message: 'Employee not in system'
    };
    if (err) return res.status(500).send(err);
    if (!data) return res.status(200).send(notFound);
    return res.status(200).send(data);
  });
});

// delete employee
router.delete('/employees/:id', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send({ message: 'User is not authenticated' });
  employees.findByIdAndRemove(req.params.id, (err, data) => {
    let deleted = {
      message: 'Employee deleted'
    };
    if (err) return res.status(500).send(err);
    res.status(200).send(deleted);
  });
});

// update employee
router.put('/employees/:id', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send({ message: 'User is not authenticated' });
  employees.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }, (err, data) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(data);
  });
});

module.exports = router;
