const express = require('express');
const router = express.Router();

// team model
const team = require('../models/team');

// check duplicate teams
router.post('/teams/valid', (req, res) => {
  team.findOne({
    dealer: req.body.dealer,
    session: req.body.session
  }, (err, data) => {
    const notFound = {
      message: 'Team not in system'
    };
    if (err) return res.status(500).send(err);
    if (!data) return res.status(200).send(notFound);
    return res.status(200).send(data);
  });
});

// create new team
router.post('/teams', (req, res) => {
  team.create(req.body, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(data);
  });
});

// get all teams
router.get('/teams', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send({ message: 'User is not authenticated' });
  team.find({}, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(data);
  });
});

// get one team
router.get('/teams/:id', (req, res) => {
  team.findById(req.params.id, (err, data) => {
    const notFound = {
      message: 'Team not in system'
    };
    if (err) return res.status(500).send(err);
    if (!data) return res.status(200).send(notFound);
    return res.status(200).send(data);
  });
});

// delete team
router.delete('/teams/:id', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send({ message: 'User is not authenticated' });
  team.findByIdAndRemove(req.params.id, (err, data) => {
    let deleted = {
      message: 'Team deleted'
    };
    if (err) return res.status(500).send(err);
    res.status(200).send(deleted);
  });
});

// update team
router.put('/teams/:id', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send({ message: 'User is not authenticated' });
  team.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }, (err, data) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(data);
  });
});

module.exports = router;
