const SalesAgentService = require("../services/SalesAgentService");

exports.createSalesAgent = async (req, res) => {
  const { agentName, agentPhone } = req.body;
  try {
    const salesAgent = await SalesAgentService.createSalesAgent(
      agentName,
      agentPhone
    );
    res.status(201).json(salesAgent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllSalesAgents = async (req, res) => {
  try {
    const salesAgents = await SalesAgentService.getAllSalesAgents();
    res.status(200).json(salesAgents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSalesAgentById = async (req, res) => {
  const { id } = req.params;
  try {
    const salesAgent = await SalesAgentService.getSalesAgentById(id);
    if (!salesAgent) {
      return res.status(404).json({ message: "Sales agent not found" });
    }
    res.status(200).json(salesAgent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSalesAgent = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedSalesAgent = await SalesAgentService.updateSalesAgent(
      id,
      req.body
    );
    if (!updatedSalesAgent) {
      return res.status(404).json({ message: "Sales agent not found" });
    }
    res.status(200).json(updatedSalesAgent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteSalesAgent = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedSalesAgent = await SalesAgentService.deleteSalesAgent(id);
    if (!deletedSalesAgent) {
      return res.status(404).json({ message: "Sales agent not found" });
    }
    res.status(200).json({ message: "Sales agent deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
