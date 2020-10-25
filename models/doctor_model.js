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
    type: String,
    required: true,
    minlength: 5,
    maxlength: 999
  },
  specialization:{
    type: String,
    required: true,
    minlength: 5,
    maxlength: 999
  },
  phone:{
    type: String,
    required: true,
    minlength: 5,
    maxlength: 999
  },
  dob:{
    type: Date,
    required: true,
    minlength: 5,
    maxlength: 999
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