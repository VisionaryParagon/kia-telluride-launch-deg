const express = require('express');
const router = express.Router();
const https = require('https');

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
  const xml = `<enroll_students>
    <attendee>
      <kuid>${req.body.kuid}</kuid>
      <transcript_id></transcript_id>
      <score>${req.body.score}</score>
      <passed>${req.body.passed}</passed>
      <status>C</status>
      <course_code>SLS-07-168-1-DEV</course_code>
      <session_code>0001</session_code>
      <enroll_date>${req.body.date}</enroll_date>
      <completion_date>${req.body.date}</completion_date>
    </attendee>
  </enroll_students>`;

  const options = {
    host: 'stage.kiauniversity.com',
    path: '/docent/bin/docentisapi.dll/lms,KUSTG1,2151/?CMD=LOGIN&file=login/es3data.jsm',
    method: 'POST',
    headers: {
      'Content-Type': 'text/xml',
      'Accept': 'text/xml',
      'Content-Length': Buffer.byteLength(xml)
    }
  };

  const request = https.request(options, resp => {
    let buffer = '';
    resp.on('data', data => buffer += data);
    resp.on('end', () => {
      // console.log('https.request end:', buffer);
      const success = {
        message: 'success!',
        data: buffer
      };
      return res.status(200).send(success);
    });
  });

  request.on('error', e => {
    // console.error(`problem with https.request: ${e.message}`);
    return res.status(500).send(e);
  });

  request.write(xml);
  request.end();
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
