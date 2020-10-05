
const mongoose = require("mongoose");
var patientSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  lastName: {
    type: String
  },
  email: {
    type: String
  },
  dob:{
    type: Date
  },
  phone:{
    type: Array
  },
  nationality:{
    type: String
  },
  insurance:{
    type: String
  },
  address:{
    type: String
  },
  image:{
    type: String
  },
  height:{
    type: String
  }
});
const Patient = mongoose.model(
  "User",
  patientSchema,
  "patient_details"
);

exports.Patient = Patient;