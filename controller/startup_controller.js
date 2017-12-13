var StartupController = {};
var models = require('../models');
var Startup = models.Startup;
var Upload = models.Upload;
var promise = require('bluebird');
var _ = require('lodash');
var Archiver = require('archiver');

function makeQueryForApproveOrReject(body, user) {
    var name = user.first_name + " " + user.last_name;

    return {
        condition: { _id: body.registration_id, },
        update: { $push: { stage: { contentType: body.transition, changed_by: name, time: new Date(), designation: body.designation, previousState: body.state , message:body.message } } }
    }
}


StartupController.register = function(req, res) {
    var query = makeQueryForApproveOrReject(req.body, req.user);
    var updateData;
    var message;
    if (req.user.type.toLowerCase() == 'startup') {
        return Startup.findOne({ user_id: req.user._id }) //
            .then(function(data) {
                var lastStage = data.stage[data.stage.length - 1];
                if (data && !req.body.is_submitted && !req.body.is_resubmitted) {
                    startups = _.merge(data, req.body);
                    if (data.stage[data.stage.length - 1].contentType == "Welcome") {
                        req.body.stage = data.stage;
                        req.body.stage.push({
                            contentType: "Draft",
                            changed_by: req.user.first_name + " " + req.user.last_name,
                            time: new Date(),
                            designation: "User",
                            previousState: "Welcome"
                        });
                    }

                } else if (data && req.body.is_submitted) {
                    if (data.stage[data.stage.length - 1].contentType == "Submit") {
                        return res.apiError("User already submitted the form");
                    }
                    delete req.body.is_submitted;
                    req.body.stage = data.stage;
                    req.body.stage.push({
                        contentType: "Submit",
                        changed_by: req.user.first_name + " " + req.user.last_name,
                        time: new Date(),
                        designation: "Startup user",
                        previousState: "Draft"
                    });

                    startups = _.merge(data, req.body);
                } else if (data && req.body.is_resubmitted) {

                    var newStage = {
                        contentType: lastStage.previousState,
                        changed_by: req.user.first_name + " " + req.user.last_name,
                        time: new Date(),
                        designation: "Startup user",
                        previousState: lastStage.contentType,
                        message: "Resubmitted by"
                    };
                    data.stage.push(newStage)
                    return data.save();
                } else {
                    req.body.user_id = req.user._id;
                    var startups = new Startup(req.body);
                }
                return startups.save();
            }).then(function(message) {
                return res.apiSuccess({ Startup: message }, 'startupData has been saved');
            }).catch(function(err) {
                return res.apiError("please provide correct data");
            });
    } else if (req.body.startupId) {
        return Startup.update({ _id: req.body.startupId }, { rm_assignee: req.body.rm_assignee }).then(function(startup) {
            return res.apiSuccess({ data: Startup }, message);
        })
    } else {
        return Startup.update(query.condition, query.update).then(function(startup) {
            return res.apiSuccess({ data: Startup }, message);
        })

    }
};
//submit document
StartupController.submitDocument = function(req, res) {
    var body = req.body;
    var newFile;
    promise.map(body.files, function(doc) {

        if (doc.data) {
            if (!doc.id) {
                newFile = new Upload({
                    data: doc.data,
                    name: doc.name,
                    mimeType: doc.mimeType
                });
                return newFile.save().then(function(uploadedDoc) {
                    return Startup.findOne({ _id: body.id }).then(function(startup) {
                        startup[doc.areaType].push({ upload_id: uploadedDoc._id, name: uploadedDoc.name });
                        return startup.save().then(function(startup) {
                            return uploadedDoc;
                        })
                    })
                })
            } else {
                return Upload.findOne({ _id: doc.id }).then(function(file) {
                    file.data = doc.data;
                    file.name = doc.name;
                    file.mimeType = doc.mimeType;
                    return file.save().then(function(uploadedDoc) {
                        return Startup.findOne({ _id: body.id }).then(function(startup) {
                            startup[doc.areaType].forEach(function(data) {
                                if (Object.is(JSON.stringify(data.upload_id), JSON.stringify(uploadedDoc._id))) {
                                    data.name = uploadedDoc.name;
                                }
                            });
                            return startup.save().then(function(startup) {
                                return uploadedDoc;
                            })
                        })
                    })
                })
            }
        }
    }).then(function(result) {
        return Startup.findOne({ _id: body.id }).then(function(data) {
            return res.apiSuccess({ data: data }, "the file is been saved")
        });

    });


}


