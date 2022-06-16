/**
 * This is a cup.config.js template file only,
 * More info, please refer to https://github.com/wewoor/cup
 */

const base = './dist'

module.exports = {
    name: 'template',
    listen: 3000,
    root: base,
    location: {
        '/api/json/get': `${base}/get.json`
    },
    proxyTable: { // About Proxy, please refer to https://github.com/chimurai/http-proxy-middleware
        '/api': {
            target: 'https://github.com/api',
            changeOrigin: true
        }
    }
}
