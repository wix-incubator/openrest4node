var Q = require("q");

var openrest = require("./lib/openrest4js-client-1.1.1.js");

var apiUrl = null;

module.exports = {
    request:function(params) {
        var _client = new openrest.Client({apiUrl:(apiUrl || "https://spice-prod.appspot.com/v1.1")});

        var request = params.request;
        var callback = params.callback;
        var client = params.client || _client;

        var defer = Q.defer();

        client.request({
            request:request,
            callback:function(e) {
                if (e.error) {
                    defer.reject(e);
                } else {
                    defer.resolve(e);
                }

                if (callback) {
                    callback(e);
                }
            }
        });

        return defer.promise;
    },
    setApiUrl:function(val) {
        apiUrl = val;
    }
}
