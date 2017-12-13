var WorkflowController = {};
var models = require('../models');
var User = models.User;
var Startup = models.Startup;
var Workflow = models.Workflow;

WorkflowController.getFlowOfUser = function(req , res){
    var query = req.query;
    Workflow.find({role:query.role , state: query.state})
    .then(function(flows){
        return res.apiSuccess({flows:flows} , "all flows given for the current state and role");
    })
};



module.exports = WorkflowController;
