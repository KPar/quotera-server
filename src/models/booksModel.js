const db = require('../config/dbConfig');

const getBook = (id) => {
    return db.pool.query(`SELECT * FROM books WHERE book_id = '${id}'`,(err)=>{
        if(err){
            console.error('err from callback: ' + err.stack)
        }
    });
}

const getBookByISBN = (isbn) => {
    return db.pool.query(`SELECT * FROM books WHERE isbn = '${isbn}'`,(err)=>{
        if(err){
            console.error('err from callback: ' + err.stack)
        }
    });
}

const addBook = (title, author, isbn) => {
    //validate that book isbn doesnt exist already in db
    return db.pool.query(`INSERT INTO books (title, author, isbn) 
        VALUES ('${title}', '${author}', '${isbn}')`,(err)=>{
            if(err){
                console.error('err from callback: ' + err.stack)
            }
        });
}

const getBooksUserReflected = (id) => {
    return db.pool.query(`SELECT DISTINCT books.book_id, title, author FROM books INNER JOIN reflections ON books.book_id = reflections.book_id WHERE user_id=${id}`,(err)=>{
        if(err){
            console.error('err from callback: ' + err.stack)
        }
    });
}

module.exports = {
		getBook,
        getBookByISBN,
        addBook,
        getBooksUserReflected
}