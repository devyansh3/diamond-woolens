const BatchDAO = require("../dao/BatchDao");

exports.createBatch = async (batchData) => {
  return await BatchDAO.createBatch(batchData);
};

exports.getAllBatches = async () => {
  return await BatchDAO.getAllBatches();
};

exports.getBatchesByColor = async (colorFamily, colorName) => {
  return await BatchDAO.getBatchesByColor(colorFamily, colorName);
};

exports.getBatchById = async (id) => {
  return await BatchDAO.getBatchById(id);
};

exports.updateBatch = async (id, batchData) => {
  return await BatchDAO.updateBatch(id, batchData);
};
