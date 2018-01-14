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
        callback(null, 'server/api/usersDocuments/'+req.userData._id);
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
    .get(checkAuth, documentController.get_all_documents)
    .put(checkAuth, upload.single('document'), documentController.upload_new_document)
    .delete(checkAuth, documentController.delete_all_documents);

router
    .route('/:document_id')
    .get(checkAuth, documentController.get_single_document)
    .delete(checkAuth, documentController.delete_single_document);

// export to module the routers
module.exports = router;
