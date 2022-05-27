const express = require('express');
const reflectionsController = require('../controllers/reflectionsController')
const router = express.Router();
const {checkAuthenticated} = require('../middlewares/authentication')
var bodyParser = require('body-parser');
const { authEditOrDeleteReflection,authCreateReflection } = require('../middlewares/permissions/reflectionsPermisions');
const reflectionCreateSchema = require('../validations/reflectionsValidation');
const { validation } = require('../middlewares/validationMiddleware');
// create application/json parser
const parser = bodyParser.json();

router.route('/:reflectionID')
        .get(reflectionsController.getReflection)
        .delete(checkAuthenticated, authEditOrDeleteReflection, reflectionsController.deleteReflection);

router.get('/checkEditPermission/:reflectionID', parser, checkAuthenticated, authEditOrDeleteReflection, (req, res, next)=>{res.json({authEdit: true})});

router.get('/users/:userID', parser, reflectionsController.getReflectionsByUser);
router.get('/books/:bookID', parser, reflectionsController.getReflectionsOfBook);

router.post('/',parser, validation(reflectionCreateSchema),checkAuthenticated, reflectionsController.createReflection);
//
router.put('/:reflectionID', checkAuthenticated, parser, authEditOrDeleteReflection, reflectionsController.updateReflection);


module.exports = router;