const Customer = require('../models/Customer');

exports.createCustomer = async (customerName, customerPhone) => {
    const newCustomer = new Customer({
        customerName,
        customerPhone
    });

    try {
        return await newCustomer.save();  // Save the customer in the database
    } catch (error) {
        throw new Error('Error saving customer: ' + error.message);
    }
};
