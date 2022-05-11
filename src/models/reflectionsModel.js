const db = require('../config/dbConfig');

const getReflection = (reflectionID) => {
    return db.pool.query(`SELECT * FROM reflections WHERE reflection_id = '${reflectionID}'`);
}

const getReflectionsByUser = (userID) => {
    return db.pool.query(`SELECT * FROM reflections WHERE user_id = '${userID}'`);
}

const getReflectionsOfBook = (bookID) => {
    return db.pool.query(`SELECT * FROM reflections WHERE book_id = '${bookID}'`);
}

const createReflection = (userID, bookID, quote, reflection, category, isPublished) => {
    return db.pool.query(`INSERT INTO reflections(user_id, book_id, quote, reflection, category, date_modified, is_published) VALUES (${userID},${bookID},'${quote}','${reflection}','${category}', current_timestamp, '${isPublished}')`);
}

const updateReflection = (reflectionID, bookID, quote, reflection, category, isPublished) => {
    return db.pool.query(`UPDATE reflections 
                            SET book_id = '${bookID}', 
                                quote = '${quote}', 
                                reflection = '${reflection}', 
                                category = '${category}', 
                                is_published = '${isPublished}', 
                                date_modified = current_timestamp
                            WHERE reflection_id='${reflectionID}'`);
}

const deleteReflection = (reflectionID) => {
    return db.pool.query(`DELETE FROM reflections WHERE reflection_id = '${reflectionID}'`);
}

module.exports = {
		getReflection,
        getReflectionsByUser,
        getReflectionsOfBook,
        updateReflection,
        deleteReflection,
        createReflection
}