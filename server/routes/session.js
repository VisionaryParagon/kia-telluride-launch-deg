const express = require('express');
const router = express.Router();

// sessions model
const sessions = require('../models/session');

// get session
router.post('/sessions', (req, res) => {
  sessions.findOne({
    dealer: req.body.dealer,
    session: req.body.session
  }, (err, data) => {
    const notFound = {
      message: 'Session not in system'
    };
    if (err) return res.status(500).send(err);
    if (!data) return res.status(200).send(notFound);
    return res.status(200).send(data);
  });
});

module.exports = router;
