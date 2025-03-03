const SalesAgentDAO = require("../dao/SalesAgentDao");

exports.createSalesAgent = async (agentName, agentPhone) => {
  try {
    return await SalesAgentDAO.createSalesAgent(agentName, agentPhone);
  } catch (error) {
    throw new Error("Error creating sales agent: " + error.message);
  }
};

exports.getAllSalesAgents = async () => {
  try {
    return await SalesAgentDAO.getAllSalesAgents();
  } catch (error) {
    throw new Error("Error retrieving sales agents: " + error.message);
  }
};

exports.getSalesAgentById = async (id) => {
  try {
    return await SalesAgentDAO.getSalesAgentById(id);
  } catch (error) {
    throw new Error("Error retrieving sales agent: " + error.message);
  }
};

exports.updateSalesAgent = async (id, updateData) => {
  try {
    return await SalesAgentDAO.updateSalesAgent(id, updateData);
  } catch (error) {
    throw new Error("Error updating sales agent: " + error.message);
  }
};

exports.deleteSalesAgent = async (id) => {
  try {
    return await SalesAgentDAO.deleteSalesAgent(id);
  } catch (error) {
    throw new Error("Error deleting sales agent: " + error.message);
  }
};
