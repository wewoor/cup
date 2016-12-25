

var server = require("./server");
var exec = require('child_process').exec;

module.exports = {

    runServer: function(env) {
        console.log("run default server:", env);
        console.log("path:", __dirname); // or __filename

        var dir = (process.argv)[2] || '__dirname';
        console.log("current dir", dir)
        exec('./server ' + dir)
        // var child = require('child_process').exec('server.js');
        // exec("node .exit", (err) => {
        //     console.log(err);
        // })
        // process.exit(1);
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

    runConfig: function(config) {
        console.log("run by config.", config);
    },

    runByPath: function(path) {
        console.log("run by path.", config);
    },

    runByPath: function(path) {
        console.log("run by path.", config);
    },

    version: function(version) {
        console.log("show version.", config);
    },

    list: function(list) {
        console.log("list all .", list);
    }
}