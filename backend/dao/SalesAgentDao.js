const SalesAgent = require("../models/SalesAgent");

exports.createSalesAgent = async (agentName, agentPhone) => {
  const newSalesAgent = new SalesAgent({ agentName, agentPhone });
  try {
    return await newSalesAgent.save();
  } catch (error) {
    throw new Error("Error saving sales agent: " + error.message);
  }
};

exports.getAllSalesAgents = async () => {
  return await SalesAgent.find();
};

exports.getSalesAgentById = async (id) => {
  return await SalesAgent.findById(id);
};

exports.updateSalesAgent = async (id, updateData) => {
  return await SalesAgent.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

exports.deleteSalesAgent = async (id) => {
  return await SalesAgent.findByIdAndDelete(id);
};
