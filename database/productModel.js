const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  _id: { type: Number, required: true, index: true},
  name: String,
  description: String,
  price: Number,
  rating: Number,
  reviews: Number,
  options: Boolean,
  image: Buffer,
  related: {
    loose: [Number],
    close: [Number],
  },
});

module.exports = mongoose.model('Product', productSchema);
