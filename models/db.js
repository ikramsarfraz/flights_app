const mysql = require("mysql");
const dbConfig = require("../config/keys.js");

// Create a connection to the database
const connection = mysql.createConnection(dbConfig.mysqlURI);

// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;
