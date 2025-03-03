const Customer = require("../models/Customer");

exports.createCustomer = async (customerName, customerPhone) => {
  const newCustomer = new Customer({ customerName, customerPhone });
  try {
    return await newCustomer.save();
  } catch (error) {
    throw new Error("Error saving customer: " + error.message);
  }
};

exports.getAllCustomers = async () => {
  return await Customer.find();
};

exports.getCustomerById = async (id) => {
  return await Customer.findById(id);
};

exports.updateCustomer = async (id, updateData) => {
  return await Customer.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

exports.deleteCustomer = async (id) => {
  return await Customer.findByIdAndDelete(id);
};
