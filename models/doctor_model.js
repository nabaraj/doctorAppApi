const mongoose = require("mongoose");
var doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  userName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 999
  },
  department: {
    type: String
  },
  specialization:{
    type: String
  },
  phone:{
    type: String
  },
  dob:{
    type: Date
  },
  token: {
    type:String
  },
  roles:{
    type:String,
    required: true
  }
});
const Doctor = mongoose.model(
  "Doctor",
  doctorSchema,
  "doctor_details"
);
exports.Doctor = Doctor;