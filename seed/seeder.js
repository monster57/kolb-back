var seeder = require('mongoose-seed');
var config = require('../config');

// Connect to MongoDB via Mongoose 
seeder.connect(config.db.url , function() {
 
    // Load Mongoose models 
    seeder.loadModels([
        './models/workflow.js'
    ]);
 
    // Clear specified collections 
    seeder.clearModels(['Workflow'], function() {
 
        // Callback to populate DB once collections have been cleared 
        seeder.populateModels(data);
 
    });
});

var data = [
    {
        'model': 'Workflow',
        'documents': [
            {
                'role': 'Startup',
                'state': 'Draft',
                'transition' : 'Submit',
                'button': 'Submit',
                'designation':'User',
                'isActive': true,
                'message':'Submitted by'
            },
            {
                'role': 'Startup',
                'state': 'UserAction',
                'transition' : 'Stage3',
                'button': 'Submit',
                'designation':'User',
                'isActive': true,
                'message':'Resubmitted by'
            },
            {
                'role': 'Startup',
                'state': 'UserAction',
                'transition' : 'Stage4',
                'button': 'Submit',
                'designation':'User',
                'isActive': true,
                'message':'Resubmitted by'
            },
            {
                'role': 'Startup',
                'state': 'UserAction',
                'transition' : 'Stage5',
                'button': 'Submit',
                'designation':'User',
                'isActive': true,
                'message':'Resubmitted by'
            },
            {
                'role': 'Relationship',
                'state': 'Submit',
                'transition' : 'Stage3',
                'button':'Send to Senior Manager',
                'designation':'Relationship Manager',
                'isActive': true,
                'message':'Approved by'
            },
            {
                'role': 'Relationship',
                'state': 'Submit',
                'transition' : 'UserAction',
                'button':'Send to Startup',
                'designation':'Relationship Manager',
                'isActive': true,
                'message':'Sent back to Startup by'
            },
            {
                'role':'Relationship',
                'state':'Submit',
                'transition' :'Rejected',
                'button':'Reject',
                'designation':'Relationship Manager',
                'isActive': true,
                'message':'Rejected by'
            },
            {
                'role':'Senior',
                'state':'Stage3',
                'transition' :'Stage4',
                'button':'Send to Nodal Officer',
                'designation':'Senior Manager',
                'isActive': true,
                'message':'Approved by'
            },
            {
                'role':'Senior',
                'state':'Stage3',
                'transition' :'Submit',
                'button':'Send to Relationship Manager',
                'designation':'Senior Manager',
                'isActive': true,
                'message':'Sent back to Relationship Manager by'
            },
            {
                'role':'Senior',
                'state':'Stage3',
                'transition' :'UserAction',
                'button':'Send to Startup',
                'designation':'Senior Manager',
                'isActive': true,
                'message':'Sent back to Startup by'
            },
            {
                'role':'Senior',
                'state':'Stage3',
                'transition' :'Rejected',
                'button':'Reject',
                'designation':'Senior Manager',
                'isActive': true,
                'message':'Rejected by'
            },
            {
                'role':'Nodal',
                'state':'Stage4',
                'transition' :'Stage5',
                'button':'Send to Managing Director',
                'designation':'Nodal Officer',
                'isActive': true,
                'message':'Approved by'
            },

            {
                'role':'Nodal',
                'state':'Stage4',
                'transition' :'Stage3',
                'button':'Send to Senior Manager',
                'designation':'Nodal Officer',
                'isActive': true,
                'message':'Sent back to Senior Manager by'

            },
            {
                'role':'Nodal',
                'state':'Stage4',
                'transition' :'Submit',
                'button':'Send to Relationship Manager',
                'designation':'Nodal Officer',
                'isActive': true,
                'message':'Sent back to Relationship Manager by'
            },
            {
                'role':'Nodal',
                'state':'Stage4',
                'transition' :'UserAction',
                'button':'Send to Startup',
                'designation':'Nodal Officer',
                'isActive': true,
                'message':'Sent back to Startup by'
            },
            {
                'role':'Nodal',
                'state':'Stage4',
                'transition' :'Rejected',
                'button':'Reject',
                'designation':'Nodal Officer',
                'isActive': true,
                'message':'Rejected by'
            },
            {
                'role':'MD',
                'state':'Stage5',
                'transition' :'Approved',
                'button':'Approve',
                'designation':'Managing Director',
                'isActive': true,
                'message':'Approved by'
            },
            {
                'role':'MD',
                'state':'Stage5',
                'transition' :'Stage4',
                'button':'Send to Nodal Officer',
                'designation':'Managing Director',
                'isActive': true,
                'message':'Sent back to Nodal Officer by'
            },
            {
                'role':'MD',
                'state':'Stage5',
                'transition' :'Stage3',
                'button':'Send to Senior Manager',
                'designation':'Managing Director',
                'isActive': true,
                'message':'Sent back to Senior Manager by'
            },
            {
                'role':'MD',
                'state':'Stage5',
                'transition' :'Stage4',
                'button':'Send to Relationship Manager',
                'designation':'Managing Director',
                'isActive': true,
                'message':'Sent back to Relationship Manager by'
            },
            {
                'role':'MD',
                'state':'Stage5',
                'transition' :'UserAction',
                'button':'Send to Startup',
                'designation':'Managing Director',
                'isActive': true,
                'message':'Sent back to Startup by'

            },
            {
                'role':'MD',
                'state':'Stage5',
                'transition' :'Rejected',
                'button':'Reject',
                'designation':'Managing Director',
                'isActive': true,
                'message':'Rejected by'
            },
            {
              'role':'Relationship',
                'state':'Approved',
                'transition' :'Certificate_issued',
                'button':'Issue Certificate',
                'designation':'Relationship Manager',
                'isActive': true,
                'message':'Certificate issued by'  
            }
        ]
    }
];