const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },  // Nome do contador (no caso 'categoryCode')
  sequence_value: { type: Number, default: 0 },  // Valor do contador
});

const Counter = mongoose.model('Counter', counterSchema);

module.exports = Counter;
