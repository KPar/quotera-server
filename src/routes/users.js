const express = require('express');
const usersController = require('../controllers/usersController')
const router = express.Router();
const authentication = require('../middlewares/authentication')
var bodyParser = require('body-parser')
// create application/json parser
const parser = bodyParser.json();

router.route('/:userID')
        .get(usersController.getUser)
        .delete(authentication.checkAuthenticated, usersController.removeUser);

router.put('/:userID/username', authentication.checkAuthenticated,parser, usersController.updateUsername);
router.put('/:userID/email', authentication.checkAuthenticated,parser, usersController.updateEmail);
router.put('/:userID/password', authentication.checkAuthenticated, parser, usersController.updatePassword);


module.exports = router;