var Q = require("q");

var openrest = require("./lib/openrest4js-client-1.1.1.js");

var _client = new openrest.Client({apiUrl:"https://spice-prod.appspot.com/v1.1"});

exports.request = function(params) {
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
}
