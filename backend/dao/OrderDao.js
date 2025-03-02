const Order = require("../models/Order");

exports.createOrder = async (orderData) => {
  const order = new Order(orderData);
  return await order.save();
};

exports.getAllOrders = async () => {
  return await Order.find().populate("customer salesAgent batch");
};

exports.getOrderById = async (id) => {
  return await Order.findById(id).populate("customer salesAgent batch");
};

exports.updateOrder = async (id, orderData) => {
  return await Order.findByIdAndUpdate(id, orderData, {
    new: true,
    runValidators: true,
  });
};

exports.partialUpdateOrder = async (id, orderData) => {
  return await Order.findByIdAndUpdate(id, orderData, {
    new: true,
    runValidators: true,
  });
};
