const express = require("express");
const productionRoutes = require("./productionRoutes");
const orderRoutes = require("./OrderRoutes");
const batchRoutes = require(".//BatchRoutes");

const router = express.Router();

router.use("/production", productionRoutes);
router.use("/orders", orderRoutes);
router.use("/batches", batchRoutes);

module.exports = router;
