const reflectionsModel = require("../../models/reflectionsModel")

 
const authEditOrDeleteReflection = async (req, res, next) => {
    const reflection = await reflectionsModel.getReflection(req.params.reflectionID)
    if(reflection.rows[0]==undefined){
        res.sendStatus(404);
    }else if(reflection.rows[0].user_id==req.user.user_id){
        next();
    }else{
        res.sendStatus(403);
    }
}

const authCreateReflection = async (req, res, next) => {
    if(req.body.userID==req.user.user_id){
        next();
    }else{
        res.sendStatus(403);
    }
}

module.exports = {
    authEditOrDeleteReflection,
    authCreateReflection
}