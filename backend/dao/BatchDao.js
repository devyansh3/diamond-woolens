const Batch = require("../models/Batch");

exports.createBatch = async (batchData) => {
  // When creating a new batch, initialize availableBags = fullBags
  batchData.availableBags = batchData.fullBags;
  const batch = new Batch(batchData);
  return await batch.save();
};

exports.getAllBatches = async () => {
  return await Batch.find();
};

exports.getBatchById = async (id) => {
  return await Batch.findById(id);
};

exports.getBatchesByColor = async (colorFamily, colorName) => {
  return await Batch.find({ colorFamily, colorName });
};

exports.updateBatch = async (id, batchData) => {
  return await Batch.findByIdAndUpdate(id, batchData, {
    new: true,
    runValidators: true,
  });
};