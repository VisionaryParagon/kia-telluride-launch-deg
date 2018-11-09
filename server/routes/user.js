const express = require('express');
const router = express.Router();

// user model
const user = require('../models/user');

// check if user exists
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
    let team1Data = {
      index: 0,
      data: team1Users,
      length: team1Users.length,
      points: 0
    };

    const team2Users = data.filter(user => user.team === teamNames.team2);
    let team2Data = {
      index: 0,
      data: team2Users,
      length: team2Users.length,
      points: 0
    };

    const countEm = info => {
      let count = 0;

      if (info.length < 1) {
        count = 1;
      } else {
        for (info.index; info.index < info.length; info.index++) {
          let i = 0;
          const userQuizzes = info.data[info.index].quizzes;
          const l = userQuizzes.length;

          for (i; i < l; i++) {
            const quiz = userQuizzes[i];
            const points = Object.keys(quiz)
              .filter(k => k.indexOf('points') === 0)
              .reduce((newData, k) => {
                newData[k] = quiz[k];
                return newData;
              }, {});

            const pointsSum = obj => Object.values(obj).reduce((a, b) => a + b);

            info.points = info.points + pointsSum(points);
          }

          count++;
        }
      }

      return info.points / count;
    }

    const allPoints = [
      {
        name: teamNames.team1,
        value: countEm(team1Data)
      },
      {
        name: teamNames.team2,
        value: countEm(team2Data)
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
