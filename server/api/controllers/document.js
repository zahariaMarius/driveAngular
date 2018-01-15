const mongoose = require('mongoose');
const fs = require('fs');
const Documents = require('../models/document');
const errorHandling = require('../utilities/errorHandling');

/**
 * function that get all saved json into MOngoDB
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.get_all_documents = (req, res, next) => {
    Documents.find({ user: req.userData._id})
        .select('_id name type dimension path uploadedAt user')
        .exec()
        .then(results => {
            const response = {
                count: results.length,
                documents: results.map(result => {
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
            errorHandling.errorType(500,res);
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
            errorHandling.errorType(500,res);
        });
};

/**
 * function that remove all documents from MongoDB and usersDocuments folder
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.delete_all_documents = (req, res, next) => {
    Documents.find({ user: req.userData._id})
    .exec()
    .then(documents => {
        Documents.remove({ user: req.userData._id})
        .exec()
        .then(result => {
            documents.forEach(element => {
                fs.unlink(element.path, (err) => {
                    if (err) {
                        errorHandling.errorType(500,res);
                    }
                })
            });
            res.status(200).json({
                message: 'All documents succesfully removed!'
            })
        })
        .catch(err => {
            errorHandling.errorType(500,res);
        })
    })
    .catch()
};

/**
 * function that return the single json required from MOngoDB
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.get_single_document = (req, res, next) => {
    const id = req.params.document_id;
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
            errorHandling.errorType(404,res);
        }
    })
    .catch(error => {
        errorHandling.errorType(500,res);
    });
 };

 /**
  * function that delete from MongoDB the json required
  * @param {*} req
  * @param {*} res
  * @param {*} next
  */
exports.delete_single_document = (req, res, next) => {
    const id = req.params.document_id;
    Documents.findById(id)
    .exec()
    .then(document => {
        console.log(document);
        if (document) {
            Documents.remove({ _id: id })
            .exec()
            .then(result => {
                fs.unlink(document.path, (err) => {
                    if (err) {
                        errorHandling.errorType(500,res);
                    } else {
                        res.status(200).json({
                            message: 'Document succesfully removed!'
                        })
                    }
                })
                console.log(result);
            })
            .catch(err => {
                errorHandling.errorType(500,res);
            })
        } else {
            errorHandling.errorType(404,res);
        }
    })
    .catch(error => {
        errorHandling.errorType(500,res);
    });
};
