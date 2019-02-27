const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  kuid: String,
  email: String,
  first_name: String,
  last_name: String,
  dealer: String
});

module.exports = mongoose.model('employees', EmployeeSchema);
