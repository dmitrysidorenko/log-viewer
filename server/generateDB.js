var db = require("./db");
/**
 * Returns a random number between min and max
 */
function getRandomArbitary (min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min and max
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var log = console;

var data = [];
var userAgents = [
    'Android-x86-1.6-r2 — Mozilla/5.0 (Linux; U; Android 1.6; en-us; eeepc Build/Donut) AppleWebKit/528.5+ (KHTML, like Gecko) Version/3.1.2 Mobile Safari/525.20.1',
    'Samsung Galaxy S — Mozilla/5.0 (Linux; U; Android 2.1-update1; ru-ru; GT-I9000 Build/ECLAIR) AppleWebKit/530.17 (KHTML, like Gecko) Version/4.0 Mobile Safari/530.17',
    'Samsung Galaxy S Android 2.2 — Mozilla/5.0 (Linux; U; Android 2.2; ru-ru; GT-I9000 Build/FROYO) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1',
    'Samsung Galaxy Tab 10.1 Android 3.1 — Mozilla/5.0 (Linux; U; Android 3.1; en-us; GT-P7510 Build/HMJ37) AppleWebKit/534.13 (KHTML, like Gecko) Version/4.0 Safari/534.13',
    'HTC Hero с прошивкой 7hero — Mozilla/5.0 (Linux; U; Android 2.1-update1 (7hero-astar9.3); ru-ru; HTC Legend Build/ERE27) AppleWebKit/530.17 (KHTML, like Gecko) Version/4.0 Mobile Safari/530.17'
];

var urls = [
    "http://facebook.com",
    "http://google.com",
    "http://ya.ru",
    "http://some-site.com",
    "http://glory-to-ukraine.com.ua",
    "http://putin-huy.ru",
    "http://wtf.com"
];

var statusCodes = [200, 401, 404, 402, 500];

for(var i = 0; i < 20000; i++){
    var item = new db.LogLineModel({
        datetime: new Date(),
        ip: [getRandomInt(100, 999), getRandomInt(100, 999), getRandomInt(10, 99), getRandomInt(10, 99)].join('.'),
        userAgent: userAgents[getRandomInt(0, userAgents.length - 1)],
        url: urls[getRandomInt(0, urls.length - 1)],
        statusCode: statusCodes[getRandomInt(0, statusCodes.length - 1)],
        generationTime: getRandomArbitary(0.1, 10),
        size: getRandomArbitary(1, 10)
    });
    item.save(function (err) {
        if (!err) {
//            log.info("LogLine is created");
        } else {
//            console.log(err);
        }
    });
}

log.info("Generation is finished!");