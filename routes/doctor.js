var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
let { generateAccessToken } = require("../utils/utility");
let { authorization } = require("./../utils/utility");

const { Doctor } = require("../models/doctor_model");
const mongoose = require("mongoose");

router.post("/registration", async (req, res) => {
  let user = await Doctor.findOne({
    email: req.body.email,
    userName: req.body.userName,
  });
  if (user) return res.status(400).send("Doctor's entry already exists");
  else
    user = new Doctor({
      userName: req.body.userName,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      department: req.body.department,
      dob: req.body.dob || new Date(),
      specialization: req.body.specialization,
      token: "",
      phone: req.body.phone,
      roles: req.body.roles,
      initials: req.body.initials,
    });
  const salt = await bcrypt.genSalt(3);
  console.log("salt", salt);
  user.password = await bcrypt.hash(user.password, salt);
  console.log("user ", user);
  user = await user.save();
  res.send({
    userName: user.userName,
    name: user.name,
    email: user.email,
  });
});

router.post("/login", async (req, res) => {
  console.log("#### ", req.body.email, req.body.password);

  let user = await Doctor.findOne({
    userName: req.body.userName,
  });
  console.log("####$$ ", user);
  if (user) {
    // return res.status(200).send("Login Successfull");
    console.log("if");
    const match = await bcrypt.compare(req.body.password, user.password);
    console.log("isMatch ", match);

    if (match) {
      let userObj = { userName: req.body.userName };
      let token = generateAccessToken(userObj);
      console.log("**** ", token);
      let filter = { _id: user._id };
      const update = { token: token };

      let userData = await Doctor.update(filter, update);
      // jwt.sign({ email: req.body.email }, function(err, token) {
      console.log("userData ", userData);
      // });
      // await user.save();
      let updatedUser = await Doctor.findOne(filter);
      res.status(200).json(updatedUser);
    } else {
      res.status(404).send("Password doesn't match!");
    }
  } else {
    res.status(404).send("email password not match");
  }
});
router.get("/profile", authorization, function (req, res, next) {
  // res.render('index', { title: 'Express' });

  let userName = req.user.userName;
  // console.log("$$$###%%% ", userName);
  Doctor.findOne(
    {
      userName: userName,
    },
    (err, userProfile) => {
      if (err) {
        res.status(404).send("profile not found");
      } else {
        res.status(200).json(userProfile);
      }
    }
  );

  // res.send({test:'index'})
});
module.exports = router;
