// 在线测试页面
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var Http = require('./http');
var config = require("./defaultConfig");

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded

app.use(session({
    secret: 'keyboard cat',
    cookie: {
        maxAge: 60000
    }
}));

console.log("path:", __dirname); // or __filename

var dir = (process.argv)[2] || '__dirname';


app.use(express.static(dir));
var server = app.listen(config.server.listen, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('App listening at http://%s:%s', config.server.name, port);
});


