/**
 * http.js
 *
 * @description: Http请求工具，封装了get,post,delete,put四种请求
 *
 * @author: Ziv
 */

module.exports = {

    /**
     * get request method
     * @param  {[type]} url
     * @param  {String} res
     * @return {[object]}
     */
    get: function(options) {
        options.method = 'GET';
        return this.request(options);
    },

    /**
     * post request method
     * @param  {[type]} url
     * @param  {[type]} data
     * @return {[object]}
     */
    post: function(options) {
        options.method = 'POST';
        return this.request(options);
    },

    /**
     * put request method
     * @param  {[type]} url
     * @param  {[type]} data
     * @return {[object]}
     */
    put: function(options) {
        options.method = 'PUT';
        return this.request(options);
    },

    /**
     * delete request method
     * @param  {[type]} url
     * @return {[object]}
     */
    delete: function(options) {
        options.method = 'DELETE';
        return this.request(options); },

    /**
     * request method
     * @param  {[type]} options
     * @return {[object]}
     */
    request: function(options) {

        var Http = require('http');
        var q = require('q');
        var body = '';
        var deferred = q.defer();
        // do request

        var reqtime = Date.now();
        var resStime;
        console.log("options======"+JSON.stringify(options));
        var req = Http.request(options, function(res) {

            console.log("httpUtils URL:"+options.host + ":" + options.port + options.path);
            console.log('STATUS: ' + res.statusCode);
            resStime = Date.now();
            var resdelay = resStime - reqtime;
            if (resdelay > 1e4) {
              console.log('start res delay ====== ' + resdelay + 'ms');
            }else if (resdelay > 1e3) {
              console.log('start res delay ====== ' + resdelay + 'ms');
            }
            res.setEncoding('utf8');
            // response data
            res.on('data', function(chunk) {
                body += chunk;
            }).on('end', function() { // req end
              var restime = Date.now() - resStime;
              if (restime > 1e4) {
                console.log('end res delay ====== ' + restime + 'ms');
              }else if (restime > 1e3) {
                console.log('end res delay ====== ' + restime + 'ms');
              }
                var resData = {};
                try {
                    if (body !== "") resData = body;
                    deferred.resolve(resData);
                } catch (e) {
                    deferred.resolve({
                        status: res.statusCode,
                        message: '服务器内部错误::' + e
                    });
                    console.log(e+body);
                }
            });

            res.setTimeout(60000, function() { // time out 1 分钟
                deferred.reject({
                    status: 408,
                    message: '服务器请求超时'
                });
            });
        }).on('error', function(e) { // req error
            deferred.reject({
                status: 500,
                message: '服务器请求出错'
            });
        });

        // write request body data
        if (options.data) req.write(options.data);
        req.end();
        return deferred.promise;
    },

    /**
     * build request url
     * @param  {[type]} url
     * @param  {[type]} params
     * @return {[type]}
     */
    buildPath: function(url, params) {
        var ps = [];
        for (var p in params) {
            ps.push(p + '=' + encodeURIComponent(params[p]));
        }

        var str = ps.join('&');
        return url + '?' + str;
    }
};
