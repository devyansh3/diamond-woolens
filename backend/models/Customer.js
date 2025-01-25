// models/Customer.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    customerName: { type: String, required: true },
    customerPhone: { type: String, required: true }
});

module.exports = mongoose.model('Customer', customerSchema);