function makeQueryForStartupFetch(queryParams) {
    var stagePath = {
        relationship: 'Submit',
        senior: 'Stage3',
        nodal: 'Stage4',
        md: 'Stage5'
    }
    var query = {};
    if (queryParams.stage) {
        query['$where'] = "this.stage[this.stage.length-1].contentType ==='" + queryParams.stage + "'"
    };
    return query;
}

StartupController.getStartup = function(req, res) {
    var query;
    if (req.user.type.toLowerCase() == 'startup') {
        return Startup.findOne({ user_id: req.user._id }).populate('user_id').then(function(startupDetail) {
            var retObj = startupDetail.toObject();
            if (!retObj) retObj = {};
            delete retObj.checklist;
            return res.apiSuccess({ startupData: retObj }, 'startup data is retrieved')
        });

    } else {
        query = makeQueryForStartupFetch(req.query);
        return Startup.find(query).select("_id basic_details technology_usage.area_of_operation rm_assignee").then(function(startups) {
            return res.apiSuccess({ startupData: startups }, 'startups data are retrieved')
        });
    }
};

StartupController.getStartupDetails = function(req, res) {
    Startup.findOne({ _id: req.params.registration_id }).populate('user_id').then(function(startupData) {
        return res.apiSuccess({ startupData: startupData }, "startupData is retrieved");
    })
};

StartupController.comment = function(req, res) {
    var params = req.body;
    var id = req.params.id;
    Startup.findByIdAndUpdate(
            id, { $push: { comments: params } }, { upsert: true }
        ).then(function(updateData) {
            return res.apiSuccess(updateData);
        })
        .catch(function(err) {
            res.apiError(err);
        })
};

function createAggregateQuery(states) {
    return Startup.aggregate([{
            "$match": {
                "stage.contentType": { "$in": states }
            }
        }, {
            // Startup.find({}).select({ stage: { '$slice': -1 }})
            "$project": { "stage": { "$slice": ["$stage", -1] } }
        },

        { "$unwind": "$stage" }, {
            "$group": {
                "_id": "$stage.contentType",
                "count": { "$sum": 1 }
            }
        }
    ])
}


StartupController.aggregateStartUp = function(req, res) {
    var states = ['Submit', 'Stage3', 'Stage4', 'Stage5', 'Approved', 'Rejected', 'UserAction', 'Certificate_issued', 'Welcome', 'Draft'];
    createAggregateQuery(states)
        .then(function(counts) {
            this.counts = counts;
            this.states = states;
            var toDate = new Date();
            var fromDate = new Date();
            fromDate.setMonth(fromDate.getMonth() - 1);

            return Startup.aggregate([{
                    "$match": {
                        "stage.contentType": { "$in": states.slice(0, 7) }
                    }
                }, {
                    "$project": { "stage": { "$slice": ["$stage", 1] } }
                }, {
                    "$match": {
                        "stage.time": { $gte: fromDate, $lt: toDate }
                    }
                }, {
                    "$group": {
                        "_id": "lastMonth",
                        "count": { "$sum": 1 }
                    }
                }

            ]);
        })
        // .then(function(countOfRecords){
        //     return res.apiSuccess({ data: countOfRecords }, "the count is coming successfully");
        // })
        .then(function(lastMonthData) {
            var countOfRecords = {};
            this.counts.forEach(function(countData) {
                countOfRecords[countData._id] = countData.count;
            });
            lastMonthData.forEach(function(countData) {
                countOfRecords[countData._id] = countData.count;
            });
            this.states.forEach(function(state) {
                if (!countOfRecords[state]) {
                    countOfRecords[state] = 0;
                }
            })
            return res.apiSuccess({ data: countOfRecords }, "the count is coming successfully");
        })
};

StartupController.getStartupDocument = function(req, res) {
    query = req.query;
    if (query.id) {
        Upload.findOne({ _id: query.id })
            .then(function(data) {
                return res.apiSuccess({ data: data }, "successfully fetched the upload file")
            })
    } else {
        Startup.findOne({ _id: query.registration_id }).select("incorporation annexure financial additional")
            .then(function(data) {
                var retObj = {};
                _.assign(retObj, data.toObject(), { "Online Application": { _id: query.registration_id, name: "Online Application" } });
                return res.apiSuccess({ data: retObj }, "List of Uploaded Documents")
                    // var ids = data.annexure.concat(data.incorporation).concat(data.financial).concat(data.additional);
                    // Upload.find({
                    //     '_id': {
                    //         $in: ids
                    //     }
                    // }).then(function(result) {
                    //     return res.apiSuccess({ data: result }, "successfully fetched the upload file")
                    // });
            })
    }

};

