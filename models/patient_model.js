
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
  gender:{
    type: String
  },
  dob:{
    type: Date
  },
  phone:{
    type: String
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
  },
  patientId:{
    type: String
  },
  lastVisit:{
    type: String
  }
});
const Patient = mongoose.model(
  "PatientDetails",
  patientSchema,
  "patient_details"
);

exports.PatientModel = Patient;