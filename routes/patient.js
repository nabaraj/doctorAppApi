var express = require("express");
var router = express.Router();
const chalk = require("chalk");

var { PatientModel } = require("./../models/patient_model");
var { VisitModel } = require("./../models/visit_model");
let { authorization } = require("./../utils/utility");

router.post("/registration", authorization, async (req, res) => {
  // console.table(chalk.green(PatientModel));
  let user = await PatientModel.findOne({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });
  if (user){
    console.log(chalk.white.bgGreenBright.bold(user));
    user['status'] = 'User already present'
    return res.status(200).send(user);
  } 
  
  else {
    user = new PatientModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      dob: req.body.dob,
      phone: req.body.phone,
      nationality: req.body.nationality,
      insurance: req.body.insurance,
      address: req.body.address,
      image: req.body.image,
      height: req.body.height,
      patientId: Date.now(),
    });
  }
  // user = new PatientModle({
  //   firstName: req.body
  // });

  user.save((err, user) => {
    if (err) {
      res.send(err);
    }
    res.send(user);
  });
  // res.send({...user});
});

router.get("/details", authorization, async (req, res) => {
  let user = await PatientModel.findOne({
    patientId: req.query.patientId,
  });
  if (!user) {

    res.status(404).send(user);
  }

  res.status(200).send(user);
});
module.exports = router;
