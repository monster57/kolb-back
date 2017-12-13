var seeder = require('mongoose-seed');
var config = require('../config');

// Connect to MongoDB via Mongoose
seeder.connect(config.db.url, function () {

    // Load Mongoose models
    seeder.loadModels([
        './models/operation.js'
    ]);

    // Clear specified collections
    seeder.clearModels(['Operation'], function () {

        // Callback to populate DB once collections have been cleared
        seeder.populateModels(data);

    });
});

var data = [
    {
        'model': 'Operation',
        'documents': [
            {
                name: 'Accounting'
            },
            {
                name: 'Advertising'
            },
            {
                name: 'Aerospace'
            },
            {
                name: 'Agriculture'
            },
            {
                name: 'Architecture & Construction'
            },
            {
                name: 'Automotive'
            },
            {
                name: 'B2B/Enterprise'
            },
            {
                name: 'Banking & Accounting'
            },
            {
                name: 'Biotech'
            },
            {
                name: 'Computer Networking'
            },
            {
                name: 'Computer Security'
            },
            {
                name: 'Consulting'
            },
            {
                name: 'Consumer'
            },
            {
                name: 'Data & Analytics'
            },
            {
                name: 'Defence & Military'
            },
            {
                name: 'Design'
            },
            {
                name: 'E-commerce'
            },
            {
                name: 'Energy & Cleantech'
            },
            {
                name: 'Entertainment'
            },
            {
                name: 'Fashion'
            },
            {
                name: 'Film Production'
            },
            {
                name: 'Finance'
            },
            {
                name: 'Food & Baverages'
            },
            {
                name: 'Gaming'
            },
            {
                name: 'Goverment'
            },
            {
                name: 'Hardware'
            },
            {
                name: 'Health/Medical'
            },
            {
                name: 'Insurance'
            },
            {
                name: 'Internet of Things'
            },
            {
                name: 'Jobs & Recruiting'
            },
            {
                name: 'Law Enforcement'
            },
            {
                name: 'Legal Services'
            },
            {
                name: 'Logistics/Supply Chain'
            },
            {
                name: 'Manufacturing'
            },
            {
                name: 'Market Research'
            },
            {
                name: 'Marketing'
            },
            {
                name: 'Media Medical Devices'
            },
            {
                name: 'Military'
            },
            {
                name: 'Mobile'
            },
            {
                name: 'Music'
            },
            {
                name: 'Net Intfrastructure'
            },
            {
                name: 'Pets'
            }, {
                name: 'Politics'
            },
            {
                name: 'PR & Communications Productivity & CRM'
            },
            {
                name: 'Real Estate'
            },
            {
                name: 'Retail'
            },
            {
                name: 'Robotics'
            },
            {
                name: 'Sharing Economy'
            },
            {
                name: 'Smart Cities'
            },
            {
                name: 'Social Enterprise'
            },
            {
                name: 'Social Networking'
            },
            {
                name: 'Software'
            },
            {
                name: 'Software Development'
            },
            {
                name: 'Sports'
            },
            {
                name: 'Startups'
            },
            {
                name: 'Telecommunications'
            },
            {
                name: 'Training & Coaching'
            },
            {
                name: 'Transportaion'
            },
            {
                name: 'Travel'
            },
            {
                name: 'Web'
            },
            {
                name: 'Wine & Spirits'
            },
            {
                name: 'Women'
            }
        ]
    }
]
