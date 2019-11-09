const express = require("express");
const router = express.Router();

const customers = require("../../controllers/customer.js");
const Customer = require("../../models/Customer.js");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Customer
  const customer = new Customer({
    email: req.body.email,
    name: req.body.name,
    active: req.body.active
  });

  // Save Customer in the database
  Customer.create(customer, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else res.send(data);
  });
});

// Retrieve all Customers
router.get("/customers", customers.findAll);

// Retrieve a single Customer with customerId
router.get("/customers/:customerId", customers.findOne);

// Update a Customer with customerId
router.put("/customers/:customerId", customers.update);

// Delete a Customer with customerId
router.delete("/customers/:customerId", customers.delete);

// Create a new Customer
router.delete("/customers", customers.deleteAll);

module.exports = router;
