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

/**** GET  ****/
 //Handle get calls
/**
 * using router to register different well routes
 */
//insert '/' because /json is insert in app
//second method is a handler
router.get('/', (req, res, next) => {
    Json.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
});

/**
 * get with a specific id
 */
 router.get('/:jsonId', (req, res, next) => {
    const id = req.params.jsonId;
    Json.findById(id)
    .exec()
    .then(doc => {
<<<<<<< HEAD
        console.log(doc);
        res.status(200).json(doc);
=======
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({error: "No valid ID found"});
        }
        console.log(doc);
>>>>>>> 951c6b25d2ea3008f4323a785881b83d7857b441
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({errore: error})
    });
 });

 /**** POST ****/
 //Handle post calls
 router.post('/', (req, res, next) => {
    var id = generateID({prefix:"id-"});

    const jsonData = new Json({
        _id: new mongoose.Types.ObjectId(),
        nome: req.body.nome,
        cognome: req.body.cognome
    });

    jsonData
        .save()
        .then(result => {
            console.log("ciaooo");
            console.log(result);
        })
        .catch(error => console.log(error));

        res.status(201).json({
            message: 'handling POST request to /json',
            createdJson: jsonData,
        });
});

/**** PUT ****/
 //Handle put calls
/**
 * update a specific Id
 */
router.put('/:jsonId', (req, res, next) => {
    const id = req.params.jsonId;
    if(fs.existsSync('./data/' + id + '.json')){
        fs.writeFile('./data/' + id + '.json', JSON.stringify(req.body), (err) => {
            errorHandling.checkErrorForPut(res, req, err);
        });
    } else {
        res.status(404).json({});
    }
});
router.delete('/:jsonId', (req, res, next) => {
    res.status(200).json({
        message: 'deleted!'
    });
});
// export to module the routers
module.exports = router;
