module.exports = {

    /**
     * Error log
     * @param  {[type]} msg [description]
     * @return {[type]}     [description]
     */
    error: function(msg) {
        console.log('\x1b[31m', msg ,'\x1b[39m');
    },

    /**
     * Warning log
     * @param  {[type]} msg [description]
     * @return {[type]}     [description]
     */
    warning: function(msg) {
        console.log('\x1b[33m', msg ,'\x1b[39m');
    },

    /**
     * Info log
     * @param  {[type]} msg [description]
     * @return {[type]}     [description]
     */
    info: function(msg) {
        console.log('\x1b[32m', msg ,'\x1b[39m');
    }
};