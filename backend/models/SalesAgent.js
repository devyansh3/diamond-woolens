const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const salesAgentSchema = new Schema(
  {
    agentName: { type: String, required: true },
    agentPhone: { type: String, required: true },
    // Additional fields like email or region can be added here if needed.
  },
  { timestamps: true }
);

module.exports = mongoose.model("SalesAgent", salesAgentSchema);
