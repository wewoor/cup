var server = require("./server");
var exec = require('child_process').exec;

module.exports = {

    runPath: function(path, options) {
        var dir =  path ? `${process.env.PWD}/${path}` : __dirname;
        server.runPath(dir, options.port)
    },

    runConfig: function() {
        var cupConfig = require(`${process.env.PWD}/config.cup.json`)
        server.runConfig(cupConfig)
    },
}