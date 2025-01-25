const CustomerDAO = require('../dao/customerDAO');

exports.createCustomer = async (name, phone) => {
    try {
        // Call the DAO with correct parameters
        const customer = await CustomerDAO.createCustomer(name, phone);
        return customer;
    } catch (error) {
        throw new Error('Error creating customer: ' + error.message);
    }
};
