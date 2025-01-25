// models/Production.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productionSchema = new Schema({
    lotNumber: { type: String, required: true, unique: true },
    color: { type: String, required: true },
    quality: { type: String, required: true },
    count: { type: String, required: true },
    quantity: { type: Number, required: true },
    yarnYield: { type: String, required: true },
    orderType: { type: String, enum: ['bulk', 'customer'], required: true },
    comments: { type: String, required: false },
    content: { type: String, required: true },
    customer: { type: Schema.Types.ObjectId, ref: 'Customer' }, // Reference to Customer schema
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Production', productionSchema);
