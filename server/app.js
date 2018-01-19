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
 * constant that take the json routes
 * @type {[router]}
 */
const documentRoutes = require('./api/routes/document');

/**
 * constant that take the user routes
 * @type {[router]}
 */
const userRoutes = require('./api/routes/user');

/**
 * contain the module that handle the error
 * @type {[type]}
 */
const errorHandling = require('./api/utilities/errorHandling');

/**
 * contain the MongoDB modules utilities
 * @type {[type]}
 */
const mongoose = require('mongoose');

/**
 * connect MongoDB to cloud server
 */
mongoose.connect(
    'mongodb://AngularDrive:'+
    'Morning.130'+
    '@angulardrive-shard-00-00-zqkgs.mongodb.net:27017,angulardrive-shard-00-01-zqkgs.mongodb.net:27017,angulardrive-shard-00-02-zqkgs.mongodb.net:27017/test?ssl=true&replicaSet=AngularDrive-shard-0&authSource=admin', {
    useMongoClient: true
});
mongoose.Promise = global.Promise;

/**
 * morgan permit to log your server error
 *
 * dev is the format we choose to output
 */
app.use(morgan('dev'));
app.set('views', __dirname + '/api/views');
app.set('view engine', 'pug');
/**
 * using bodyparser funzionalities
 */
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/**
 * setting header of the app for handling cors error
 */
 app.use((req, res, next) => {
     res.header('Access-Control-Allow-Origin', '*');
     res.header('Access-Control-Allow-Headers', '*');
     res.header('X-Powered-By', 'Node.js, Express, MongoDB, Mongoose');
     res.header('X-Version', '1.0.5');
     if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Headers', '*');
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
   }
   next();
 });
/**
 * only a request with /json will routes
 */
// use is a method of express that takes all the request from a user
app.use('/documents', documentRoutes);
app.use('/user', userRoutes);

/**
 * handling error
 */
app.use((req, res, next) => {
    res.render('../views/index')
});

//export the app
module.exports = app;
