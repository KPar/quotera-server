const express = require('express');
const booksController = require('../controllers/booksController')
const router = express.Router();
const authentication = require('../middlewares/authentication')
var bodyParser = require('body-parser')
// create application/json parser
const parser = bodyParser.json();


router.get('/user/:userID', booksController.getBooksUserReflected);

router.get('/:bookID', booksController.getBook);

router.get('/isbn/:isbn', booksController.getBookByISBN);

router.post('/', authentication.checkAuthenticated, parser, booksController.addBook);

module.exports = router;