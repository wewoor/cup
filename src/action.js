var server = require("./server");
var exec = require('child_process').exec;

module.exports = {

    runPath: function(path) {
        var dir = `${process.env.PWD}/${path}` || __dirname;
        server.runPath(dir)
    },

    stopServer: function(id) {
        console.log("stop a server:", id);
    },

    stopAll: function(env) {
        console.log("stop all server:", env);
    },

    restart: function(id) {
        console.log("restart a server:", id);
    },

    runConfig: function() {
        console.log("run by config.", process.env.PWD);
        var cupConfig = require(`${process.env.PWD}/config.cup.json`)
        server.runConfig(cupConfig)
    },

    version: function(version) {
        console.log("show version.", config);
    },

    list: function(list) {
        console.log("list all .", list);
    }
}