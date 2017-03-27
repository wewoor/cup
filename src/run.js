var exec = require('child_process').exec;
var defaultConf = require("./defaultConfig");
var chalk = require('chalk');
var log = console.log;
var moreInfo = "More information please view: https://github.com/wewoor/cup"

var logErrors = function(err, req, res, next) {
    console.error(err.stack)
    next(err)
}

module.exports = {

    run: function(app, listen, path) {
        var context = this;
        var server = app.listen(listen, function() {
            var host = server.address().address;
            var port = server.address().port;
            context.log(host, port , path)
            exec(`open http://localhost:${port}`)
        });
    },

    runConfig: function(config) {
        var server = require('./server');
        var app = server.getByConfig(config);
        this.run(app, config.listen, config.root)
    },

    runPath: function(path, listen) {
        var server = require('./server');
        listen = listen || defaultConf.server.listen
        var app = server.getNoConfig(path, listen);
        this.run(app, listen, path)
    },

    log: function(host, port , path) {
        log(`The app is running at: \n\n `, chalk.blue(`http://localhost:${port} \n`));
        log(`The static path is: \n\n `, chalk.blue(`${path}/ \n`));
        log(`Use ctrl + c exit the app.\nGet more helps,`, chalk.blue("use cup -h."))
    },

}