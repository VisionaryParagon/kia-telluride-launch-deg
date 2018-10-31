const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  sid: String,
  dealer: String,
  first_name: String,
  last_name: String
});

module.exports = mongoose.model('employees', EmployeeSchema);
