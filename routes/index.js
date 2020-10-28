var express = require("express");
var router = express.Router();
// var authorization =
let { authorization } = require("./../utils/utility");
const { Doctor } = require("../models/doctor_model");
const posts = [
  {
    userName: "nabaraj",
    title: "book1",
  },
  {
    userName: "anurag",
    title: "book2",
  },
  {
    userName: "parmita",
    title: "book3",
  },
];

/* GET home page. */
router.get("/", function (req, res, next) {
  // res.render('index', { title: 'Express' });
  res.send({ test: "index" });
});
router.post("/logout", authorization, async (req, res) => {
  let userid = req.body.userId;
  let update = { token: "" };
  Doctor.findOne(
    userid,
    update,
    {
      new: true,
    },
    (err, result) => {
      console.log("#### check logout ####");
      if (err) res.status(404).send(err);
      res.send("Logout successful");
    }
  );
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
router.get("/posts", authorization, function (req, res, next) {
  // res.render('index', { title: 'Express' });
  console.log("req ", req.user);
  res.send(posts);
});

module.exports = router;
