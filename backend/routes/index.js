const express = require("express");
const productionRoutes = require("./productionRoutes");
const orderRoutes = require("./OrderRoutes");
const batchRoutes = require("./BatchRoutes");
const customerRoutes = require("./CustomerRoutes");
const salesAgentRoutes = require("./SalesAgentRoutes");

const router = express.Router();

router.use("/production", productionRoutes);
router.use("/orders", orderRoutes);
router.use("/batches", batchRoutes);
router.use("/customers", customerRoutes);
router.use("/salesagents", salesAgentRoutes);

module.exports = router;
