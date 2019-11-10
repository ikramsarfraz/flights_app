const sql = require("./db.js");

// constructor
const CarrierDetail = function(carrierDetail) {
  this.Carrier_Id = carrierDetail.Carrier_Id;
  this.Carrier_Name = carrierDetail.Carrier_Name;
};

//find all carrier details
CarrierDetail.getAll = result => {
  sql.query("SELECT * FROM Carrier_Details", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    result(null, res);
  });
};

// find flight details by Flight_Details_Id
CarrierDetail.findById = (CarrierId, result) => {
  sql.query(
    `SELECT * FROM Carrier_Details WHERE Carrier_Id = '${CarrierId}'`,
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

module.exports = CarrierDetail;
