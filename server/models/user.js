const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: String,
  first_name: String,
  last_name: String,
  dealer: String,
  session: String,
  team: String,
  kuid: String,
  session_code: String,
  transcript_id: String,
  deepDive: Object,
  streetDrive: Object,
  notes: Array,
  quizzes: Array,
  totalPoints: {
    type: Number,
    default: 0
  },
  evaluation: Object,
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
