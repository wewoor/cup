const exec = require('child_process').exec
const chalk = require('chalk')

const { getAppByConfig, getApp } = require('./express/app')
const { SERVER_LISTEN_CONFIG } = require('./constants')
const { println, info, success } = require('./logger').default

function getCupConfig (path) {
    const configPath = path ||
    `${process.cwd()}/cup.config.js` ||
    `${process.cwd()}/cup.config.json`
    return require(configPath)
}

function run (app, port) {
    app.listen(port, function () {
        exec(`open http://localhost:${port}`)
        info(`Visit: http://localhost:${port}`)
        println('Use ctrl + c exit the Server. More helps,', `use ${chalk.cyanBright('cup run -h')}.`)
    })
}

function runByConfig (path) {
    const cupConfig = getCupConfig(path)
    success('\nThe server is successful running by config mode!')

    const app = getAppByConfig(cupConfig)
    run(app, cupConfig.listen, cupConfig.root)
}

function runByPath (path, options) {
    success('\nThe server is successful running by the specified path!')

    const workingPath = process.cwd()
    const dir = path || workingPath
    const port = options.port || SERVER_LISTEN_CONFIG.port
    const app = getApp(dir, port)

    run(app, port, path)
}

exports.default = {
    run,
    runByConfig,
    runByPath
}
