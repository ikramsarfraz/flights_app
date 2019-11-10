const sql = require("./db.js");

// constructor
const FlightStatus = function(flightStatus) {
  this.Flight_Status_Id = flightStatus.Flight_Status_Id;
  this.Flight_Id = flightStatus.Flight_Id;
  this.Date = flightStatus.Date;
  this.Tail_Number = flightStatus.Tail_Number;
  this.CRS_Departure_Time = flightStatus.CRS_Departure_Time;
  this.CRS_Arrival_Time = flightStatus.CRS_Arrival_Time;
  this.Departure_Time = flightStatus.Departure_Time;
  this.Taxi_In = flightStatus.Taxi_In;
  this.Taxi_Out = flightStatus.Taxi_Out;
  this.Arrival_Time = flightStatus.Arrival_Time;
  this.Cancellation_Id = flightStatus.Cancellation_Id;
  this.Diverted = flightStatus.Diverted;
  this.Delayed = flightStatus.Delayed;
};
//find all flight statuses
FlightStatus.getAll = result => {
  sql.query("SELECT * FROM Flight_Status LIMIT 1000", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    result(null, res);
  });
};

// find flight status by Flight_Status_Id
FlightStatus.findById = (flightStatusId, result) => {
  sql.query(
    `SELECT * FROM Flight_Status WHERE Flight_Status_Id = ${flightStatusId}`,
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

module.exports = FlightStatus;
