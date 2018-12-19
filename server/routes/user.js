const express = require('express');
const router = express.Router();
const request = require('request');

// user model
const user = require('../models/user');

// check if user email exists
router.post('/users/email', (req, res) => {
  user.findOne({
    email: req.body.email
  }, (err, data) => {
    const notFound = {
      message: 'User not in system'
    };
    if (err) return res.status(500).send(err);
    if (!data) return res.status(200).send(notFound);
    return res.status(200).send(data);
  });
});

// check if user kuid exists
router.post('/users/kuid', (req, res) => {
  user.findOne({
    kuid: req.body.kuid
  }, (err, data) => {
    const notFound = {
      message: 'User not in system'
    };
    if (err) return res.status(500).send(err);
    if (!data) return res.status(200).send(notFound);
    return res.status(200).send(data);
  });
});

// get all user points
router.post('/users/points', (req, res) => {
  user.find({
    dealer: req.body.dealer,
    session: req.body.session
  }, (err, data) => {
    if (err) return res.status(500).send(err);

    const teamNames = {
      team1: 'Team Prestige',
      team2: 'Team Innovative'
    };

    const team1Users = data.filter(user => user.team === teamNames.team1);
    const team2Users = data.filter(user => user.team === teamNames.team2);
    const countEm = team => {
      let count = 0;
      let points = 0;

      if (team.length < 1) {
        count = 1;
      } else {
        team.forEach(user => {
          if (user.totalPoints > 0) {
            points += user.totalPoints;
            count++;
          }
        });
      }

      return points / count;
    }

    const allPoints = [
      {
        name: teamNames.team1,
        value: countEm(team1Users)
      },
      {
        name: teamNames.team2,
        value: countEm(team2Users)
      }
    ];

    return res.status(200).send(allPoints);
  });
});

// create KU transcript
router.post('/users/ku', (req, res) => {
  const options = {
    url: process.env.PROXY,
    form: req.body
  };

  request.post(options, (err, httpResponse, body) => {
    if (err) return res.status(500).send(err);
    const success = {
      message: 'Success',
      data: body
    };
    return res.status(200).send(success);
  });
});

// create new user
router.post('/users', (req, res) => {
  user.create(req.body, (err, user) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(user);
  });
});

// get all users
router.get('/users', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send({ message: 'User is not authenticated' });
  user.find({}, (err, users) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(users);
  });
});

// get one user
router.get('/users/:id', (req, res) => {
  user.findById(req.params.id, (err, user) => {
    const notFound = {
      message: 'User not in system'
    };
    if (err) return res.status(500).send(err);
    if (!user) return res.status(404).send(notFound);
    return res.status(200).send(user);
  });
});

// delete user
router.delete('/users/:id', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send({ message: 'User is not authenticated' });
  user.findByIdAndRemove(req.params.id, (err, user) => {
    const deleted = {
      message: 'User deleted'
    };
    if (err) return res.status(500).send(err);
    res.status(200).send(deleted);
  });
});

// update user
router.put('/users/:id', (req, res) => {
  user.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }, (err, user) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(user);
  });
});

module.exports = router;
