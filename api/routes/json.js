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


/**** GET  ****/
 //Handle get calls
/**
 * using router to register different well routes
 */
//insert '/' because /json is insert in app
//second method is a handler
router.get('/', (req, res, next) => {
    res.header('Content-Type', 'Application/Json');
    fs.readFile('./data/luke.json', function(err, data) {
        if (err) {
            errorHandling.errorType(err,res);
        }
        else{
            errorHandling.checkErrorForGet(data, res, err);
        }
    });
});

/**
 * get with a specific id
 */
 router.get('/:jsonId', (req, res, next) => {
     const id = req.params.jsonId;
     fs.readFile('./data/' + id + '.json', (err, data) => {
         if (err) {
             errorHandling.errorType(err, res);
         } else {
             errorHandling.checkErrorForGet(data, res, err);

         }
     });
 });

 /**** POST ****/
 //Handle post calls
 router.post('/', (req, res, next) => {
    var id = generateID({prefix:"id-"});
    //the data must have the proper properties
    const jsonData = {
        nome: req.body.nome,
        cognome: req.body.cognome,
        missioniEffettuate: req.body.missioniEffettuate,
        missioniDaEffettuare: req.body.missioniDaEffettuare
    };

    fs.writeFile('./data/jed' + id + '.json', JSON.stringify(jsonData), (err) => {
        errorHandling.checkErrorForPost(res, err, jsonData, id);
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
