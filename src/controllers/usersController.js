const usersModel = require('../models/usersModel'); //work since if file not specified, node looks at file named index.js
const bcrypt = require('bcrypt');


async function getUser(req, res, next) {
    try {
        const result = await usersModel.getUser(req.params.userID);
        
        if(result.rows[0]===undefined){
            res.sendStatus(404);
        }else{
            res.json(result.rows[0]);
        }
    } catch (error) {
        res.status(500).json({message: "failed", error});
        return;
    }
}

async function createUser(req, res, next) {
    try {
        const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        await usersModel.createUser(req.body.username, req.body.email, hashedPassword);
        res.sendStatus(201);
    } catch (error) {
        res.status(500).json({message: "failed", error});
        return;
    }
}

async function removeUser(req, res, next) {
    try {
        await usersModel.removeUser(req.params.userID);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({message: "failed", error});
        return;
    }
}

async function updateUsername(req, res, next) {
    try {
        await usersModel.updateUsername(req.params.userID, req.body.username);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({message: "failed", error});
        return;
    }
}

async function updateEmail(req, res, next) {
    try {
        await usersModel.updateEmail(req.params.userID, req.body.email);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({message: "failed", error});
        return;
    }
}

async function updatePassword(req, res, next) {
    try {
        const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        await usersModel.updatePassword(req.params.userID, hashedPassword);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({message: "failed", error});
        return;
    }
}

module.exports = {
    getUser, 
    createUser,
    removeUser,
    updateEmail,
    updatePassword,
    updateUsername
}