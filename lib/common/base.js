/**
 * BaseController.js
 *
 * Base controller for all sails.js controllers. This just contains some common code
 * that every controller uses
 */
module.exports = {
    /**
     * Generic count action for controller.
     *
     * @param   {Request}   request
     * @param   {Response}  response
     */

    check_req_params: function check_req_params(req, params) {
        var i;
        var p;
        for (i = 0; i < params.length; ++i) {
            p = req[params[i]];
            if (!p) {
                return new Error("Missing input parameter '" + params[i] + "'");
            }
        }
    },

    check_param_anyone: function check_param_anyone(req, params) {
        var i;
        var p;
        var str;
        for (i = 0; i < params.length; ++i) {
            p = req[params[i]];
            if (p) {
                return;
            } else {
                if (_.isUndefined(str)) {
                    str = params[i];
                } else {
                    str = str + ", " + params[i];
                }

            }
        }
        return new Error("At least one of the following input parameters required '" + str + "'");
    },

    check_params_valid: function check_param_anyone(req, validParams) {
        // this is an array
        var i, j;
        for (i = 0; i < req.params.length; ++i) {
            if (_.indexOf(validParams, req.params[i]) == -1) {
                return new Error("Invalid url parameter=" + req.params[i]);
            }
        }
        // this is an object
        for (j in req.body) {
            if (_.indexOf(validParams, j) == -1) {
                return new Error("Invalid request parameter=" + j);
            }
        }

    },

    check_valid_calendar_year: function check_valid_calendar_year(yyyy) {
        if (!(yyyy > 1900) && (yyyy < 2100)) {
            return new Error("Year should be between 1900 and 2100");
        }
    },

    check_valid_birth_year: function check_valid_birth_year(yyyy) {
        var thisYear = (new Date()).getFullYear();
        var minus15years = thisYear - 15;
        if (!(yyyy > 1900) && (yyyy < minus15years)) {
            return new Error("Year should be between 1900 and " + minus15years);
        }
    },

    get_boolean: function get_boolean(str) {
        if (str === "TRUE" || str === "true") {
            return true;
        } else {
            return false;
        }
    },

    // following method never used nor tested. can be a better way
    query_join: function query_join(arr1, arr2, join_param, addParams) {
        var i;
        var j;
        var k;
        for (i = 0; i < arr1.length; ++i) {
            for (j = 0; j < arr2.length; ++j) {
                if (arr1[i][join_param] == arr2[j][join_param]) {
                    for (k = 0; k < addParams.length; ++k) {
                        arr1[i][addParams[k]] = arr2[j][addParams[k]];
                    }
                    break;
                }
            }
        }
        return arr1;
    },

    check_n_number_of_params: function check_n_number_of_params(reqParam, params, number) {
        var i, p, str, count = 0;

        for (i = 0; i < params.length; ++i) {
            p = reqParam[params[i]];
            if (p) {
                count++;
            }
            if (count >= number) {
                return;
            }
            (str) ? (str += ", " + params[i]) : (str = params[i]);
        }
        return new Error("At least " + number + " of the following input parameters required '" + str + "'");
    },

    // fileUploader: function(req, fileParam, cb) {
    //     domain.run(function safelyUpload() {
    //         if (fileParam && req.file(fileParam) && req.file(fileParam)._files.length > 0) {
    //             req.file(fileParam).upload(s3credential, cb)
    //         } else {
    //             cb({ message: 'File or FileParam not found' });
    //         }
    //     })
    // },
    // deleteFile: function(fileUrl, cb) {
    //     var file = (fileUrl.split("s3.amazonaws.com")[1]).replace('%2F', '/'); /*fileUrl.split("s3.amazonaws.com/")[1];*/
    //     client.deleteFile(file, cb);
    // },
    // sendError: function(res, err) {
    //     var eCode = err.code || 400;
    //     return res.json(eCode, err);
    // },

    snakeToCamelCase: (function() {
        var DEFAULT_REGEX = /[-_]+(.)?/g;

        function toUpper(match, group1) {
            return group1 ? group1.toUpperCase() : '';
        }
        return function(str, delimiters) {
            return (str) ? (str.replace(delimiters ? new RegExp('[' + delimiters + ']+(.)?', 'g') : DEFAULT_REGEX, toUpper)) : null;
        };
    })(),
    removeInvalidParams: function(data, validParams) {
        for (var entity in data) {
            if (!validParams.indexOf(entity) > -1) {
                delete data[entity];
            };
        };
        return data;
    },
    filterParams: function(data, fields) {
        var txnObj = {};
        fields.forEach(function(field) {
            if (data.field) {
                txnObj[field] = data.field;
            }
        });
        return txnObj;
    },
    getToken: function(data, type) {
        length = data && data.length || (typeof data == 'number') ? data : 5;
        type = data && data.type || type || 'int';
        return (type == 'int') ? (Math.floor(Math.random() * Math.pow(10, length))) : (Math.random().toString(36).substring(2, length + 2));
    }

};
