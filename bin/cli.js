#!/usr/bin/env node

process.title = "cup";
var package = require('../package.json');
var program = require('commander');
var actions = require('../src/action');
var console = require('../src/console');

try {
    program.version(package.version)
    .usage('cup [option]')

    program
    .command('run [path]')
    .option('-p, --port [port]', 'custom server port number')
    .description('use current path to run a server application')
    .action(actions.runPath)

    program
    .command('config [path]')
    .description('use indicated config to run the server')
    .action(actions.runConfig)

    program.on('--help', function() {
        console.info(' Examples:');
        console.info('');
        console.info('$ cup --help');
        console.info('$ cup -h');
        console.info('');
    });

    program.parse(process.argv);

} catch(e) {
    console.error("Exec error." + e);
}
