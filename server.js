const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");

const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
// DB Config
const con = mysql.createConnection(require("./config/keys").mysqlURI);

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

// Passport middleware
app.use(passport.initialize());
// // Passport config
// require("./config/passport")(passport);
// // Routes
// app.use("/api/users", users);

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));

// // Perform a query
// $query = `SELECT delayMonth, COUNT(delayMonth) FROM (
//     SELECT MONTHNAME(flight_status.Date) AS delayMonth FROM flight_status
//     WHERE flight_status.Delayed='yes') as t1
//     GROUP BY delayMonth;`;

// con.query($query, function(err, rows, fields) {
//   if (err) {
//     console.log("An error ocurred performing the query.");
//     return;
//   }

//   console.log("Query succesfully executed: ", rows);
// });
