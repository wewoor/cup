var server = require("./server");
var exec = require('child_process').exec;

module.exports = {

    runPath: function(path) {
        var dir = `${process.env.PWD}/${path}` || __dirname;
        server.runPath(dir)
    },

    runConfig: function() {
        var cupConfig = require(`${process.env.PWD}/config.cup.json`)
        server.runConfig(cupConfig)
    },
}