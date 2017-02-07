var server = require("./run");
var chalk = require('chalk');

module.exports = {

    runPath: function(path, options) {
        var dir =  path ? `${process.env.PWD}/${path}` : process.env.PWD;
        server.runPath(dir, options.port)
    },

    runConfig: function(path) {
        path = path || `${process.env.PWD}/config.cup.json`
        var cupConfig = require(path)
        console.log('Current app is running by your custom cofig:\n\n', chalk.blue(`${path} \n`))
        // console.log(chalk.blue(`${path} \n`))
        server.runConfig(cupConfig)
    },
}