const checkAuthenticated = (req, res, next) => {
	if(req.isAuthenticated()){
		return next();
	}
	res.status(401).json({isAuthenticated: false})
}

module.exports = {
    checkAuthenticated
}