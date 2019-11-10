const sql = require("./db.js");

// constructor
const FlightDetail = function(flightDetail) {
  this.Flight_Details_ID = flightDetail.Flight_Details_ID;
  this.Flight_Id = flightDetail.Flight_Id;
  this.Flight_Number = flightDetail.Flight_Number;
  this.Carrier_Id = flightDetail.Carrier_Id;
  this.Origin_Id = flightDetail.Origin_Id;
  this.Destination_Id = flightDetail.Destination_Id;
  this.Distance = flightDetail.Departure_Time;
};

//find all flight details
FlightDetail.getAll = result => {
  sql.query("SELECT * FROM Flight_Details LIMIT 1000", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    result(null, res);
  });
};

// find flight details by Flight_Details_Id
FlightDetail.findById = (flightDetailId, result) => {
  sql.query(
    `SELECT * FROM Flight_Details WHERE Flight_Details_Id = ${flightDetailId}`,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      if (res.length) {
        result(null, res[0]);
        return;
      }

      // not found flight with the id
      result({ kind: "not_found" }, null);
    }
  );
};

module.exports = FlightDetail;
