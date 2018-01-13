const mongoose = require('mongoose');
const Documents = require('../models/document');

/**
 * function that get all saved json into MOngoDB
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.get_all_documents = (req, res, next) => {
    Documents.find()
        .select('_id name type dimension path uploadedAt user')
        .exec()
        .then(results => {
            const response = {
                count: results.length,
                json: results.map(result => {
                    return {
                        _id: result._id,
                        name: result.name,
                        type: result.type,
                        dimension: (result.dimension / 1000) + 'KB',
                        path: result.path,
                        uploadedAt: result.uploadedAt,
                        user: result.user,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/documents/'+result._id
                        }
                    }
                })
            };
            console.log(results);
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
exports.upload_new_document = (req, res, next) => {
    const document = new Documents({
        _id: new mongoose.Types.ObjectId(),
        name: req.file.originalname,
        type: req.file.mimetype,
        dimension: req.file.size,
        path: req.file.path,
        uploadedAt: new Date(),
        user: req.userData._id
    });
    document
        .save()
        .then(result => {
            console.log('result: ' + result);
            res.status(201).json({
                message: 'document succesfully saved!',
                documentUpload: {
                    _id: result._id,
                    name: result.name,
                    type: result.type,
                    dimension: (result.dimension / 1000) + ' KB',
                    path: result.path,
                    uploadedAt: result.uploadedAt,
                    user: result.user,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/documents/'+result._id
                    }
                }
            });
        })
        .catch(error => {
            res.status(500).json({
                error: error
            })
        });
};

/**
 * function that return the single json required from MOngoDB
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.get_single_document = (req, res, next) => {
    const id = req.params.documentID;
    Documents.findById(id)
    .select('_id name type dimension path uploadedAt user')
    .exec()
    .then(document => {
        console.log(document);
        if (document) {
            res.download(document.path, (err) => {
                if (err) {
                    console.log(err)
                }
            })
        } else {
            res.status(404).json({error: "No valid document _id found"});
        }
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
// exports.patch_single_json = (req, res, next) => {
//     const id = req.params.jsonID;
//     const updateOps = {}
//     for (const ops of req.body) {
//         updateOps[ops.propName] = ops.value;
//     }
//     Documents.update({ _id: id}, {$set: updateOps})
//         .exec()
//         .then(result => {
//             console.log(result);
//             res.status(200).json({
//                 message: 'Json succesfully updated!',
//                 request: {
//                     type: 'GET',
//                     url: 'http://localhost:3000/json/'+result._id
//                 }
//             });
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 error: err
//             })
//         })
//  };


 /**
  * function that delete from MongoDB the json required
  * @param {*} req 
  * @param {*} res 
  * @param {*} next 
  */
// exports.delete_single_json = (req, res, next) => {
//     const id = req.params.jsonID;
//     Documents.remove({ _id: id })
//         .exec()
//         .then(result => {
//             console.log(result);
//             res.status(200).json({
//                 message: 'Json succesfully deleted!'
//             })
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({ error: err })
//         })
// };