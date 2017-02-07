var express = require('express');
var proxy = require('http-proxy-middleware');

var app = express();
var log = console.log;
var chalk = require('chalk');
var moreInfo = "More information please view: https://github.com/wewoor/cup"

var logErrors = function(err, req, res, next) {
    console.error(err.stack)
    next(err)
}

module.exports = {

    setApp: function(path, listen) {
        app.use(express.static(path));
        app.use(logErrors);
        return app;
    },

    getByConfig: function(config) {
        if (!config) {
            throw new Error("You haven't set config file. ")
            return false
        }
        if (!config.root) {
            throw new Error("You haven't set static file path." + moreInfo)
        }
        if (!config.listen) {
            throw new Error("You haven't set the listen port." + moreInfo)
            return false
        }

        this.parseLocation(config.location)
        this.parseProxy(config.proxyTable)
        return this.setApp(config.root, config.listen)
    },

    getNoConfig: function(path, port) {
        if (!path) {
            throw new Error("You haven't set static file path.")
        }
        port = port || defaultConf.server.listen
        return this.setApp(path, port)
    },

    parseLocation(location) {
        if (location) {
            var paths = Object.getOwnPropertyNames(location)
            if (paths.length > 0) {
                log(chalk.yellow('Cup parsing location:\n'))
                for (var i in paths) {
                    log(chalk.blue(` ${paths[i]} : ${location[paths[i]]}`))
                    app.get(paths[i], (req, res) => {
                        res.sendFile(`${process.env.PWD}/${location[paths[i]]}`);
                    });
                }
                log('\n')
            }
        }
    },

    parseProxy(proxyObj) {
        if (proxyObj) {
            var paths = Object.getOwnPropertyNames(proxyObj)
            var options = {
                preserveHostHdr: true,
                reqAsBuffer: true
            }
            if (paths.length > 0) {
                log(chalk.yellow('Cup added proxy:\n'))
                for (var i in paths) {
                    log(chalk.blue(` ${paths[i]} : ${proxyObj[paths[i]].target}`))
                    app.use(paths[i], proxy(proxyObj[paths[i]]));
                }
                log('\n')
            }
        }
    },
}