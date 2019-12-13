const sql = require("../../models/db");
const express = require("express");
const router = express.Router();
// Load FlightStatus model
const FlightStatus = require("../../models/FlightStatus");
// Load FlightDetail model
const FlightDetail = require("../../models/FlightDetail");
// Load CarrierDetail model
const CarrierDetail = require("../../models/CarrierDetail");
// Load DelayDetail model
const DelayDetail = require("../../models/DelayDetail");
// Load CancellationDetail model
const CancellationDetail = require("../../models/CancellationDetail");
// Load LocationDetail model
const LocationDetail = require("../../models/LocationDetail");

// @route GET api/flights/flightStatus/
// @desc get all flight statuses
// @access Public
router.get("/flightStatus", (req, res) => {
  FlightStatus.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving flight statuses."
      });
    else res.send(data);
  });
});

// @route GET api/flights/flightStatus/:flightStatusId
// @desc Retrieve a single flight status with flightStatusId
// @access Public
router.get("/flightStatus/:flightStatusId", (req, res) => {
  FlightStatus.findById(req.params.flightStatusId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found flightStatusId with id ${req.params.flightStatusId}.`
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving flightStatusId with id " +
            req.params.flightStatusId
        });
      }
    } else res.send(data);
  });
});

// @route GET api/flights/flightDetail/
// @desc get all flight details
// @access Public
router.get("/flightDetail", (req, res) => {
  FlightDetail.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving flight details."
      });
    else res.send(data);
  });
});

// @route GET api/flights/flightDetail/:flightDetailId
// @desc Retrieve a single flight details with flightDetailId
// @access Public
router.get("/flightDetail/:flightDetailId", (req, res) => {
  FlightDetail.findById(req.params.flightDetailId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found flightDetailId with id ${req.params.flightDetailId}.`
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving flightDetailId with id " +
            req.params.flightDetailId
        });
      }
    } else res.send(data);
  });
});

// @route GET api/flights/carrierDetail/
// @desc get all flight details
// @access Public
router.get("/carrierDetail", (req, res) => {
  CarrierDetail.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving carrier details."
      });
    else res.send(data);
  });
});

// @route GET api/flights/carrierDetail/:carrierDetailId
// @desc Retrieve a single carriers' details with carrierDetailId
// @access Public
router.get("/carrierDetail/:carrierDetailId", (req, res) => {
  CarrierDetail.findById(req.params.carrierDetailId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found carrierDetailId with id ${req.params.carrierDetailId}.`
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving carrierDetailId with id " +
            req.params.carrierDetailId
        });
      }
    } else res.send(data);
  });
});

// @route GET api/flights/delayDetail/
// @desc get all delay details
// @access Public
router.get("/delayDetail", (req, res) => {
  DelayDetail.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving delay details."
      });
    else res.send(data);
  });
});

// @route GET api/flights/delayDetail/:delayDetailId
// @desc Retrieve a single flights' delay details with delayDetailId
// @access Public
router.get("/delayDetail/:delayDetailId", (req, res) => {
  DelayDetail.findById(req.params.delayDetailId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found delayDetailId with id ${req.params.delayDetailId}.`
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving delayDetailId with id " + req.params.delayDetailId
        });
      }
    } else res.send(data);
  });
});

// @route GET api/flights/cancellationDetail/
// @desc get all cancellation details
// @access Public
router.get("/cancellationDetail", (req, res) => {
  CancellationDetail.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving cancellation details."
      });
    else res.send(data);
  });
});

// @route GET api/flights/cancellationDetail/:cancellationDetailId
// @desc Retrieve a single cancellations' details with cancellationDetailId
// @access Public
router.get("/cancellationDetail/:cancellationDetailId", (req, res) => {
  CancellationDetail.findById(req.params.cancellationDetailId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found cancellationDetailId with id ${req.params.cancellationDetailId}.`
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving cancellationDetailId with id " +
            req.params.cancellationDetailId
        });
      }
    } else res.send(data);
  });
});

// @route GET api/flights/locationDetail/
// @desc get all location details
// @access Public
router.get("/locationDetail", (req, res) => {
  LocationDetail.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving location details."
      });
    else res.send(data);
  });
});

// @route GET api/flights/locationDetail/:locationDetailId
// @desc Retrieve a single locations' details with locationDetailId
// @access Public
router.get("/locationDetail/:locationDetailId", (req, res) => {
  LocationDetail.findById(req.params.locationDetailId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found locationDetailId with id ${req.params.locationDetailId}.`
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving locationDetailId with id " +
            req.params.locationDetailId
        });
      }
    } else res.send(data);
  });
});

