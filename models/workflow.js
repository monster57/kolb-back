var mongoose = require('mongoose');
var workflowSchema = new mongoose.Schema({
    state:{
        type: String
    },
    transition:{
        type: String
    },
    role:{
        type: String
    },
    designation:{
        type: String
    },
    isActive:{
        type: Boolean,
        default: true
    },
    button:{
        type: String
    },
    message:{
        type: String
    }
    
}, {
    timestamps: true
});

var Workflow = module.exports = mongoose.model('Workflow', workflowSchema);

