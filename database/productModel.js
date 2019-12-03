const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, index: true },
  name: String,
  description: String,
  price: Number,
  rating: Number,
  reviews: Number,
  options: Boolean,
  image: String,
  loose: [Number],
  close: [Number],
});

module.exports = mongoose.model('Product', productSchema);
