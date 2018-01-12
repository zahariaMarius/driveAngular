const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const errorHandling = require('../utilities/errorHandling');
const mongoose = require('mongoose');
const User = require('../models/user');

router
    .route('/signup')
    .post((req, res, next) => {
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
    })

module.exports = router;