StartupController.createZip = function(req, res) {
    query = req.query;
    Startup.findOne({ _id: query.registration_id }).select("incorporation annexure financial additional basic_details")
          .then(function(data) {
                var ids = data.annexure.concat(data.incorporation).concat(data.financial).concat(data.additional);
                var upload_ids = _.map(ids, 'upload_id');
                Upload.find({
                    '_id': {
                        $in: upload_ids
                    }
                }).then(function(docs) {

                    var zip = Archiver('zip');

                    // Send the file to the page output.
                    zip.pipe(res);

                    // get all the files from docs array
                    _.map(docs, (file) => {
                        var buffer = file.data.split(',')[1];
                        zip.append(new Buffer(buffer, 'base64'), { name: file.name } );
                    });

                    // Tell the browser that this is a zip file.
                    res.writeHead(200, {
                        'Content-Type': 'application/zip',
                        'Content-disposition': 'attachment; filename='+data.basic_details.name+'.zip'
                    });
                    zip.finalize();
                });
            })
};



StartupController.updateChecklist = function(req, res) {
    var startup_id = req.query.id;
    var checklist = req.body.checklist;
    Startup.findOne({ _id : startup_id }, function (err, startup){
          startup.checklist || (startup.checklist = {});
          if(startup.checklist) startup.checklist.listItems || (startup.checklist.listItems = []);
          startup.checklist.listItems = checklist.listItems;
        //  startup.checklist.listItems = _.uniqBy(_.union(startup.checklist.listItems, checklist.listItems),'id');
          startup.save().then(function(response){
                   return res.apiSuccess(response);
              })
              .catch(function(err) {
                  res.apiError(err);
              })
      })
      .catch(function(err) {
          res.apiError(err);
      })
};

StartupController.updateSign = function(req, res) {
    var startup_id = req.query.id;
    var signedBy = req.body.signedBy;
    var sign_type = req.body.signType
    var sign_date = new Date();

    Startup.findOne({ _id: startup_id }, function(err, startup) {
            startup.checklist || (startup.checklist = {});
            if (sign_type === 'MD') {
                startup.checklist.checklistSignedByMD = signedBy;
                startup.checklist.checklistSignedByMDDate = sign_date;
            } else if (sign_type === 'Nodal') {
                startup.checklist.checklistSignedByNodal = signedBy;
                startup.checklist.checklistSignedByNodalDate = sign_date;
            } else {
                return res.apiError("Please speficy the role of user in signType as MD or Nodal ");
            }
            startup.save().then(function(response) {
                    return res.apiSuccess(response);
                })
                .catch(function(err) {
                    res.apiError(err);
                })
        })
        .catch(function(err) {
            res.apiError(err);
        })
};

StartupController.updateProcessingFee = function(req, res) {
    var startup_id = req.query.id;
    var fee_Details = req.body.processing_fees;

    Startup.findOne({ _id : startup_id }, function (err, startup){
          startup.processingFees || (startup.processingFees = {});
          startup.processingFees = fee_Details;
          startup.save().then(function(response){
                   return res.apiSuccess({data: response.processingFees},`The Fees of Rs ${response.processingFees.processingFeeCollected} has been collected on ${response.processingFees.processingFeeCollectedDate}`);
              })
              .catch(function(err) {
                  res.apiError(err);
              })
      })
      .catch(function(err) {
          res.apiError(err);
      })
};

StartupController.removeDocument = function(req, res) {

    Startup.findOne({ _id: req.body.startup_id }).then(function(data) {
            data[req.body.areaType].forEach(function(file, index, array) {
                if (file.upload_id == req.body.document_id) {
                    data[req.body.areaType].splice(index, 1);
                }
            })
            return data.save();
        })
        .then(function(startup) {
            return Upload.remove({ _id: req.body.document_id });
        })
        .then(function(result) {
            return res.apiSuccess({ data: result }, "The document has been deleted")
        });

}
module.exports = StartupController;
