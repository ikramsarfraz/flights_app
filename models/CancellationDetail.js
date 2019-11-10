const sql = require("./db.js");

// constructor
const CancellationDetail = function(cancellationDetail) {
  this.Cancellation_Id = cancellationDetail.Cancellation_Id;
  this.Cancellation_Reason = cancellationDetail.Cancellation_Reason;
};

//find all cancellation details
CancellationDetail.getAll = result => {
  sql.query("SELECT * FROM Cancellation_Details LIMIT 1000", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    result(null, res);
  });
};

// find cancellation details by Cancellation_Id
CancellationDetail.findById = (CancellationDetailsId, result) => {
  sql.query(
    `SELECT * FROM Cancellation_Details WHERE Cancellation_Id = ${CancellationDetailsId}`,
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

module.exports = CancellationDetail;
