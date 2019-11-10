const sql = require("./db.js");

// constructor
const DelayDetail = function(delayDetail) {
  this.Delay_Details_ID = delayDetail.Delay_Details_ID;
  this.FS_ID = delayDetail.FS_ID;
  this.Tail_Number = delayDetail.Tail_Number;
  this.Carrier_Delay = delayDetail.Carrier_Delay;
  this.Weather_Delay = delayDetail.Weather_Delay;
  this.Nas_Delay = delayDetail.Nas_Delay;
  this.Security_Delay = delayDetail.Security_Delay;
  this.Late_Aircraft_Delay = delayDetail.Late_Aircraft_Delay;
};

//find all carrier details
DelayDetail.getAll = result => {
  sql.query("SELECT * FROM Delay_Details LIMIT 1000", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    result(null, res);
  });
};

// find flight details by Flight_Details_Id
DelayDetail.findById = (DelayDetailsId, result) => {
  sql.query(
    `SELECT * FROM Delay_Details WHERE Delay_Details_ID = ${DelayDetailsId}`,
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

module.exports = DelayDetail;
