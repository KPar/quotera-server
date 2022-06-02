const express = require('express');
const booksController = require('../controllers/booksController')
const router = express.Router();
const authentication = require('../middlewares/authentication')
var bodyParser = require('body-parser');
const parser = bodyParser.json();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


const authBook = async (req, res, next) => {
    try{
        let isbnRes = await fetch(`https://openlibrary.org/search.json?isbn=${req.body.isbn}`);
        let isbnDataRes = await isbnRes.json();
        if(isbnDataRes.numFound==0){
            res.sendStatus(404);
        }else{
            let bookRes = await fetch(`https://openlibrary.org/isbn/${req.body.isbn}.json`);
            let bookDataRes = await bookRes.json();
            let worksRes = await fetch(`https://openlibrary.org${bookDataRes.works[0].key}.json`);
            let worksDataRes = await worksRes.json();
            let authorRes = await fetch(`https://openlibrary.org${worksDataRes.authors[0].author.key}.json`);
            let authorDataRes = await authorRes.json();
            req.title = bookDataRes.title;
            req.author = authorDataRes.name;
            req.isbn = req.body.isbn;
            next();
        }

    } catch(err) {
        res.send(err)
    }
}
router.get('/q', parser, booksController.getBooks);

router.get('/user/:userID', booksController.getBooksUserReflected);

router.get('/id/:bookID', booksController.getBook);


router.get('/isbn/:isbn', booksController.getBookByISBN);

router.post('/', authentication.checkAuthenticated, parser, authBook, booksController.addBook);



module.exports = router;