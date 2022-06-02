const booksModel = require('../models/booksModel'); //work since if file not specified, node looks at file named index.js


async function getBook(req, res, next) {
    try {
        const result = await booksModel.getBook(req.params.bookID);
        if(result.rows[0]===undefined){
            res.sendStatus(404);
        }else{
            res.json(result.rows[0]);
        }
    } catch (error) {
        res.json({message: "failed", error});
        return;
    }
}

async function getBooks(req, res, next) {
    try {
        const result = await booksModel.getBooks(req.query.data);
        if(result.rows[0]===undefined){
            res.sendStatus(404);
        }else{        

            res.json(result.rows);
        }
    } catch (error) {
        res.json({message: "failed", error});
        return;
    }
}

async function getBookByISBN(req, res, next) {
    try {
        const result = await booksModel.getBookByISBN(req.params.isbn);
        if(result.rows[0]===undefined){
            res.sendStatus(404);
        }else{
            res.json(result.rows[0]);
        }
    } catch (error) {
        res.json({message: "failed", error});
        return;
    }
}


async function addBook(req, res, next) {
    try {
        await booksModel.addBook(req.title, req.author, req.isbn);
        res.sendStatus(200);
    } catch (error) {     
        res.json({message: "failed", error});        
        return;
    }
}

async function getBooksUserReflected(req, res, next) {
    try {
        const result = await booksModel.getBooksUserReflected(req.params.userID);
        res.json(result.rows);
    } catch (error) {
        res.json({message: "failed", error});
        return;
    }
}

module.exports = {getBook, getBooks, getBookByISBN, addBook, getBooksUserReflected}