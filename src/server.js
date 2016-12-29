var express = require('express');
var proxy = require('express-http-proxy');
var app = express();
var console = require('./console');
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

    /**
     * 添加请求路径解析
     * @param  {[type]} proxyObj [description]
     * @return {[type]}          [description]
     */
    parseLocation(location) {
        console.info(`curent: ${process.env.PWD}`)
        if (location) {
            var paths = Object.getOwnPropertyNames(location)
            for (var i in paths) {
                console.info(`Cup have added parse for location: ${paths[i]} \n target: ${location[paths[i]]}`)
                app.get(paths[i], (req, res) => {
                    res.sendFile(`${process.env.PWD}/${location[paths[i]]}`);
                });
            }
        }
    },

    /**
     * 添加代理解析
     * @param  {[type]} proxyObj [description]
     * @return {[type]}          [description]
     */
    parseProxy(proxyObj) {
        if (proxyObj) {
            var paths = Object.getOwnPropertyNames(proxyObj)
            for (var i in paths) {
                console.info(`Cup have added proxy for path: ${paths[i]} \n target: ${proxyObj[paths[i]]}`)
                app.get(paths[i], proxy(proxyObj[paths[i]], {
                    https: true
                }));
            }
        }
    },
}