// @route GET api/flights/locationDetail/:locationDetailId
// @desc Retrieve a single locations' details with locationDetailId
// @access Public
router.post("/flight", (req, res1) => {
  sql.query(
    `SELECT q1.*, ((q2.Carrier_Delay_Count * 100)/q1.Carrier_Count) AS Delay_Prob, q2.NUMBER_CARRIER_DELAYS, q2.NUMBER_WEATHER_DELAYS, q2.NUMBER_NAS_DELAYS, q2.NUMBER_SECURITY_DELAYS, q2.NUMBER_LATE_AIRCRAFT_DELAYS
    FROM
    (SELECT flight_details.Flight_Id as FLIGHT_ID, flight_details.Flight_Number,carrier_details.Carrier_Name,  flight_details.Carrier_Id AS Flight_Carrier_Id, flight_details.Origin_Id,flight_details.Destination_Id, flight_details.Distance, flight_status.Delayed, COUNT(flight_details.Carrier_Id) as Carrier_Count
    FROM flight_details, flight_status, carrier_details
    WHERE flight_details.Flight_Id = flight_status.Flight_Id
    AND flight_details.Carrier_Id = carrier_details.Carrier_Id
    AND flight_details.Origin_Id IN
    (SELECT location_details.Location_Id 
    FROM location_details
    WHERE location_details.Location_Id = '${req.body.origin}')
    AND flight_details.Destination_Id IN
    (SELECT location_details.Location_Id 
    FROM location_details
    WHERE location_details.Location_Id = '${req.body.destination}')
    GROUP BY Flight_Carrier_Id) q1
    INNER JOIN
    (SELECT flight_details.Flight_Id as FLIGHT_ID, flight_details.Flight_Number,carrier_details.Carrier_Name,  flight_details.Carrier_Id AS Flight_Carrier_Id, flight_details.Origin_Id,flight_details.Destination_Id, flight_details.Distance, flight_status.Delayed, COUNT(flight_details.Carrier_Id) as Carrier_Delay_Count,
	SUM(if(Delay_Details.Carrier_Delay > 0, 1, 0)) AS NUMBER_CARRIER_DELAYS, 
	SUM(if(Delay_Details.Weather_Delay > 0, 1, 0)) AS NUMBER_WEATHER_DELAYS,
	SUM(if(Delay_Details.Nas_Delay > 0, 1, 0)) AS NUMBER_NAS_DELAYS,
	SUM(if(Delay_Details.Security_Delay > 0, 1, 0)) AS NUMBER_SECURITY_DELAYS,
	SUM(if(Delay_Details.Late_Aircraft_Delay > 0, 1, 0)) AS NUMBER_LATE_AIRCRAFT_DELAYS
    FROM flight_details, flight_status, carrier_details, delay_details
    WHERE flight_details.Flight_Id = flight_status.Flight_Id
    AND flight_details.Carrier_Id = carrier_details.Carrier_Id
    AND flight_status.Flight_Status_Id = delay_details.FS_ID
    AND flight_details.Origin_Id IN
    (SELECT location_details.Location_Id 
    FROM location_details
    WHERE location_details.Location_Id = '${req.body.origin}')
    AND flight_details.Destination_Id IN
    (SELECT location_details.Location_Id 
    FROM location_details
    WHERE location_details.Location_Id = '${req.body.destination}')
    AND flight_status.Delayed = 'yes\r'
    GROUP BY Flight_Carrier_Id) q2
    ON q1.Flight_Carrier_Id = q2.Flight_Carrier_Id`,
    (err, res2) => {
      if (err) {
        return res1.status(500).send({
          message: "Error retrieving origin with id " + req.body.origin
        });
      }

      if (res2.length) {
        return res1.send(res2);
      }

      return res1.status(404).send({
        message: `Not found origin with id ${req.body.origin}.`
      });
    }
  );
});

// @route GET api/flights/locationDetail/:locationDetailId
// @desc Retrieve a single locations' details with locationDetailId
// @access Public
router.post("/monthDelays", (req, res1) => {
  sql.query(
    `SELECT  flight_details.Origin_Id,flight_details.Destination_Id,   COUNT(flight_details.Carrier_Id) as Carrier_Delay_Count, EXTRACT( YEAR_MONTH FROM flight_status.Date ) AS delayMonth
    FROM flight_details, flight_status
    WHERE flight_details.Flight_Id = flight_status.Flight_Id
    AND flight_details.Origin_Id IN
    (SELECT location_details.Location_Id 
    FROM location_details
    WHERE location_details.Location_Id = '${req.body.origin}')
    AND flight_details.Destination_Id IN
    (SELECT location_details.Location_Id 
    FROM location_details
    WHERE location_details.Location_Id = '${req.body.destination}')
    AND flight_status.Delayed = 'yes\r'
    GROUP BY delayMonth
   ORDER BY delayMonth`,
    (err, res2) => {
      if (err) {
        return res1.status(500).send({
          message: "Error retrieving origin with id " + req.body.origin
        });
      }

      if (res2.length) {
        return res1.send(res2);
      }

      return res1.status(404).send({
        message: `Not found origin with id ${req.body.origin}.`
      });
    }
  );
});

