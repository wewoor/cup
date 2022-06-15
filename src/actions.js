const exec = require('child_process').exec

const { getAppByConfig, getApp } = require('./express/app')
const { SERVER_LISTEN_CONFIG } = require('./constants')
const { println, info } = require('./logger').default

function printServeInfo (port, path) {
    println('The server is running at:')
    info(`http://localhost:${port}`)
    println('The static resources directory at:')
    info(`${path}`)
}

function getCupConfig (path) {
    const configPath = path ||
    `${process.cwd()}/cup.config.js` ||
    `${process.cwd()}/cup.config.json`
    return require(configPath)
}

function run (app, port) {
    app.listen(port, function () {
        exec(`open http://localhost:${port}`)
        println('Use ctrl + c exit the Server. More helps,', 'use cup -h.')
    })
}

function runByConfig (path) {
    const cupConfig = getCupConfig(path)
    printServeInfo(cupConfig.listen, cupConfig.root)

    const app = getAppByConfig(cupConfig)
    run(app, cupConfig.listen, cupConfig.root)
}

function runByPath (path, options) {
    const workingPath = process.cwd()
    const dir = path || workingPath
    const port = options.port || SERVER_LISTEN_CONFIG.port
    const app = getApp(dir, port)

    printServeInfo(port, path)

    run(app, port, path)
}

exports.default = {
    run,
    runByConfig,
    runByPath
}
