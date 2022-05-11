const express = require('express');
const reflectionsController = require('../controllers/reflectionsController')
const router = express.Router();
const authentication = require('../middlewares/authentication')
var bodyParser = require('body-parser')
// create application/json parser
const parser = bodyParser.json();

router.route('/:reflectionID')
        .get(reflectionsController.getReflection)
        .delete(authentication.checkAuthenticated, reflectionsController.deleteReflection);

router.get('/users/:userID', parser, reflectionsController.getReflectionsByUser);
router.get('/books/:bookID', parser, reflectionsController.getReflectionsOfBook);

router.post('/', authentication.checkAuthenticated,parser, reflectionsController.createReflection);

router.put('/:reflectionID', authentication.checkAuthenticated, parser, reflectionsController.updateReflection);

module.exports = router;