const mongoose = require('mongoose');
const Product = require('./productModel');
const ENV = require('../config');

// const DB_PATH = `mongodb://${ENV.dbUser}:${ENV.dbPass}@${ENV.dbHost}:${ENV.dbPort}/${ENV.dbName}`;
const DB_PATH = ENV.dbLong;

mongoose.connect(DB_PATH, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports.getProductById = (id) => new Promise((pass, fail) => {
  Product.findOne({ id }, (err, doc) => {
    if (err) {
      fail(err);
    } else {
      pass(doc);
    }
  });
});

module.exports.getRelatedProducts = (idList) => new Promise((pass, fail) => {
  Product.find({ id: { $in: idList } }, (err, docs) => {
    if (err) {
      fail(err);
    } else {
      pass(docs);
    }
  });
});
