const express = require("express");
const router = express.Router();
const salesAgentController = require("../controllers/SalesAgentController");

// Create a new sales agent
router.post("/", salesAgentController.createSalesAgent);

// Get all sales agents
router.get("/", salesAgentController.getAllSalesAgents);

// Get a specific sales agent by ID
router.get("/:id", salesAgentController.getSalesAgentById);

// Update a sales agent
router.put("/:id", salesAgentController.updateSalesAgent);

// Delete a sales agent
router.delete("/:id", salesAgentController.deleteSalesAgent);

module.exports = router;
