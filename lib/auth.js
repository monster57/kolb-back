var models = require('../models');
var User = models.User;

var AuthFunctions = {};

AuthFunctions.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated())  // <-- typo here
        return next();
    return res.apiLoginError( {loggedIn: false });
}

AuthFunctions.isLoggedInAsKBITUser = function(req, res, next) {
	var users = ['relationship' , 'senior', 'nodal' , 'md']
    if (req.user && users.indexOf(req.user.type.toLowerCase()) >= 0)  // <-- typo here
        return next();
    return res.apiLoginError( {loggedIn: false });
}


AuthFunctions.isLoggedInAsStartupUser = function(req, res, next){
	if(req.user && req.user.type.toLowerCase() == 'startup'){
		return next()
	}

	return res.apiLoginError({loggedIn: false});
}


AuthFunctions.isLoggedInAsRelationshipManager = function(req, res, next){
	if(req.user && req.user.type.toLowerCase() == 'relationship'){
		return next()
	}

	return res.apiLoginError({loggedIn: false});
}

AuthFunctions.isLoggedInAsSeniorManager = function(req, res, next){
	if(req.user && req.user.type.toLowerCase() == 'senior'){
		return next()
	}

	return res.apiLoginError({loggedIn: false});
}

AuthFunctions.isLoggedInAsNodleOfficer = function(req, res, next){
	if(req.user && req.user.type.toLowerCase() == 'nodal'){
		return next()
	}

	return res.apiLoginError({loggedIn: false});
}

AuthFunctions.isLoggedInAsManagingDirector = function(req, res, next){
	if(req.user && req.user.type.toLowerCase() == 'md'){
		return next()
	}

	return res.apiLoginError({loggedIn: false});
}

AuthFunctions.loginError = function( req, res ) {
  res.apiError({message:"Login Error! try again later"});
};

AuthFunctions.IsLoggedInRest = function(req, req,  next){
	if(!req.params.token){
		return res.apiError({message: "session has expired. please login again", loggedIn: false});
	}
	User.findOne({token:req.params.token})
	.then(function(user){
		if(!user){
			return res.apiError({message: "session has expired. please login again" , loggedIn: false});
		}

		return next();
	});
}


module.exports = AuthFunctions;