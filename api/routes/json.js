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
const jsonController = require('../controllers/json');

router
    .route('/')
    .get(jsonController.get_all_json)
    .post(checkAuth, upload.single('productImage'), jsonController.create_new_json);

router
    .route('/:jsonID')
    .get(checkAuth, jsonController.get_single_json)
    .patch(checkAuth, jsonController.patch_single_json)
    .delete(checkAuth, jsonController.delete_single_json);

// export to module the routers
module.exports = router;
