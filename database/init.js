const express = require('express');
const mongoose = require('mongoose');
const Product = require('./productModel');
const ENV = require('../config');

mongoose.connect(`mongodb://${ENV.dbUser}:${ENV.dbPass}@${ENV.dbHost}:${ENV.dbPort}/${ENV.dbName}`, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  new Product({
    id: 1,
    name: 'ANTILOP',
    description: 'High chair with tray, white silver color, silver color',
    price: 19.99,
    rating: 4.2,
    reviews: 24,
    options: false,
    image: '001',
    related: {
      close: [],
      loose: [],
    },
  }).save();
});
