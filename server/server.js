const express = require('express');
const cors = require('cors')();
const path = require('path');
const db = require('../database/database');

const json = express.json();
const server = express();
const PATH = path.join(__dirname, '../client/dist');

server.use(cors);
server.use(json);

server.use('/', express.static(PATH));

server.get('/products/:id', (req, res) => {
  db.getProductById(req.params.id)
    .then((product) => {
      res.status(200).send(product);
    })
    .catch((err) => {
      console.log(err);
    });
});

server.get('/products/:id/related/:type', (req, res) => {
  db.getProductById(req.params.id)
    .then((product) => db.getRelatedProducts(product[req.params.type] || 0))
    .then((list) => {
      res.status(200).send(list);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = server;
