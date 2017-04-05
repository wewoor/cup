var server = require("./run");
var chalk = require('chalk');

module.exports = {

    runPath: function(path, options) {
        var currentWorkPath = process.cwd();
        var dir =  path ? path : currentWorkPath;
        server.runPath(dir, options.port)
    },

    runConfig: function(path) {
        // TODO Backward Compatibile
        path = path || `${process.cwd()}/cup.config.js` || 
        `${process.cwd()}/config.cup.js` || 
        `${process.cwd()}/cup.config.json` ||
        `${process.cwd()}/config.cup.json`;
        var cupConfig = require(path)
        console.log('Current app is running by your custom cofig:\n\n', chalk.blue(`${path} \n`))
        server.runConfig(cupConfig)
    },
}