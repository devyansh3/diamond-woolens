const OrderDAO = require("../dao/OrderDao");
const BatchDAO = require("../dao/BatchDao");

exports.createOrder = async (orderData) => {
  // orderData should include: batch (batchId), bagsOrdered, customer, salesAgent
  const batch = await BatchDAO.getBatchById(orderData.batch);
  if (!batch) {
    throw new Error("Batch not found");
  }
  if (orderData.bagsOrdered > batch.availableBags) {
    throw new Error("Not enough bags available in the batch");
  }
  // Calculate total price from the batch's price per bag
  orderData.totalPrice = orderData.bagsOrdered * batch.pricePerBag;
  // Create the order
  const order = await OrderDAO.createOrder(orderData);
  // Update the batch's available bags
  const newAvailableBags = batch.availableBags - orderData.bagsOrdered;
  await BatchDAO.updateBatch(batch._id, { availableBags: newAvailableBags });
  return order;
};

exports.getAllOrders = async () => {
  return await OrderDAO.getAllOrders();
};

exports.getOrderById = async (id) => {
  return await OrderDAO.getOrderById(id);
};

exports.updateOrder = async (id, orderData) => {
  return await OrderDAO.updateOrder(id, orderData);
};

exports.partialUpdateOrder = async (id, orderData) => {
  return await OrderDAO.partialUpdateOrder(id, orderData);
};