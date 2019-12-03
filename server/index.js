const server = require('./server');
const ENV = require('../config');

server.listen(ENV.serverPort, () => {
  console.log(`Carousels Service listening on port ${ENV.serverPort}`);
});
