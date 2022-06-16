const exec = require('child_process').exec
const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')

const { getAppByConfig, getApp } = require('./express/app')
const { SERVER_LISTEN_CONFIG } = require('./constants')
const logger = require('./logger').default

function getCupConfig (path) {
    const configPath = path ||
    `${process.cwd()}/cup.config.js` ||
    `${process.cwd()}/cup.config.json`
    return require(configPath)
}

function run (app, port) {
    app.listen(port, function () {
        exec(`open http://localhost:${port}`)
        logger.link(`  Visit: http://localhost:${port}`)
        logger.println('Use ctrl + c exit the Server. More helps,', `use ${chalk.cyanBright('cup run -h')}.`)
    })
}

function runByConfig (path) {
    const cupConfig = getCupConfig(path)
    logger.success('\nThe Cup server is successful running by config mode!')

    const app = getAppByConfig(cupConfig)
    run(app, cupConfig.listen, cupConfig.root)
}

function runByPath (path, options) {
    logger.success('\nThe Cup server is successful running by the specified path!')

    const workingPath = process.cwd()
    const dir = path || workingPath
    const port = options.port || SERVER_LISTEN_CONFIG.port
    const app = getApp(dir, port)

    run(app, port, path)
}

function initializeCupConfig () {
    const workingPath = process.cwd()
    fs.copy(path.resolve(__dirname, './template/cup.config.js'), workingPath + '/cup.config.js')
        .then(() => {
            logger.success(`Initialize the cup.config.js to ${workingPath} successful!`)
        })
        .catch(err => console.error(err))
}

exports.default = {
    run,
    runByConfig,
    runByPath,
    initializeCupConfig
}
