const express = require('express');
const router = express.Router();

// sessions model
const sessions = require('../models/session');

// get session
router.post('/session', (req, res) => {
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

// create new session
router.post('/sessions', (req, res) => {
  sessions.create(req.body, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(data);
  });
});

// get all sessions
router.get('/sessions', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send({ message: 'User is not authenticated' });
  sessions.find({}, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(data);
  });
});

// get one session
router.get('/sessions/:id', (req, res) => {
  sessions.findById(req.params.id, (err, data) => {
    const notFound = {
      message: 'Session not in system'
    };
    if (err) return res.status(500).send(err);
    if (!data) return res.status(200).send(notFound);
    return res.status(200).send(data);
  });
});

// delete session
router.delete('/sessions/:id', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send({ message: 'User is not authenticated' });
  sessions.findByIdAndRemove(req.params.id, (err, data) => {
    let deleted = {
      message: 'Session deleted'
    };
    if (err) return res.status(500).send(err);
    res.status(200).send(deleted);
  });
});

// update session
router.put('/sessions/:id', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send({ message: 'User is not authenticated' });
  sessions.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }, (err, data) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(data);
  });
});

module.exports = router;
