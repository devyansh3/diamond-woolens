const BatchService = require("../services/BatchService");

exports.createBatch = async (req, res) => {
  try {
    const batch = await BatchService.createBatch(req.body);
    res.status(201).json(batch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllBatches = async (req, res) => {
  try {
    const batches = await BatchService.getAllBatches();
    res.status(200).json(batches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBatchesByColor = async (req, res) => {
  try {
    const { colorFamily, colorName } = req.query;
    const batches = await BatchService.getBatchesByColor(colorFamily, colorName);
    res.status(200).json(batches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBatchById = async (req, res) => {
  try {
    const batch = await BatchService.getBatchById(req.params.id);
    if (!batch) {
      return res.status(404).json({ message: "Batch not found" });
    }
    res.status(200).json(batch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateBatch = async (req, res) => {
  try {
    const updatedBatch = await BatchService.updateBatch(req.params.id, req.body);
    if (!updatedBatch) {
      return res.status(404).json({ message: "Batch not found" });
    }
    res.status(200).json(updatedBatch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};