var express = require('express');
var router = express.Router();
var patientModle = require('./../models/patient_model');

router.post('/entry', async (req, res)=>{
  console.log(req.body);
  let id = req.body._id;
  if(!id){

  }
  res.send('ok')
})

module.exports = router;