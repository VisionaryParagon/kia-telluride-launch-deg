const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  dealer: String,
  session: String,
  session_code: String,
  instructor: String
});

module.exports = mongoose.model('sessions', SessionSchema);
