const express = require('express');
const productionRoutes = require('./productionRoutes');


const router = express.Router();

router.use('/production', productionRoutes);

module.exports = router;
