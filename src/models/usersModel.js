const db = require('../config/dbConfig');

const getUser = (id) => {
    return db.pool.query(`SELECT user_id, username, email, date_modified, date_created FROM users WHERE user_id = '${id}'`);
}

const getUsername = (id) => {
    return db.pool.query(`SELECT username FROM users WHERE user_id = '${id}'`);
}

const getUserByUsername = (username) => {
    return db.pool.query(`SELECT * FROM users WHERE username = '${username}'`);
}

const createUser = (username, email, password) => {
    return db.pool.query(`INSERT INTO users(username, email, password, date_modified, profile_bio, display_name) VALUES ('${username}','${email}','${password}', current_timestamp,'','')`);
}

const removeUser = (id) => {
    return db.pool.query(`DELETE FROM users WHERE user_id = '${id}'`);
}

const updateUsername = (id, newUsername) => {
    return db.pool.query(`UPDATE users SET username='${newUsername}', date_modified=current_timestamp WHERE user_id = '${id}'`);
}

const updateEmail = (id, newEmail) => {
    return db.pool.query(`UPDATE users SET email='${newEmail}',date_modified=current_timestamp WHERE user_id = '${id}'`);
}

const updatePassword = (id, newPassword) => {
    return db.pool.query(`UPDATE users SET password='${newPassword}',date_modified=current_timestamp WHERE user_id = '${id}'`);
}

module.exports = {
    getUser,
    getUsername,
    getUserByUsername,
    createUser,
    removeUser,
    updateUsername,
    updateEmail,
    updatePassword
}