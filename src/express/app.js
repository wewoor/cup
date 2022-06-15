const express = require('express')
const proxy = require('http-proxy-middleware')
const compression = require('compression')
const morgan = require('morgan')

const { INFO, SERVER_LISTEN_CONFIG } = require('../constants')
const { info, warning, println } = require('../logger').default

const app = express()

const reqHandler = function (target) {
    return function (req, res) {
        info(`${req.method} > ${req.url}`)
        res.sendFile(target)
    }
}

const logErrors = function (err, req, res, next) {
    console.error(err.stack)
    next(err)
}

function initialize (path) {
    app.use(morgan('combined'))
    app.use(compression())
    app.use(express.static(path))
    app.use(logErrors)
}

function parseLocation (location) {
    if (location) {
        const paths = Object.getOwnPropertyNames(location)
        if (paths.length > 0) {
            for (let i = 0; i < paths.length; i++) {
                const url = paths[i]
                const target = `${process.env.PWD}/${location[url]}`
                info(`${url} -> ${location[url]}`)
                app.get(url, reqHandler(target))
                app.post(url, reqHandler(target))
            }
        }
    }
}

function parseProxy (proxyObj) {
    if (proxyObj) {
        const paths = Object.getOwnPropertyNames(proxyObj)
        if (paths.length > 0) {
            // warning('Cup added proxy:')
            for (const i in paths) {
                app.use(paths[i], proxy(proxyObj[paths[i]]))
            }
        }
        println('')
    }
}

function getAppByConfig (config) {
    if (!config) {
        throw new Error("You haven't set config file." + INFO)
    }
    if (!config.root) {
        throw new Error("You haven't set static file path." + INFO)
    }
    if (!config.listen) {
        throw new Error("You haven't set the listen port." + INFO)
    }
    warning('Cup parsing the config:')

    parseLocation(config.location)
    parseProxy(config.proxyTable)

    initialize(config.root, config.listen)

    return app
}

function getApp (path, port) {
    if (!path) {
        throw new Error("You haven't set static file path.")
    }
    port = port || SERVER_LISTEN_CONFIG.server.listen
    initialize(path, port)
    return app
}

exports.getApp = getApp
exports.getAppByConfig = getAppByConfig
