const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectionString = process.env.DBPATH;
mongoose.connect(connectionString, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex : true
});

const connection = mongoose.connection;

connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});


// //Import the mongoose module
// var mongoose = require('mongoose');

// //Set up default mongoose connection
// var mongoDB = 'mongodb://nabaraj:nabaraj@cluster0-shard-00-00-ouok3.mongodb.net:27017,cluster0-shard-00-01-ouok3.mongodb.net:27017,cluster0-shard-00-02-ouok3.mongodb.net:27017/doctorApp?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';
// mongoose.connect(mongoDB, { useNewUrlParser: true });


// //Get the default connection
// var db = mongoose.connection;
// db.once("open", function () {
//   console.log("MongoDB database connection established successfully");
// });
//Bind connection to error event (to get notification of connection errors)
connection.on('error', console.error.bind(console, 'MongoDB connection error:'));