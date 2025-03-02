const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const batchSchema = new Schema(
  {
    // Fields filled in by the inventory team
    colorFamily: {
      type: String,
      required: true,
      enum: ["navy", "maroon", "black"],
    },
    colorName: { type: String, required: true },
    lotNo: { type: String, required: true, unique: true },
    totalWeight: { type: Number, required: true },
    fullBags: { type: Number, required: true },
    leftoverWeight: { type: Number, required: true },
    pricePerBag: { type: Number, required: true },
    // Track how many full bags remain unsold
    availableBags: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Batch", batchSchema);
