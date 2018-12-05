const express = require('express');
const router = express.Router();

// team model
const team = require('../models/team');

// check duplicate teams
router.post('/teams/valid', function (req, res) {
  team.find({
    dealer: req.body.dealer,
    session: req.body.session
  }, function (err, data) {
    if (err) return res.status(500).send(err);
    return res.status(200).send(data);
  });
});

// create new team
router.post('/teams', function (req, res) {
  team.create(req.body, function (err, team) {
    if (err) return res.status(500).send(err);
    return res.status(200).send(team);
  });
});

// get all teams
router.get('/teams', function (req, res) {
  team.find({}, function (err, teams) {
    if (err) return res.status(500).send(err);
    return res.status(200).send(teams);
  });
});

// get one team
router.get('/teams/:id', function (req, res) {
  team.findById(req.params.id, function (err, team) {
    let notFound = {
      message: 'Team not in system'
    };
    if (err) return res.status(500).send(err);
    if (!team) return res.status(404).send(notFound);
    return res.status(200).send(team);
  });
});

// delete team
router.delete('/teams/:id', function (req, res) {
  team.findByIdAndRemove(req.params.id, function (err, team) {
    let deleted = {
      message: 'Team deleted'
    };
    if (err) return res.status(500).send(err);
    res.status(200).send(deleted);
  });
});

// update team
router.put('/teams/:id', function (req, res) {
  team.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }, function (err, team) {
    if (err) return res.status(500).send(err);
    res.status(200).send(team);
  });
});

module.exports = router;
