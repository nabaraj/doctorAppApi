var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
let {generateAccessToken} = require('../utils/utility');
// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// module.exports = router;


const { Doctor } = require("../models/doctor_model");
const mongoose = require("mongoose");

router.post("/registration", async (req, res) => {
  let user = await Doctor.findOne({
    email: req.body.email
  });
  if (user) return res.status(400).send("Doctor's entry already exists");
  else
    user = new Doctor({
      userName: req.body.userName,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      department:req.body.department,
      dob:req.body.dob || new Date(),
      specialization:req.body.specialization,
      token:'',
      phone:req.body.phone
    });
  const salt = await bcrypt.genSalt(3);
  console.log("salt", salt);
  user.password = await bcrypt.hash(user.password, salt);
  console.log("user ",user);
  user = await user.save();
  res.send({
    userName: user.userName,
    name: user.name,
    email: user.email
  });
});
router.post('/login', async(req, res)=>{
  console.log("#### ",req.body.email, req.body.password);
  
  let user = await Doctor.findOne({
    userName: req.body.userName
  });
  console.log("####$$ ",user);
  if (user) {
    // return res.status(200).send("Login Successfull");
    console.log('if');
    const match = await bcrypt.compare(req.body.password, user.password);
      console.log('isMatch ',match);
      // if (err) {
      //   res.send(err)
      // } else if (!isMatch) {
      //   res.send("Password doesn't match!")
      // } else {
      //   res.status(200).send("Password matches!")
      // }

      if(match){
        let userObj = {userName:req.body.userName};
        let token = generateAccessToken(userObj);
        console.log("**** ",token);
       let filter= {_id:user._id};
       const update = {'token':token};

      await Doctor.findOneAndUpdate(filter, update)
        // jwt.sign({ email: req.body.email }, function(err, token) {
          console.log(token);
        // });
        await user.save();
        res.status(200).json(user);
      }else{
        res.send("Password doesn't match!")
      }
  }
  else{
    res.send('email password not match');
  }
})
module.exports = router;