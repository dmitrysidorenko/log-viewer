/**
 * Created by Dmitriy on 20.04.14.
 */
var express = require('express');
var path = require('path');

var app = express();
var router = express.Router();

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
    var page = req.query['page'] || 0;
    var pageSize = req.query['pageSize'] || 50;
    res.send([
        {
            datetime: new Date(),
            ip: 1,
            userAgent: "Chrome",
            url: "http://some-site.com",
            statusCode: 200,
            generationTime: '10.34',
            size: 123
        },
        {
            datetime: new Date(),
            ip: 1,
            userAgent: "Chrome",
            url: "http://some-site.com",
            statusCode: 200,
            generationTime: '10.34',
            size: 123
        },
        {
            datetime: new Date(),
            ip: 1,
            userAgent: "Chrome",
            url: "http://asome-site.com",
            statusCode: 200,
            generationTime: '10.34',
            size: 123
        },
        {
            datetime: new Date(),
            ip: 1,
            userAgent: "Chrome",
            url: "http://some-site.com",
            statusCode: 500,
            generationTime: '10.34',
            size: 123
        },
        {
            datetime: new Date(),
            ip: 1,
            userAgent: "Chrome",
            url: "http://some-site.com",
            statusCode: 200,
            generationTime: '10.34',
            size: 123
        },
    ]);
});

//run
app.listen(8080, function () {
    console.info('Express server listening on port ' + 8080);
});