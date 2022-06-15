#!/usr/bin/env node

process.title = 'cup'

const program = require('commander')

const packageInfo = require('../package.json')
const logger = require('../src/logger').default
const { runByPath, runByConfig } = require('../src/actions').default

try {
    program
        .name('cup')
        .description(packageInfo.description)
        .version(packageInfo.version)

    program
        .command('serve')
        .description('startup the server and serve the path you specified.')
        .arguments('[path]', 'required the root path of the server.')
        .option('-p, --port <port>', 'use custom server port. default is 3000.')
        .option('-c, --config', 'use cup.config.js or cup.config.json to startup the server.')
        .action((path, options) => {
            if (path) {
                runByPath(path, options)
            } else {
                runByConfig(path)
            }
        })

    program.on('--help', function () {
        logger.info('\nExamples:')
        logger.info('$ cup --help')
        logger.info('$ cup -h')
    })

    program.parse(process.argv)
} catch (e) {
    logger.error('Exec error.' + e)
}
