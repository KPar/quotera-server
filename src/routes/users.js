const express = require('express');
const usersController = require('../controllers/usersController')
const router = express.Router();
const authentication = require('../middlewares/authentication')
var bodyParser = require('body-parser');
const { authEditOrDeleteUser } = require('../middlewares/permissions/usersPermissions');
// create application/json parser
const parser = bodyParser.json();

router.route('/:userID')
        .get(authentication.checkAuthenticated,usersController.getUser)
        .delete(authentication.checkAuthenticated,authEditOrDeleteUser, usersController.removeUser);

router.put('/:userID/username', authentication.checkAuthenticated, parser, authEditOrDeleteUser, usersController.updateUsername);
router.put('/:userID/email', authentication.checkAuthenticated, parser, authEditOrDeleteUser, usersController.updateEmail);
router.put('/:userID/password', authentication.checkAuthenticated, parser, authEditOrDeleteUser, usersController.updatePassword);


module.exports = router;