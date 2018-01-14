const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');

router
    .route('/signup')
    .get(userController.get_signup_view)
    .post(userController.signup_user);

router
    .route('/login')
    .post(userController.login_user);

router
    .route('/:user_id')
    .get(checkAuth, userController.get_user)
    .patch(checkAuth, userController.patch_user)
    .delete(checkAuth, userController.delete_user);

module.exports = router;