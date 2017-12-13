var express = require('express');
var router = express.Router();
var model = require('../models');
var Startup = model.Startup;

/* GET home page. */


router.get('/startups', function(req,res){
    Startup.find({}).then(function(cats){
        return res.json(startups);
    })
});

// count all
router.get('/startups/count', function(req, res) {
    Cat.count(function(err, count) {
        if(err) return console.error(err);
        res.json(count);
    });
});

// create
router.post('/startup', function(req, res) {
    var obj = new Startup(req.body);
    obj.save(function(err, obj) {
        if(err) return console.error(err);
        res.status(200).json(obj);
    });
});

// find by id
router.get('/startup/:id', function(req, res) {
    Startup.findOne({_id: req.params.id}, function (err, obj) {
        if(err) return console.error(err);
        res.json(obj);
    })
});

// update by id
router.put('/startup/:id', function(req, res) {
    Startup.findOneAndUpdate({_id: req.params.id}, req.body, function (err) {
        if(err) return console.error(err);
        res.sendStatus(200);
    })
});

// delete by id
router.delete('/startup/:id', function(req, res) {
    Startup.findOneAndRemove({_id: req.params.id}, function(err) {
        if(err) return console.error(err);
        res.sendStatus(200);
    });
});



module.exports = router;
