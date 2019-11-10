const express = require("express");
const router = express.Router();
// Load FlightStatus model
const FlightStatus = require("../../models/FlightStatus");
// Load FlightDetail model
const FlightDetail = require("../../models/FlightDetail");
// Load CarrierDetail model
const CarrierDetail = require("../../models/CarrierDetail");

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
  console.log(req.params);
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

module.exports = router;
