var Q = require("q");

var openrest = require("./lib/openrest4js-client-1.1.1.js");

var apiUrl = null;

var _requests = {};
var _monitor = 0;

module.exports = {
    request:function(params) {
        var _client = new openrest.Client({apiUrl:(apiUrl || "https://spice-prod.appspot.com/v1.1")});

        var request = params.request;
        var callback = params.callback;
        var client = params.client || _client;

        var defer = Q.defer();
        var startTime = (new Date()).getTime();
        _requests[request.type] = _requests[request.type] || [];

        client.request({
            request:request,
            callback:function(e) {
                var t = (new Date()).getTime() - startTime;
                _monitor++; // Monitor only first 100 transactions
                if (e.error) {
                    if (_monitor < 100) _requests[request.type].push({'s':false, 't':t});
                    defer.reject(e);
                } else {
                    if (_monitor < 100) _requests[request.type].push({'s':true, 't':t});
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
    },
    getPerformance:function() {
        return _requests;
    }
}
