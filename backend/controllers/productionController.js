const Production = require('../models/Production');
const CustomerService = require('../services/CustomerService');

exports.createProduction = async (req, res) => {
    try {
        let customer = null;
        if (req.body.orderType === 'customer') {
            // Update to match the fields used in the frontend
            customer = await CustomerService.createCustomer(req.body.name, req.body.phone);
        }

        const newProduction = new Production({
            ...req.body,
            customer: customer ? customer._id : null  // Reference customer ID if created
        });

        await newProduction.save();
        res.status(201).json(newProduction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllProductions = async (req, res) => {
    try {
        const productions = await Production.find();
        res.status(200).json(productions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
