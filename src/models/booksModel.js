const db = require('../config/dbConfig');

const getBook = (id) => {
    return db.pool.query(`SELECT * FROM books WHERE book_id = '${id}'`);
}

const getBookByISBN = (isbn) => {
    return db.pool.query(`SELECT * FROM books WHERE isbn = '${isbn}'`);
}

const addBook = (title, author, isbn) => {
    //validate that book isbn doesnt exist already in db
    return db.pool.query(`INSERT INTO books (title, author, isbn) 
        VALUES ('${title}', '${author}', '${isbn}')`);
}

const getBooksUserReflected = (id) => {
    return db.pool.query(`SELECT DISTINCT books.book_id, title, author FROM books INNER JOIN reflections ON books.book_id = reflections.book_id WHERE user_id=${id}`);
}

module.exports = {
		getBook,
        getBookByISBN,
        addBook,
        getBooksUserReflected
}