var mongoose = require('mongoose');
var workflowElementSchema = new mongoose.Schema({
    roles:{
        type: Array
    },
    transitions:{
        type: Array
    },
    states:{
        type: Array 
    }
    
}, {
    timestamps: true
});

var WorkflowElement = module.exports = mongoose.model('WorkflowElement', workflowElementSchema);

