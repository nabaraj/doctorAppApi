var jwt = require('jsonwebtoken');
require("dotenv").config();
const log = console.log;
function generateAccessToken(username) {
  // expires after half and hour (1800 seconds = 30 minutes)
  return jwt.sign(username, process.env.ACCESS_TOKEN_SECRET);
}

function authorization(req, res, next){
  let authorization = req.headers['authorization'];
  
  let token = authorization.split(' ')[1];
  if(token == null){
    return res.status(401).send('no authorization token')
  }
  console.log("##### middeleware ",token);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err, user)=>{
    if(err) return res.status(403).send(err);
    req.user = user;
    console.log("user $$$$$ ", user);
    next();
  })
  // next();
}

module.exports={
  generateAccessToken,
  authorization,
  log
}