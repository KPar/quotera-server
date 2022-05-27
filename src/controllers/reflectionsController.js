const reflectionsModel = require('../models/reflectionsModel'); 

async function getReflection(req, res, next) {
    try {
        const result = await reflectionsModel.getReflection(req.params.reflectionID);
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

async function getReflectionsByUser(req, res, next) {
    try {
        const result = await reflectionsModel.getReflectionsByUser(req.params.userID);
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

async function getReflectionsOfBook(req, res, next) {
    try {
        const result = await reflectionsModel.getReflectionsOfBook(req.params.bookID);
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

async function createReflection(req, res, next) {
    try {
        await reflectionsModel.createReflection(req.user.user_id, 
            req.body.bookID, 
            req.body.quote,
            req.body.reflection,
            req.body.category,
            req.body.isPublished
            );
        res.sendStatus(200);
    } catch (error) {
        res.json({message: "failed", error});
        return;
    }
}

async function updateReflection(req, res, next) {
    try {
        await reflectionsModel.updateReflection(req.params.reflectionID,
            req.body.bookID, 
            req.body.quote,
            req.body.reflection,
            req.body.category,
            req.body.isPublished
            );
        res.sendStatus(200);
    } catch (error) {
        res.json({message: "failed", error});
        return;
    }
}

async function deleteReflection(req, res, next) {
    try {
        await reflectionsModel.deleteReflection(req.params.reflectionID);
        res.sendStatus(200);
    } catch (error) {
        res.json({message: "failed", error});
        return;
    }
}

module.exports = {
    getReflection,
    getReflectionsByUser,
    getReflectionsOfBook,
    createReflection,
    updateReflection,
    deleteReflection
}