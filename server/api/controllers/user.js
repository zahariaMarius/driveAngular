//const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const fs = require('fs');
const User = require('../models/user');
const errorHandling = require('../utilities/errorHandling');

/**
 * function that render the signup.pug view
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.get_signup_view = (req, res, next) => {
    res.render('../views/signup')
};


/**
 * function that create new user and save it on MongoDB
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.signup_user = (req, res, next) => {
    User.find({ email: req.body.email }).exec()
        .then(user => {
            if (user.length >= 1) {
                return errorHandling.errorType(409,res);
            } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            name: req.body.name,
                            surname: req.body.surname,
                            email: req.body.email,
                            password: req.body.password,
                            signupAt: new Date()
                        });
                        user.save()
                            .then(result => {
                                fs.mkdir('server/api/usersDocuments/'+user._id, (err) => {
                                    if (err) {
                                        errorHandling.errorType(500,res);
                                    } else {
                                        res.redirect('http://localhost:4200/login');
                                    }
                                })
                            })
                            .catch(err => {
                                errorHandling.errorType(500,res);
                            });
            }
        })
        .catch()
};

/**
 * function that render the login.pug view
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.get_login_view = (req, res, next) => {
    res.render('../views/login')
}


/**
 * function that check the user and give him the valid token
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.login_user = (req, res, next) => {
    backURL = req.header('Referer');
    User.find({ email: req.body.email }).exec()
        .then(user => {
            if (user.length < 1) {
                res.cookie('errorMessage', 'Username o Password sbgliata!');
                res.redirect(backURL);
                return errorHandling.errorType(401,res);
            }
            if (req.body.password == user[0].password) {
                const token = jwt.sign({
                    _id: user[0]._id,
                    email: user[0].email,
                    signupAt: user[0].signupAt
                }, 'secret', {
                    expiresIn: '1h'
                });
                 const loginData = {
                     "token" : token,
                     "user_id" : user[0]._id
                }
                res.clearCookie('errorMessage');
                res.cookie('userToken', token);
                res.redirect('http://localhost:4200/dashboard');
            } else {
                res.cookie('errorMessage', "Username o Password sbagliata!");
                res.redirect(backURL);
            }

        })
        .catch(err => {
            res.cookie('errorMessage', "Internal server error!");
            res.redirect(backURL);
        })
};

/**
 * function that return all user
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.get_user = (req, res, next) => {
    const id = req.params.user_id;
    User.find({ _id: id })
    .exec()
    .then(result =>  {
        console.log(result);
        res.status(200).json({
            user: result[0]
        })
    })
    .catch()
};


/**
 * function that patch the user data
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.patch_user = (req, res, next) => {
    const id = req.params.user_id;
    User.findById(id, (err, user) => {
        if (err) {
            res.cookie('errorMessage', "Internal server error!");
            //errorHandling.errorType(500,res);
        } else {
            user.name = req.body.name || user.name;
            user.surname = req.body.surname || user.surname;
            user.email = req.body.email || user.email;
            user.password = req.body.password || user.password;
            user.profileImage = req.body.profileImage || user.profileImage;
            user.save()
            .then(result => {
                console.log(result);
                res.clearCookie('errorMessage');
                res.status(200).json({
                    message: 'User succesfully updated!',
                    user: user
                })
            })
            .catch(err => {
                res.cookie('errorMessage', "Internal server error!");
                //errorHandling.errorType(500,res);
            })
        }
    });
};


exports.delete_user = (req, res, next) => {};
