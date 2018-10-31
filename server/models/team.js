const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  dealer: String,
  session: String,
  teams: Array
});

module.exports = mongoose.model('teams', TeamSchema);
