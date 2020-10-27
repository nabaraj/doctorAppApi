const mongoose = require("mongoose");
const dotenv = require("dotenv");
let log = console.log;
const chalk = require("chalk");
dotenv.config();

const connectionString = process.env.DBPATH;
mongoose.connect(connectionString, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const connection = mongoose.connection;

connection.once("open", function () {
  log(
    chalk.white.bgGreenBright.bold(
      " MongoDB database connection established successfully "
    )
  );
});

connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);
