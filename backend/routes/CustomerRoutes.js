const express = require("express");
const router = express.Router();
const customerController = require("../controllers/CustomerController");

// Create a new customer
router.post("/", customerController.createCustomer);

// Get all customers
router.get("/", customerController.getAllCustomers);

// Get a customer by ID
router.get("/:id", customerController.getCustomerById);

// Update a customer
router.put("/:id", customerController.updateCustomer);

// Delete a customer
router.delete("/:id", customerController.deleteCustomer);

module.exports = router;
