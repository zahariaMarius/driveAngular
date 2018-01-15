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
    User.find({ email: req.query.email }).exec()
        .then(user => {
            if (user.length >= 1) {
                const error = new Error();
                error.status = 409;
                return errorHandling.errorType(error,res);
            } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            name: req.query.name,
                            surname: req.query.surname,
                            email: req.query.email,
                            password: req.query.password,
                            signupAt: new Date()
                        });
                        user.save()
                            .then(result => {
                                fs.mkdir('server/api/usersDocuments/'+user._id, (err) => {
                                    if (err) {
                                        const error = new Error();
                                        error.status = 500;
                                        errorHandling.errorType(error,res);
                                    } else {
                                        res.status(201).json({
                                            message: 'User succesfully created!',
                                            user: user
                                        })
                                    }
                                })
                            })
                            .catch(err => {
                                const error = new Error();
                                error.status = 500;
                                errorHandling.errorType(error,res);
                            });
            }
        })
        .catch()
};

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
                const error = new Error();
                error.status = 401;
                return errorHandling.errorType(error,res);
            }
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

        })
        .catch(err => {
            const error = new Error();
            error.status = 500;
            errorHandling.errorType(error,res);
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
            const error = new Error();
            error.status = 500;
            errorHandling.errorType(error,res);
        } else {
            user.name = req.body.name || user.name;
            user.surname = req.body.surname || user.surname;
            user.email = req.body.email || user.email;
            if (req.body.password) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        const error = new Error();
                        error.status = 500;
                        errorHandling.errorType(error,res);
                    } else {
                        user.password = hash;
                    }
                });
            }
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
                const error = new Error();
                error.status = 500;
                errorHandling.errorType(error,res);
            })
        }
    });
};


exports.delete_user = (req, res, next) => {};
