const express = require('express');
const router = express.Router();

// user model
const user = require('../models/user');

// check if user email exists
router.post('/users/email', function (req, res) {
  user.findOne({
    email: req.body.email
  }, function (err, data) {
    const notFound = {
      message: 'User not in system'
    };
    if (err) return res.status(500).send(err);
    if (!data) return res.status(200).send(notFound);
    return res.status(200).send(data);
  });
});

// check if user kuid exists
router.post('/users/kuid', function (req, res) {
  user.findOne({
    kuid: req.body.kuid
  }, function (err, data) {
    const notFound = {
      message: 'User not in system'
    };
    if (err) return res.status(500).send(err);
    if (!data) return res.status(200).send(notFound);
    return res.status(200).send(data);
  });
});

// get all user points
router.post('/users/points', function (req, res) {
  user.find({
    dealer: req.body.dealer,
    session: req.body.session
  }, function (err, data) {
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
          points += user.totalPoints;
          count++;
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

// create new user
router.post('/users', function (req, res) {
  user.create(req.body, function (err, user) {
    if (err) return res.status(500).send(err);
    return res.status(200).send(user);
  });
});

// get all users
router.get('/users', function (req, res) {
  user.find({}, function (err, users) {
    if (err) return res.status(500).send(err);
    return res.status(200).send(users);
  });
});

// get one user
router.get('/users/:id', function (req, res) {
  user.findById(req.params.id, function (err, user) {
    const notFound = {
      message: 'User not in system'
    };
    if (err) return res.status(500).send(err);
    if (!user) return res.status(404).send(notFound);
    return res.status(200).send(user);
  });
});

// delete user
router.delete('/users/:id', function (req, res) {
  user.findByIdAndRemove(req.params.id, function (err, user) {
    const deleted = {
      message: 'User deleted'
    };
    if (err) return res.status(500).send(err);
    res.status(200).send(deleted);
  });
});

// update user
router.put('/users/:id', function (req, res) {
  user.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }, function (err, user) {
    if (err) return res.status(500).send(err);
    res.status(200).send(user);
  });
});

module.exports = router;
