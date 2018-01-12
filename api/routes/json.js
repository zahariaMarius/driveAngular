/**
 * file: json.js
 * @author: group 05: Toquir, Gianluca, Pietro, Stefano
 * Set the AJAX calls to our server
 */

/**
 * constant that takes the express modules
 * @type {[modules]}
 */
const express = require('express');
/**
 * constant that takes the generateID modules
 * @type {[generateID]}
 */
const generateID = require("unique-id-generator");
/**
 * define a router
 * @type {[Router]}
 */
const router = express.Router();
/**
 * taking fs modules
 * @type {[type]}
 */
const fs = require('fs');
/**
 * contain the module that handle the error
 * @type {[type]}
 */
const errorHandling = require('../utilities/errorHandling');

const mongoose = require('mongoose');

const Json = require('../models/json');

router
    .route('/')
    .get((req, res, next) => {
        Json.find()
            .select('_id nome cognome')
            .exec()
            .then(docs => {
                const response = {
                    count: docs.length,
                    json: docs.map(doc => {
                        return {
                            _id: doc._id,
                            nome: doc.nome,
                            cognome: doc.cognome,
                            request: {
                                type: 'GET',
                                url: 'http://localhost:3000/json/'+doc._id
                            }
                        }
                    })
                };
                console.log(docs);
                res.status(200).json(response);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            })
    })
    .post((req, res, next) => {
        var id = generateID({prefix:"id-"});
        const jsonData = new Json({
            _id: new mongoose.Types.ObjectId(),
            nome: req.body.nome,
            cognome: req.body.cognome
        });
        jsonData
            .save()
            .then(result => {
                console.log(result);
                res.status(201).json({
                    message: 'Json succesfully saved!',
                    createdJson: {
                        _id: result._id,
                        nome: result.nome,
                        cognome: result.cognome,
                        request: {
                            type: 'POST',
                            url: 'http://localhost:3000/json/'+result._id
                        }
                    }
                });
            })
            .catch(error => console.log(error));
    });


router
    .route('/:jsonID')
    .get((req, res, next) => {
        const id = req.params.jsonID;
        Json.findById(id)
        .select('_id nome cognome')
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json({
                    json: doc,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/json'
                    }
                });
            } else {
                res.status(404).json({error: "No valid ID found"});
            }
            console.log(doc);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({errore: error})
        });
     })
     .patch((req, res, next) => {
        const id = req.params.jsonID;
        const updateOps = {}
        for (const ops of req.body) {
            updateOps[ops.propName] = ops.value;
        }
        Json.update({ _id: id}, {$set: updateOps})
            .exec()
            .then(result => {
                console.log(result);
                res.status(200).json({
                    message: 'Json succesfully updated!',
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/json/'+result._id
                    }
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                })
            })
     })
     .put((req, res, next) => {
        const id = req.params.jsonID;
        if(fs.existsSync('./data/' + id + '.json')){
            fs.writeFile('./data/' + id + '.json', JSON.stringify(req.body), (err) => {
                errorHandling.checkErrorForPut(res, req, err);
            });
        } else {
            res.status(404).json({});
        }
    })
    .delete((req, res, next) => {
        const id = req.params.jsonID;
        Json.remove({ _id: id })
            .exec()
            .then(result => {
                console.log(result);
                res.status(200).json({
                    message: 'Json succesfully deleted!'
                })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: err })
            })
    });

// export to module the routers
module.exports = router;
