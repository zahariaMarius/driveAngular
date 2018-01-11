/**
 * constant that have the http modules
 * @type {[object]}
 */
const http = require('http');
/**
 * constant that containt the express app
 * @type {[express]}
 */
const app = require('./app');

/**
 * if the port is setted by a internet service provider it takes that port,
 * in other case it takes 3000 like a default port
 * @type {[int]}
 */
const port = process.env.PORT || 3000;

/**
 * create the server
 * @type {[object]}
 */
const server = http.createServer(app);

/**
 * add listener with the configurated port to the server
 */
server.listen(port);
