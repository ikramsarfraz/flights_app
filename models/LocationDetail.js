const sql = require("./db.js");

// constructor
const LocationDetail = function(locationDetail) {
  this.Location_Id = locationDetail.Location_Id;
  this.City = locationDetail.City;
  this.State = locationDetail.State;
  this.Airport_Name = locationDetail.Airport_Name;
};

//find all location details
LocationDetail.getAll = result => {
  sql.query("SELECT * FROM Location_Details LIMIT 1000", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    result(null, res);
  });
};

// find location details by Location_Id
LocationDetail.findById = (LocationDetailsId, result) => {
  sql.query(
    `SELECT * FROM Location_Details WHERE Location_Id = '${LocationDetailsId}'`,
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

module.exports = LocationDetail;
