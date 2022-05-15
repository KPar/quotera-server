const express = require('express');
const usersController = require('../controllers/usersController')
const router = express.Router();
const authentication = require('../middlewares/authentication')
var bodyParser = require('body-parser');
const { authEditOrDeleteUser } = require('../middlewares/permissions/usersPermissions');
// create application/json parser
const parser = bodyParser.json();
const { userUpdateUsernameSchema, userUpdateEmailSchema, userUpdatePasswordSchema } = require('../validations/usersValidation');
const { validation } = require('../middlewares/validationMiddleware');

router.route('/:userID')
        .get(authentication.checkAuthenticated,usersController.getUser)
        .delete(authentication.checkAuthenticated,authEditOrDeleteUser, usersController.removeUser);

router.put('/:userID/username', validation(userUpdateUsernameSchema),  authentication.checkAuthenticated, parser, authEditOrDeleteUser, usersController.updateUsername);
router.put('/:userID/email', validation(userUpdateEmailSchema),authentication.checkAuthenticated, parser, authEditOrDeleteUser, usersController.updateEmail);
router.put('/:userID/password', validation(userUpdatePasswordSchema), authentication.checkAuthenticated, parser, authEditOrDeleteUser, usersController.updatePassword);


module.exports = router;