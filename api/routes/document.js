/**
 * file: json.js
 * @author: group 05: Toquir, Gianluca, Pietro, Stefano
 * Set the AJAX calls to our server
 */

const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const multer = require('multer');
const multerStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, 'api/uploads/');
    },
    filename: function(req, file, callback) {
        callback(null, file.originalname);
    }
});
const fileFilter = (req, file, callback) => {}
const upload = multer({storage: multerStorage});
const documentController = require('../controllers/document');

router
    .route('/')
    .get(documentController.get_all_documents)
    .post(checkAuth, upload.single('document'), documentController.upload_new_document);

router
    .route('/:documentID')
    .get(checkAuth, documentController.get_single_document)
//     .patch(checkAuth, documentController.patch_single_json)
//     .delete(checkAuth, documentController.delete_single_json);

// export to module the routers
module.exports = router;
