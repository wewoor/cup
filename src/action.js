var server = require("./run");
var exec = require('child_process').exec;

module.exports = {

    runPath: function(path, options) {
        console.log('im run path', options.port)
        var dir =  path ? `${process.env.PWD}/${path}` : __dirname;
        server.runPath(dir, options.port)
    },

    runConfig: function(path) {
        console.log('im run config')
        path = path || `${process.env.PWD}/config.cup.json`
        var cupConfig = require(path)
        server.runConfig(cupConfig)
    },
}