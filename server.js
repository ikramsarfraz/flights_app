const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const flights = require("./routes/api/flights");

const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Config
require("./models/db");

// Passport middleware
app.use(passport.initialize());
// // Passport config
require("./config/passport")(passport);

// // Routes
app.use("/api/users", users);
app.use("/api/flights", flights);

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
