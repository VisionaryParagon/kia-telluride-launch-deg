const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  dealer: String,
  kuid: String,
  session: String,
  team: String,
  email: String,
  streetDrive: Object,
  notes: Array,
  quizzes: Array,
  totalPoints: {
    type: Number,
    default: 0
  },
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
