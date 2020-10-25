const mongoose = require("mongoose");
var prescriptionSchema = new mongoose.Schema({
  medication: {
    type: String
  },
  date:{
    type:String
  },
  testReq:{
    type:String
  },
  symptoms:{
    type:String
  },
  patientId:{
    type:String,
    required:true
  },
  doctorId:{
    type:String,
    required:true
  },
  pc:{
    type:String
  }

});
module.exports = mongoose.model(
  "prescription_table",
  prescriptionSchema,
  "prescription_table"
);