/**
 * Created by Dmitriy on 20.04.14.
 */
var express = require('express');
var path = require('path');

var app = express();
var router = express.Router();

var db = require("./db");

app.use(require('body-parser')());
app.use(require('method-override')());

app.use(express.static(path.join(__dirname, '../app')));
app.use(express.static(path.join(__dirname, '../bower_components')));

app.use(router);

router.get('/', function (req, res) {
    res.sendfile(path.join(__dirname, '../app/index.html'));
});

//api
//(date/time. ip, user-agent, url, status-code, generation-time, size)
router.get('/api/log', function (req, res) {
    var page = +req.query['pageNumber'] || 0;
    var pageSize = +req.query['pageSize'] || 50;
    var sortInfo = req.query['sortInfo'] ? req.query['sortInfo'].split(/(\+|-)/) : [];

    var sortDir = sortInfo[1] || '+';
    var sortField = sortInfo[2];


    console.log(sortDir, sortField);

    var isAsc = sortDir === '+';
    var from = (page - 1) * pageSize;
    var to = ((page - 1)  * pageSize) + pageSize;
    var sort = {};
    sort[sortField] = isAsc ? 1 : -1;

    db.LogLineModel.find().sort(sort).skip(from).limit(to).exec(function(err, items){
       if(!err){
           db.LogLineModel.count(function(err, count){
               if(err){
                   return;
               }
               res.send({
                   totalItems:count,
                   items: items
               });
           });
       }
    });
});

//run
app.listen(8080, function () {
    console.info('Express server listening on port ' + 8080);
});