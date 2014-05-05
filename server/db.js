var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/logViewer");
var db = mongoose.connection;
db.on('error', function (err) {
    console.error('connection error:', err.message);
});

db.once('open', function callback () {
    console.info("Connected to DB!");
});
var Schema = mongoose.Schema;

/*
 {
 datetime: new Date(),
 ip: i+1,
 userAgent: userAgents[getRandomInt(0, userAgents.length - 1)],
 url: urls[getRandomInt(0, urls.length - 1)],
 statusCode: statusCodes[getRandomInt(0, statusCodes.length - 1)],
 generationTime: getRandomInt(0, 59) + '.' + getRandomInt(0, 59),
 size: getRandomInt(100, 1000)
 }
* */
var LogLine = new Schema({
    ip: {
        type: String,
        unique: false,
        required: true
    },
    datetime: {
        type: Date,
        default: Date.now
    },
    userAgent: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    statusCode: {
        type: Number,
        default: 200
    },
    generationTime: {
        type: Number,
        default: 0.1
    },
    size: {
        type: Number,
        default: 1
    }
});

var LogLineModel = mongoose.model('LogLine', LogLine);


module.exports.mongoose = mongoose;
module.exports.LogLineModel = LogLineModel;
