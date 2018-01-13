const mongoose = require('mongoose');
const Json = require('../models/json');

/**
 * function that get all saved json into MOngoDB
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.get_all_json = (req, res, next) => {
    Json.find()
        .select('_id nome cognome immagine')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                json: docs.map(doc => {
                    return {
                        _id: doc._id,
                        nome: doc.nome,
                        cognome: doc.cognome,
                        immagine: doc.immagine,
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
};

/**
 * function that create new json and save it on MongpDB
 */
exports.create_new_json = (req, res, next) => {
    var id = generateID({prefix:"id-"});
    const jsonData = new Json({
        _id: new mongoose.Types.ObjectId(),
        nome: req.body.nome,
        cognome: req.body.cognome,
        immagine: req.file.path
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
                    immagine: result.immagine,
                    request: {
                        type: 'POST',
                        url: 'http://localhost:3000/json/'+result._id
                    }
                }
            });
        })
        .catch(error => console.log(error));
};

/**
 * function that return the single json required from MOngoDB
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.get_single_json = (req, res, next) => {
    const id = req.params.jsonID;
    Json.findById(id)
    .select('_id nome cognome immagine')
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
 };


 /**
  * function that update the single json into MongoDB
  * @param {*} req 
  * @param {*} res 
  * @param {*} next 
  */
exports.patch_single_json = (req, res, next) => {
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
 };


 /**
  * function that delete from MongoDB the json required
  * @param {*} req 
  * @param {*} res 
  * @param {*} next 
  */
exports.delete_single_json = (req, res, next) => {
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
};