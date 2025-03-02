const express = require("express");
const router = express.Router();
const orderController = require("../controllers/OrderController");

// Create a new order
router.post("/", orderController.createOrder);

// Get all orders
router.get("/", orderController.getAllOrders);

// Get a single order by ID
router.get("/:id", orderController.getOrderById);

// Full update of an order
router.put("/:id", orderController.updateOrder);

// Partial update of an order
router.patch("/:id", orderController.partialUpdateOrder);

module.exports = router;