let mongoose = require("mongoose");

//require chalk module to give colors to console text
let chalk = require("chalk").default;
//require database URL from environment file
let dbURL = process.env.DATABASE_URI;

let connected = chalk.bold.cyan;
let error = chalk.bold.yellow;
let disconnected = chalk.bold.red;
let termination = chalk.bold.magenta;

//export this function and imported by server.js
module.exports = function dbconn() {
  //to ignore the deprecation warning
  mongoose.set("strictQuery", false);
  

  //? Connect Mongoose with Database URL
  mongoose.connect(dbURL);

  //* This event is fired when the connection is successfully connected.
  mongoose.connection.on("connected", function () {
    console.log("Connected DB:", mongoose.connection.name);
    console.log(connected("Mongoose default connection is open!!!"));
  });

  //! This event is fired when the connection gives some error.
  mongoose.connection.on("error", function (err) {
    console.log(
      error("Mongoose default connection has occured " + err + " error")
    );
  });

  //TODO This event is fired when the connection is disconnected.
  mongoose.connection.on("disconnected", function () {
    console.log(disconnected("Mongoose default connection is disconnected"));
  });

  /*This event is fired when the process is closed. 
    When the process is closed, 
    it is a good habit to close all the opened connection of database. 
    */
    process.on("SIGINT", async function () {
      await mongoose.connection.close();
    
      console.log(
        termination(
          "Mongoose default connection is disconnected due to application termination"
        )
      );
    
      process.exit(0);
    });
};