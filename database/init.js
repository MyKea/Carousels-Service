/* eslint object-curly-newline: ["error", "never"] */
/* eslint-env es6 */
const mongoose = require('mongoose');
const Product = require('./productModel');
const ENV = require('../config');

// const DB_PATH = `mongodb://${ENV.dbUser}:${ENV.dbPass}@${ENV.dbHost}:${ENV.dbPort}/${ENV.dbName}`;
const DB_PATH = ENV.dbLong;

mongoose.connect(DB_PATH, { useNewUrlParser: true, useUnifiedTopology: true });


Product.bulkWrite([
  { replaceOne: { filter: { id: 1 }, upsert: true, replacement: { id: 1, name: 'ANTILOP', description: 'High chair with tray, white silver color, silver color', price: 19.99, rating: 4.2, reviews: 24, isOnSale: false, isFamilyPriced: false, isNewItem: false, hasOptions: false, image: '001.webp', close: [3, 10, 2, 4, 1, 5, 6, 7, 8, 9, 11, 12], loose: [6, 12, 11, 40] } } },
  { replaceOne: { filter: { id: 2 }, upsert: true, replacement: { id: 2, name: 'TOBIAS', description: 'Chair, clear, chrome plated', price: 79.00, rating: 4.3, reviews: 73, isOnSale: false, isFamilyPriced: false, isNewItem: false, hasOptions: false, image: '002.webp', close: [], loose: [] } } },
  { replaceOne: { filter: { id: 3 }, upsert: true, replacement: { id: 3, name: 'HAVSTEN', description: 'Chair, in/outdoor, beige, 32 5/8x37x35 3/8 "', price: 260.00, rating: 5.0, reviews: 1, isOnSale: false, isFamilyPriced: false, isNewItem: false, hasOptions: false, image: '003.webp', close: [], loose: [] } } },
  { replaceOne: { filter: { id: 4 }, upsert: true, replacement: { id: 4, name: 'GLENN', description: 'Bar stool, white, chrome plated, 26 "', price: 79.99, rating: 4.5, reviews: 35, isOnSale: false, isFamilyPriced: false, isNewItem: false, hasOptions: true, image: '004.webp', close: [], loose: [] } } },
  { replaceOne: { filter: { id: 5 }, upsert: true, replacement: { id: 5, name: 'FRANKLIN', description: 'Bar stool with backrest, foldable, white, white, 24 3/4 "', price: 29.99, rating: 4.9, reviews: 12, isOnSale: false, isFamilyPriced: false, isNewItem: false, hasOptions: false, image: '005.webp', close: [], loose: [] } } },
  { replaceOne: { filter: { id: 6 }, upsert: true, replacement: { id: 6, name: 'JULES', description: 'Child\'s desk chair, white', price: 34.99, rating: 3.3, reviews: 7, isOnSale: false, isFamilyPriced: false, isNewItem: false, hasOptions: false, image: '006.webp', close: [], loose: [] } } },
  { replaceOne: { filter: { id: 7 }, upsert: true, replacement: { id: 7, name: 'ÖRFJÄLL', description: 'Swivel chair, white, Vissle blue', price: 49.99, rating: 0, reviews: 0, isOnSale: false, isFamilyPriced: false, isNewItem: false, hasOptions: false, image: '007.webp', close: [], loose: [] } } },
  { replaceOne: { filter: { id: 8 }, upsert: true, replacement: { id: 8, name: 'GRÖNADAL', description: 'Rocking chair, gray, natural', price: 249.00, rating: 4.4, reviews: 7, isOnSale: false, isFamilyPriced: false, isNewItem: false, hasOptions: false, image: '008.webp', close: [], loose: [] } } },
  { replaceOne: { filter: { id: 9 }, upsert: true, replacement: { id: 9, name: 'VÅGSBERG', description: 'Swivel chair, black', price: 49.99, rating: 2.0, reviews: 5, isOnSale: false, isFamilyPriced: false, isNewItem: false, hasOptions: true, image: '009.webp', close: [], loose: [] } } },
  { replaceOne: { filter: { id: 10 }, upsert: true, replacement: { id: 10, name: 'DIETMAR', description: 'Underframe for armchair, chrome plated', price: 40.00, rating: 5.0, reviews: 3, isOnSale: false, isFamilyPriced: false, isNewItem: false, hasOptions: false, image: '010.webp', close: [], loose: [] } } },
  { replaceOne: { filter: { id: 11 }, upsert: true, replacement: { id: 11, name: 'LANGUR', description: 'High chair tray, white', price: 10.00, rating: 0, reviews: 0, isOnSale: false, isFamilyPriced: false, isNewItem: false, hasOptions: false, image: '011.webp', close: [], loose: [] } } },
  { replaceOne: { filter: { id: 12 }, upsert: true, replacement: { id: 12, name: 'JOKKMOKK', description: 'Table and 4 chairs, antique stain', price: 129.00, rating: 4.6, reviews: 143, isOnSale: false, isFamilyPriced: false, isNewItem: false, hasOptions: false, image: '012.webp', close: [], loose: [] } } },
  { replaceOne: { filter: { id: 13 }, upsert: true, replacement: { id: 13, name: 'TEST', description: 'TESTING', price: 666, rating: 5, reviews: 42, options: false, image: '013.webp', close: [], loose: [] } } },
  // 40
  { replaceOne: { filter: { id: 40 }, upsert: true, replacement: { id: 40, name: 'ALLEMANSRÄTTEN', description: 'Meatballs, frozen, 84% meat content', price: 8.99, rating: 5.0, reviews: 7777, isOnSale: false, isFamilyPriced: false, isNewItem: false, hasOptions: false, image: '040.webp', close: [81], loose: [] } } },
], (err) => {
  if (err) return;
  Product.createIndexes();
});
