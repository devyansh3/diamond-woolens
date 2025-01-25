const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const colorSchema = new Schema({
    colorName: { type: String, required: true },
    quality: { type: String, required: true },
    count: { type: String, required: true }
});

module.exports = mongoose.model('Color', colorSchema);