// @route GET api/flights/locationDetail/:locationDetailId
// @desc Retrieve a single locations' details with locationDetailId
// @access Public
router.post("/dayDelays", (req, res1) => {
  sql.query(
    `SELECT  flight_details.Origin_Id,flight_details.Destination_Id,   COUNT(flight_details.Carrier_Id) as Carrier_Delay_Count, DAYOFWEEK(  flight_status.Date ) AS delayDay
    FROM flight_details, flight_status
    WHERE flight_details.Flight_Id = flight_status.Flight_Id
    AND flight_details.Origin_Id IN
    (SELECT location_details.Location_Id 
    FROM location_details
    WHERE location_details.Location_Id = '${req.body.origin}')
    AND flight_details.Destination_Id IN
    (SELECT location_details.Location_Id 
    FROM location_details
    WHERE location_details.Location_Id = '${req.body.destination}')
    AND flight_status.Delayed = 'yes\r'
    GROUP BY delayDay
   ORDER BY delayDay;`,
    (err, res2) => {
      if (err) {
        return res1.status(500).send({
          message: "Error retrieving origin with id " + req.body.origin
        });
      }

      if (res2.length) {
        return res1.send(res2);
      }

      return res1.status(404).send({
        message: `Not found origin with id ${req.body.origin}.`
      });
    }
  );
});

// @route GET api/flights/locationDetail/:locationDetailId
// @desc Retrieve a single locations' details with locationDetailId
// @access Public
router.get("/origin/:cityId", (req, res1) => {
  sql.query(
    ` SELECT flight_details.Flight_Id as FLIGHT_ID, flight_details.Flight_Number,carrier_details.Carrier_Name,  flight_details.Carrier_Id AS Flight_Carrier_Id, flight_details.Origin_Id,flight_details.Destination_Id, location_details.City, location_details.Airport_Name,flight_details.Distance, flight_status.Delayed
    FROM flight_details, flight_status, carrier_details, location_details
    WHERE flight_details.Flight_Id = flight_status.Flight_Id
    AND flight_details.Carrier_Id = carrier_details.Carrier_Id
    AND location_details.Location_Id = flight_details.Destination_Id
    AND flight_details.Origin_Id IN
    (SELECT location_details.Location_Id 
    FROM location_details
    WHERE location_details.Location_Id = '${req.params.cityId}')
    group by flight_details.Destination_Id`,
    (err, res2) => {
      if (err) {
        return res1.status(500).send({
          message: "Error retrieving origin with id " + req.params.cityId
        });
      }

      if (res2.length) {
        return res1.send(res2);
      }

      return res1.status(404).send({
        message: `Not found origin with id ${req.params.cityId}.`
      });
    }
  );
});

// @route GET api/flights/locationDetail/:locationDetailId
// @desc Retrieve a single locations' details with locationDetailId
// @access Public
router.get("/destination/:cityId", (req, res1) => {
  sql.query(
    ` SELECT flight_details.Flight_Id as FLIGHT_ID, flight_details.Flight_Number,carrier_details.Carrier_Name,  flight_details.Carrier_Id AS Flight_Carrier_Id, flight_details.Origin_Id,flight_details.Destination_Id, location_details.City, location_details.Airport_Name,flight_details.Distance, flight_status.Delayed
    FROM flight_details, flight_status, carrier_details, location_details
    WHERE flight_details.Flight_Id = flight_status.Flight_Id
    AND flight_details.Carrier_Id = carrier_details.Carrier_Id
    AND location_details.Location_Id = flight_details.Origin_Id
    AND flight_details.Destination_Id IN
    (SELECT location_details.Location_Id 
    FROM location_details
    WHERE location_details.Location_Id = '${req.params.cityId}')
    group by flight_details.Destination_Id`,
    (err, res2) => {
      if (err) {
        return res1.status(500).send({
          message: "Error retrieving origin with id " + req.params.cityId
        });
      }

      if (res2.length) {
        return res1.send(res2);
      }

      return res1.status(404).send({
        message: `Not found origin with id ${req.params.cityId}.`
      });
    }
  );
});

module.exports = router;
