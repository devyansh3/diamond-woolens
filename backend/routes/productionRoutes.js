const express = require('express');
const router = express.Router();
const productionController = require('../controllers/productionController');

// Create a new production record
router.post('/', productionController.createProduction);

// Get all production records
router.get('/', productionController.getAllProductions);

module.exports = router;
