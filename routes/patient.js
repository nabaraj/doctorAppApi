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
      lastVisit: "",
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

router.get("/search/:page", authorization, async (req, res) => {
  // let idPart = isNaN(parseInt(req.query.searchStr))?00:p
  console.log("search page");
  const resultsPerPage = req.query.pageSize ? parseInt(req.query.pageSize) : 2;
  const page = req.params.page >= 1 ? req.params.page : 1;
  const query = req.query.searchStr;
  let currentPage = page - 1;

  let searchQuery = parseInt(req.query.searchStr);
  searchQuery = isNaN(searchQuery) ? 00 : searchQuery;

  console.log(chalk.white.bgGray(searchQuery));

  PatientModel.find({
    $or: [
      {
        firstName: {
          $regex: query,
          $options: "ig",
        },
      },
      {
        lastName: {
          $regex: query,
          $options: "ig",
        },
      },
    ],
  })
    .limit(resultsPerPage)
    .skip(resultsPerPage * currentPage)
    .then((results) => {
      let hideNextLink =
        results.length === 0 || results.length < resultsPerPage;
      let resObject = {
        nextLink: hideNextLink ? "" : "patient/search/" + (parseInt(page) + 1),
        results: results,
      };
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
router.post("/prescription", authorization, async (req, res) => {
  let pres = new prescriptionModel({
    doctorId: req.body.doctorId,
    patientId: req.body.patientId,
    pc: req.body.prescriptionContent,
    date: req.body.date,
  });
  // pres.dateArr.push(Date.now());
  let presData = await pres.save();
  if (!presData) res.status(404).send("Not found prescription");
  let filter = { _id: req.body.patientId };
  const update = { lastVisit: req.body.date };

  //  let userData = await Doctor.update(filter, update)
  let updateDate = await PatientModel.update(filter, update);
  if (!updateDate) res.status(404).send("Not found patient");
  let getPatient = await PatientModel.find(filter);
  res.send({ presData, getPatient });
});

router.put("/prescription", authorization, async (req, res) => {
  let filter = { _id: req.body.id };
  let update = { pc: req.body.prescriptionContent };
  let presResult = await prescriptionModel.update(filter, update);
  if(!presResult) res.status(404).send("Not able to update");
  presResult = await prescriptionModel.find(filter);

  filter = { _id: req.body.patientId };
  update = { lastVisit: req.body.date };

  let updateDate = await PatientModel.update(filter, update);
  if (!updateDate) res.status(404).send("Not found patient");
  let getPatient = await PatientModel.find(filter);
console.log("####@@@@$$$$ ",{presResult, getPatient})
    res.send({presResult, getPatient});
    
});
module.exports = router;
