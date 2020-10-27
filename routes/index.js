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

router.get("/posts", authorization, function (req, res, next) {
  // res.render('index', { title: 'Express' });
  console.log("req ", req.user);
  res.send(posts);
});

module.exports = router;
