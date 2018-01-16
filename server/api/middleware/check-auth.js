const jwt = require('jsonwebtoken');
const errorHandling = require('../utilities/errorHandling');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'secret');
        req.userData = decoded;
        next();
    } catch (error) {
        return errorHandling.errorType(401, res);
    }
};