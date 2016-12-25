var express = require('express');
var app = express();
var defaultConf = require("./defaultConfig");
var console = require('./console');
var moreInfo = "More information please view: https://github.com/wewoor/cup"

var logErrors = function(err, req, res, next) {
    console.error(err.stack)
    next(err)
}

module.exports = {
    run: function(listen, path) {
        app.use(express.static(path));
        app.use(logErrors);
        var context = this;
        var server = app.listen(listen, function() {
            var host = server.address().address;
            var port = server.address().port;
            context.log(host, port , path)
        });
    },

    runConfig: function(config) {
        if (!config) {
            throw new Error("You haven't set config file. ")
            return false
        }
        if (!config.public) {
            throw new Error("You haven't set static file path." + moreInfo)
        }
        if (!config.listen) {
            throw new Error("You haven't set the listen port." + moreInfo)
            return false
        }
        console.info("The cup configuration is" + JSON.stringify(config))
        this.run(config.listen, config.public)
    },

    runPath: function(path) {
        if (!path) {
            throw new Error("You haven't set static file path.")
        }
        this.run(defaultConf.server.listen, path)
    },

    log: function(host, port , path) {
        console.info(`The server listening at http://${host}:${port}'.`);
        console.info(`The static path is ${path}.`)
    },

}