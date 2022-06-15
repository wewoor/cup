const chalk = require('chalk')

// Orange color
const warningStyle = chalk.hex('#FFA500')

function println (...msg) {
    console.log(...msg, '\n')
}

/**
 * Error log
 * @param  {[type]} msg [description]
 * @return {[type]}     [description]
 */
function error (...msg) {
    println(chalk.red(...msg))
}

/**
 * Warning log
 * @param  {[type]} msg [description]
 * @return {[type]}     [description]
 */
function warning (...msg) {
    println(warningStyle(...msg))
}

/**
 * Info log
 * @param  {[type]} msg [description]
 * @return {[type]}     [description]
 */
function info (...msg) {
    println(chalk.blue(...msg))
}

exports.default = {
    println,
    error,
    warning,
    info
}
