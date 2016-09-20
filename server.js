// server.js

// set up ======================
var express  = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var morgan = require('morgan');

var app      = express();

// configuration ================
var config = require('./config/config');

mongoose.connect(config.mongourl);     // connect to mongoDB database on modulus.io

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());
app.use(morgan('dev'));


// define task model =============
var Task = mongoose.model('Task', {
    text : String
});

// routes ========================

// get
app.get('/api/tasks', function(req, res) {

    Task.find(function(err, tasks) {
        if (err){
            res.send(err);
        }
        res.json(tasks);
    });
});

// create task
app.post('/api/tasks', function(req, res) {

    Task.create({
        text : req.body.text,
        done : false
    }, function(err, task) {
        if (err){
            res.send(err);
        }

        Task.find(function(err, tasks) {
            if (err){
                res.send(err);
            }
            res.json(tasks);
        });
    });

});

// delete a task
app.delete('/api/tasks/:task_id', function(req, res) {
    Task.remove({
        _id : req.params.task_id
    }, function(err, task) {
        if (err){
            res.send(err);
        }

        Task.find(function(err, tasks) {
            if (err){
                res.send(err);
            }
            res.json(tasks);
        });
    });
});

// application ===================
app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
});

// listen ========================
app.listen(process.env.PORT || 8081);
console.log("Magic happens on port 8081 or other...");
