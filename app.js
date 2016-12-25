#!/usr/bin/env node

/**
 * https://github.com/tj/commander.js/
 */

var package = require('./package.json');
var program = require('commander');
var actions = require('./src/action');
var console = require('./src/console');

try {

    program.version(package.version)
    .usage('cup [option]')

    .option('-c, --config', 'use indicated config to run the server', actions.runConfig)
    .option('-v, --version', 'show version number')

    program
    .command('run [path]')
    .description('use current path to run a server application')
    .action(actions.runPath)

    program.on('--help', function() {
        console.log(' Examples:');
        console.log('');
        console.log('$ cup --help');
        console.log('$ cup -h');
        console.log('');
    });

    program.parse(process.argv);

} catch(e) {
    console.error("Exec error." + e);
}
