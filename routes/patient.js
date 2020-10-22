var express = require("express");
var router = express.Router();
const chalk = require("chalk");

var { PatientModel } = require("./../models/patient_model");
let VisitModel = require("./../models/visit_model");
let { authorization } = require("./../utils/utility");
let prescriptionModel = require("./../models/prescription_model");

router.post("/registration", authorization, async (req, res) => {
  // console.table(chalk.green(PatientModel));
  let user = await PatientModel.findOne({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });
  if (user) {
    console.log(chalk.white.bgGreenBright.bold(user));
    user["status"] = "User already present";
    return res.status(200).send(user);
  } else {
    user = new PatientModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      gender: req.body.gender,
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

router.get("/search/:page",authorization, async (req, res) => {
  // let idPart = isNaN(parseInt(req.query.searchStr))?00:p
  console.log("search page");
  const resultsPerPage = req.query.pageSize ? parseInt(req.query.pageSize) : 2;
  const page = req.params.page >= 1 ? req.params.page : 1;
  const query = req.query.searchStr;
  let currentPage = page-1;

  let searchQuery = parseInt(req.query.searchStr);
  searchQuery = isNaN(searchQuery)? 00 : searchQuery;

  console.log(chalk.white.bgGray(searchQuery))

  PatientModel.find({
      $or: [
        {
          firstName: {
            $regex: query,
            $options: "ig",
          }},
         { lastName: {
            $regex: query,
            $options: "ig",
          }
        }
      ],
    
  })
  .limit(resultsPerPage)
  .skip(resultsPerPage * currentPage)
  .then((results) => {
    let hideNextLink = results.length === 0 || results.length < resultsPerPage
    let resObject = {
      nextLink:hideNextLink ? "": 'patient/search/'+(parseInt(page)+1),
      results:results
    }
    return res.status(200).send(resObject);
  })
  .catch((err) => {
    return res.status(500).send(err.message);
  });
});

router.get("/details", authorization, async (req, res) => {
  console.log("patientId ", req.query.patientId);
  let user = await PatientModel.findById(req.query.patientId);
  if (!user) {
    res.status(404).send(user);
  }
  res.status(200).send(user);
});

router.get("/history", authorization, async (req, res) => {
  prescriptionModel.find(
    {
      patientId: req.query.patientId,
      doctorId: req.query.doctorId,
    },
    (err, result) => {
      if (err) res.send(err);
      console.log("##### ", result);
      res.send(result);
    }
  );
});
router.post("/history", authorization, async (req, res) => {
  let Visit = new VisitModel({
    patientId: req.body.patientId,
    doctorId: req.body.doctorId,
    dateArr: [],
  });
  Visit.dateArr.push(Date.now());
  Visit.save((err, visit) => {
    if (err) {
      res.send(err);
    }
    res.send(visit);
  });
});
router.post("/prescription",authorization, async (req, res) => {
  let pres = new prescriptionModel({
    patientId: req.body.patientId,
    doctorId: req.body.doctorId,
    testReq: req.body.testReq,
    symptoms: req.body.symptoms,
    medication: req.body.medication,
    date: req.body.date,
  });
  // pres.dateArr.push(Date.now());
  pres.save((err, response) => {
    if (err) {
      res.send(err);
    }
    res.send(response);
  });
});
router.put("/prescription",authorization, async (req, res) => {
  prescriptionModel.findByIdAndUpdate(req.body.id,{
    doctorId: req.body.doctorId,
    testReq: req.body.testReq,
    symptoms: req.body.symptoms,
    medication: req.body.medication,
    date: req.body.date,
  }, function(err, response){
    if (err){ 
      console.log(err) 
      res.status(404).send(err)
  } 
  else{ 
      console.log("Updated User : ", response); 
      // res.send(response);
      prescriptionModel.findById(req.body.id, function(err, result){
        if(err){
          res.status(404).send('not found record')
        }
        res.send(result)
      })
  } 
  });
  // let pres = new prescriptionModel();
  // pres.dateArr.push(Date.now());
  // pres.save((err, response) => {
  //   if (err) {
  //     res.send(err);
  //   }
  //   res.send(response);
  // });
});
module.exports = router;
