const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    // Reference to the batch that is being purchased from
    batch: { type: Schema.Types.ObjectId, ref: "Batch", required: true },
    // Number of bags the sales agent is ordering from the selected batch
    bagsOrdered: { type: Number, required: true },
    // Total price for the order (bagsOrdered * batch.pricePerBag)
    totalPrice: { type: Number, required: true },
    // References to the Customer and SalesAgent documents
    customer: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
    salesAgent: { type: Schema.Types.ObjectId, ref: "SalesAgent", required: true },
    // Order status (can be updated as the order moves through its lifecycle)
    status: {
      type: String,
      enum: ["at factory", "dispatched", "delivered to customer", "rejected"],
      default: "at factory",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);