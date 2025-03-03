const CustomerDAO = require("../dao/CustomerDao");

exports.createCustomer = async (customerName, customerPhone) => {
  try {
    const customer = await CustomerDAO.createCustomer(
      customerName,
      customerPhone
    );
    return customer;
  } catch (error) {
    throw new Error("Error creating customer: " + error.message);
  }
};

exports.getAllCustomers = async () => {
  try {
    return await CustomerDAO.getAllCustomers();
  } catch (error) {
    throw new Error("Error retrieving customers: " + error.message);
  }
};

exports.getCustomerById = async (id) => {
  try {
    return await CustomerDAO.getCustomerById(id);
  } catch (error) {
    throw new Error("Error retrieving customer: " + error.message);
  }
};

exports.updateCustomer = async (id, updateData) => {
  try {
    return await CustomerDAO.updateCustomer(id, updateData);
  } catch (error) {
    throw new Error("Error updating customer: " + error.message);
  }
};

exports.deleteCustomer = async (id) => {
  try {
    return await CustomerDAO.deleteCustomer(id);
  } catch (error) {
    throw new Error("Error deleting customer: " + error.message);
  }
};
