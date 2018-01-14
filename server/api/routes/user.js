const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router
    .route('/signup')
    .post(userController.signup_user);

router
    .route('/login')
    .post(userController.login_user);

module.exports = router;