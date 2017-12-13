var OperationListController = {};
var models = require('../models');
var Operation = models.Operation;
var _ = require('lodash');
OperationListController.getOperationList = function(req, res) {
    Operation.find({}).select("name").then(function(data){
        var operations = data.map(function(operation){
            return operation.name;
        })
        return res.apiSuccess({ data: operations }, "Area of Operation Data ");
    })
};
module.exports = OperationListController;