const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");

const customers = require("./routes/api/customers");
const users = require("./routes/api/users");

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
app.use("/api/customers", customers);
app.use("/api/users", users);

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
