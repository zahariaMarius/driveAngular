//const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const fs = require('fs');
const User = require('../models/user');

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
                return res.status(409).json({
                    message: 'User email already exist!'
                })
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
                                        console.log(err);
                                        res.status(500).json({
                                            error: err
                                        })
                                    } else {
                                        res.status(201).json({
                                            message: 'User succesfully created!',
                                            user: user
                                        })
                                    }
                                })
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: 'user save error'
                                })
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
    User.find({ email: req.body.email }).exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Auth failed'
                })
            }
            if (req.body.password == user[0].password) {
                const token = jwt.sign({
                    _id: user[0]._id,
                    email: user[0].email,
                    signupAt: user[0].signupAt
                }, 'secret', {
                    expiresIn: '1h'
                });

                return res.status(200).json({
                    message: 'Auth succesfully end',
                    user: user[0],
                    token: token
                })   
            } else {
                return res.status(401).json({
                    message: 'Auth failed!'
                })
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
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
            message: 'User succesfully found',
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
            console.log(err);
            res.status(500).json({
                error: err
            })
        } else {
            user.name = req.body.name || user.name;
            user.surname = req.body.surname || user.surname;
            user.email = req.body.email || user.email;
            user.password = req.body.password || user.password;
            user.profileImage = req.body.profileImage || user.profileImage;
            user.save()
            .then(result => {
                console.log(result);
                res.status(200).json({
                    message: 'User succesfully updated!',
                    user: user
                })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                })
            })
        }
    });
};


exports.delete_user = (req, res, next) => {};
