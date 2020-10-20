
const mongoose = require("mongoose");
var visitSchema = new mongoose.Schema({
  patientId: {
    type: Number
  },
  doctorId: {
    type: Number
  },
  visitId:{
    type: Number
  },
  dateArr:{
    type:Array
  }
});

const Visit = mongoose.model(
  "VisitModel",
  visitSchema,
  "visit_details"
);

exports.VisitModel = Visit;