#!/usr/bin/env node

process.title = 'cup'

const program = require('commander')

const packageInfo = require('../package.json')
const { runByPath, runByConfig } = require('../src/actions').default

try {
    program
        .name('cup')
        .description(packageInfo.description)
        .version(packageInfo.version)

    program
        .command('run')
        .description('startup the Express server by the directory or cup.config.js you specified.')
        .arguments('[path]', 'required the root path of the server.')
        .option('-p, --port <port>', 'use custom server port. default is 3000.')
        .option('-c, --config', 'use cup.config.js or cup.config.json to startup the server.')
        .action((path, options) => {
            if (path) {
                runByPath(path, options)
            } else if (options.config) {
                runByConfig(path)
            }
        })

    program.on('--help', function () {
        console.log('\nExamples:')
        console.log('  $ cup run --help')
        console.log('  $ cup run -h')
    })

    program.parse(process.argv)
} catch (e) {
    console.error('Exec error.' + e)
}
