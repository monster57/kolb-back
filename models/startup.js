var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var startUpSchema = new mongoose.Schema({
    basic_details: {
        logo: {
            name: {
                type: String
            },
            contentType: {
                type: String
            },
            data: {
                type: String
            }
        },

        name: {
            type: String
        },

        url: {
            type: String
        },
    },

    technology_usage: {
        area_of_operation: {
            type: String
        },

        technology: {
            type: String
        },

        is_product_company: {
            type: String
        },

        is_service_company: {
            type: String
        },

        company_profile: {
            type: String
        },
        is_clicked:{
            type:Boolean,
            default:false
        }

    },

    company_records: {
        undertaking_status: {
            type: String
        },

        commercial_commencement_date: {
            type: Date
        },

        number_of_branches: {
            type: Number
        },

        incorporation_date: {
            type: Date
        },
        encorporation_number: {
            type: String
        },

        PAN_number: {
            type: String
        },
        statutory_licence: {
            type: String
        },
        statutory_certificate: {
            data: Buffer,
            contentType: String,
        },
        is_clicked:{
            type:Boolean,
            default:false
        }
    },

    financial_information: {
        indicators: [{
            year: String,

            profit_before_tax: Number,

            net_worth: Number,

            reserves_surplus: Number,

            revenue: Number

        }],
        check:{
            type:Boolean,
            default:false
        },
        is_clicked:{
            type:Boolean,
            default:false
        }
    },

    emp_info: {
        no_of_permanent_emp: {
            type: Number
        },

        no_of_women: {
            type: Number
        },

        no_of_permanent_qualified_workforce: {
            type: Number
        },

        no_of_qualified_women: {
            type: Number
        },
        is_clicked:{
            type:Boolean,
            default:false
        }

    },

    self_cerfication: {
        is_revenew_below_fifty_crores: {
            type: Boolean
        },

        is_formed_by_dermeger: {
            type: Boolean
        },

        is_parent_company_is_a_startup: {
            type: Boolean
        },

        is_combined_entity_a_startup: {
            type: Boolean
        },

        is_franchisee_of_existing_business: {
            type: Boolean
        },

        is_application_promoted: {
            type: Boolean
        },

        is_not_a_holding_company: {
            type: Boolean
        },
        is_clicked:{
            type:Boolean,
            default:false
        }
    },

    detailed_background: {
        address: {
            type: String
        },

        taluka: {
            type: String
        },

        district: {
            type: String
        },

        pincode: {
            type: Number
        },

        company_land_line_number: {
            type: Number
        },

        company_fax_number: {
            type: Number
        },

        company_mobile_number: {
            type: Number
        },

        company_email_id: {
            type: String
        },

        CEO_name: {
            type: String
        },

        CEO_land_line_number: {
            type: Number
        },

        CEO_fax_number: {
            type: Number
        },

        CEO_mobile_number: {
            type: String
        },

        CEO_email_id: {
            type: String
        },

        authorized_person_name: {
            type: String
        },

        authorized_person_land_line: {
            type: Number
        },

        authorized_person_fax: {
            type: Number
        },

        authorized_person_mobile: {
            type: Number
        },

        authorized_person_emailId: {
            type: String
        },
         founder_nationality: {
            type: String
        },
        founder_name: {
            type: String
        },

        founder_land_line: {
            type: Number
        },

        founder_age: {
            type: Number
        },

        founder_mobile: {
            type: Number
        },

        founder_emailId: {
            type: String
        },
        is_clicked:{
            type:Boolean,
            default:false
        }

    },

    promotion: {
        came_to_know: {
            type: String
        },
        is_clicked:{
            type:Boolean,
            default:false
        }
    },

    incubator_details: {
        is_incubated: {
            type: Boolean
        },

        name: {
            type: String,
        },

        address: {
            type: String,
        },

        chief_promoter: {
            type: String,
        },

        mobile_number_chief_promoter: {
            type: String,
        },
        
        email_chief_promoter: {
            type: String,
        },

        website_incubator: {
            type: String,
        },

        select_incubator: {
            type: String,
        },
        is_clicked:{
            type:Boolean,
            default:false
        }
    },

    annexure: [{
        upload_id: {
            type: mongoose.Schema.ObjectId,
            ref: 'UploadFile'
        },
        name: {
            type: String
        }
    }],



    incorporation: [{
        upload_id: {
            type: mongoose.Schema.ObjectId,
            ref: 'UploadFile'
        },
        name: {
            type: String
        }
    }],

    financial: [{
        upload_id: {
            type: mongoose.Schema.ObjectId,
            ref: 'UploadFile'
        },
        name: {
            type: String
        }
    }],

    additional: [{
        upload_id: {
            type: mongoose.Schema.ObjectId,
            ref: 'UploadFile'
        },
        name: {
            type: String
        }
    }],

     attorney: [{
        upload_id: {
            type: mongoose.Schema.ObjectId,
            ref: 'UploadFile'
        },
        name: {
            type: String
        }
    }],

    operative: [{
        upload_id: {
            type: mongoose.Schema.ObjectId,
            ref: 'UploadFile'
        },
        name: {
            type: String
        }
    }],

    additional_document: {
        additional_document_information: {
            type: String
        }
    },

    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },

    stage: [{
        contentType: {
            type: String,
            enum: ["Welcome", "Draft", "Submit", "Stage3", "Stage4", "Stage5", "Approved", "Rejected", "Certificate_issued", "UserAction"]
        },
        changed_by: {
            type: String
        },
        time: {
            type: Date,
            default: new Date()
        },
        designation: {
            type: String,
            default: "User"
        },
        previousState: {
            type: String,
            default: "Welcome"
        },
        message:{
            type: String
        }

    }],
    reason_for_rejection: {
        type: String
    },
    reason_for_send_to_user: {
        type: String
    },
    comments: [{
        user_id: {
            type: mongoose.Schema.ObjectId,
            required: true,
            ref: 'User'
        },
        date: Date,
        name: String,
        designation: String,
        text: String,
        isInternalConversation: Boolean
    }],
    checklist: {
        listItems: [{
            name: String,
            verified: Boolean,
            againstDocument: {
                type: mongoose.Schema.ObjectId,
                ref: 'UploadFile'
            },
            verifiedBy: {
                type: mongoose.Schema.ObjectId,
                required: true,
                ref: 'User'
            },
            verifiedOn: Date,
            remark: String
        }],

        checklistSignedByNodal: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            default: null
        },
        checklistSignedByNodalDate: Date,
        checklistSignedByMD: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            default: null
        },
        checklistSignedByMDDate: Date

    },
    processingFees: {
        processingFeeCollected: Number,
        processingFeeCollectedDate: Date
    },
    rm_assignee: {
        assignee_id: {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        },
        name:{
            type:String
        }
    }
}, {
    timestamps: true
});

startUpSchema.pre("save", function(next) {
    if (this.stage.length == 0)
        this.stage.push({ contentType: "Welcome", time: new Date(), designation: "User" });

    next();
});

var Startup = module.exports = mongoose.model('Startup', startUpSchema);
