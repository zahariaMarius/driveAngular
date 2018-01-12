/**
 * constant that takes the express modules
 * @type {[modules]}
 */
const express = require('express');

/**
 * execute express like a function
 * @type {[express]}
 */
const app = express();

/**
 * constant that takes the morgan modules
 * @type {[modules]}
 */
const morgan = require('morgan');

/**
 * constant that takes the bodyparse module
 * @type {[modules]}
 */
const bodyParser = require('body-parser');

/**
 * constant that take the routes
 * @type {[router]}
 */
const jsonRoutes = require('../api/routes/json');

/**
 * contain the module that handle the error
 * @type {[type]}
 */
const errorHandling = require('../api/utilities/errorHandling');

/**
 * contain the MongoDB modules utilities
 * @type {[type]}
 */
const mongoose = require('mongoose');

/**
 * connect MongoDB to cloud server
 */
mongoose.connect(
  'mongodb://AngularDriveApp:'+
  'Morning130'+
  '@drive-shard-00-00-2b6ok.mongodb.net:27017,drive-shard-00-01-2b6ok.mongodb.net:27017,drive-shard-00-02-2b6ok.mongodb.net:27017/test?ssl=true&replicaSet=Drive-shard-0&authSource=admin', {
  useMongoClient: true
});
mongoose.Promise = global.Promise;


/**
 * morgan permit to log your server error
 *
 * dev is the format we choose to output
 */
app.use(morgan('dev'));

/**
 * using bodyparser funzionalities
 */
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/**
 * setting header of the app for handling cors error
 */
 app.use((req, res, next) => {
   res.header("Access-Control-Allow-Origin", "*");
   res.header(
     "Access-Control-Allow-Headers",
     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
   );
   if (req.method === 'OPTIONS') {
       res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
       return res.status(200).json({});
   }
   next();
 });
/**
 * only a request with /json will routes
 */
// use is a method of express that takes all the request from a user
app.use('/json', jsonRoutes);

/**
 * handling error
 */
 app.use((req, res, next) => {
     const error = new Error('Not Found');
     error.status = 404;
     errorHandling.errorType(error, res);
 });

//export the app
module.exports = app;
