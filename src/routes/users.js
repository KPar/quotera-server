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
        .get(usersController.getUser)
        .delete(authentication.checkAuthenticated,authEditOrDeleteUser, usersController.removeUser);

router.get('/:userID/username', usersController.getUsername);

router.put('/:userID/username', parser, validation(userUpdateUsernameSchema),  authentication.checkAuthenticated,  authEditOrDeleteUser, usersController.updateUsername);
router.put('/:userID/email', parser, validation(userUpdateEmailSchema),authentication.checkAuthenticated, authEditOrDeleteUser, usersController.updateEmail);
router.put('/:userID/password', parser,  validation(userUpdatePasswordSchema), authentication.checkAuthenticated, authEditOrDeleteUser, usersController.updatePassword);

router.get('/:userID/auth', authentication.checkAuthenticated, (req,res,next)=>{
        if(req.params.userID===req.user.user_id){
                res.sendStatus(200);
        }else{
                res.sendStatus(401);
        }
});


module.exports = router;