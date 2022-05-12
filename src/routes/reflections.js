const express = require('express');
const reflectionsController = require('../controllers/reflectionsController')
const router = express.Router();
const authentication = require('../middlewares/authentication')
var bodyParser = require('body-parser');
const { authEditOrDeleteReflection,authCreateReflection } = require('../middlewares/permissions/reflectionsPermisions');
// create application/json parser
const parser = bodyParser.json();

router.route('/:reflectionID')
        .get(reflectionsController.getReflection)
        .delete(authentication.checkAuthenticated, authEditOrDeleteReflection, reflectionsController.deleteReflection);

router.get('/users/:userID', parser, reflectionsController.getReflectionsByUser);
router.get('/books/:bookID', parser, reflectionsController.getReflectionsOfBook);

router.post('/', authentication.checkAuthenticated, parser, authCreateReflection, reflectionsController.createReflection);

router.put('/:reflectionID', authentication.checkAuthenticated, parser, authEditOrDeleteReflection, reflectionsController.updateReflection);

module.exports = router;