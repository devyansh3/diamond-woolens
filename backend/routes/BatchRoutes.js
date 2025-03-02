const express = require("express");
const router = express.Router();
const batchController = require("../controllers/BatchController");

// Create a new batch
router.post("/", batchController.createBatch);

// Get all batches
router.get("/", batchController.getAllBatches);

// Get batches by color via query (e.g. /search?colorFamily=maroon&colorName=red)
router.get("/search", batchController.getBatchesByColor);

// Get a single batch by ID
router.get("/:id", batchController.getBatchById);

// Full update of a batch
router.put("/:id", batchController.updateBatch);

// Partial update (optional)
router.patch("/:id", batchController.updateBatch);

module.exports = router;
