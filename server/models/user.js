const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  dealer: String,
  kid: String,
  session: String,
  team: String,
  email: String,
  optin: {
    type: Number,
    default: 0
  },
  notes: Array,
  quizzes: Array,
  created: {
    type: Date,
    default: Date.now
  },
  modified: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('users', UserSchema);