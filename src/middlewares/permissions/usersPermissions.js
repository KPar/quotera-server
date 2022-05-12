
const authEditOrDeleteUser = async (req, res, next) => {
    if(req.params.userID==req.user.user_id){
        res.sendStatus(200);
        next();
    }else{
        res.sendStatus(403);
    }
}

module.exports = {
    authEditOrDeleteUser
}