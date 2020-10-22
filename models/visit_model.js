
const mongoose = require("mongoose");
var visitSchema = new mongoose.Schema({
  patientId: {
    type: Number
  },
  doctorId: {
    type: Number
  },
  dateArr:{
    type:Array
  }
});

module.exports = mongoose.model(
  "visit_details",
  visitSchema,
  "visit_details"
);

// exports.VisitModel = Visit;