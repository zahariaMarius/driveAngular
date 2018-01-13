const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/user');

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
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        })
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });
                        user.save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: 'User succesfully created!'
                                })
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                })
                            });    
                    }
                })
            }
        })
        .catch()
};


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
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    })  
                }
                if (result) {
                    const token = jwt.sign({
                        _id: user[0]._id,
                        email: user[0].email,
                    }, 'secret', {
                        expiresIn: '1h'
                    });

                    return res.status(200).json({
                        message: 'Auth succesfully end',
                        token: token
                    })
                }
            })

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
};