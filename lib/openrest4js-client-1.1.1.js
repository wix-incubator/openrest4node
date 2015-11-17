var http = http || {};

http.Factory = http.Factory || (function() {
    var self = {};
    
    self.create = function(params) {
        params = params || {};
        var timeout = params.timeout || 60000;
        var onload = params.onload || function(e){};
        var onerror = params.onerror || function(e){};
        var onprogress = params.onprogress || function(e){};
        var ontimeout = params.ontimeout || function(e){};
        
        // All other modern browsers
        var xhr = new XMLHttpRequest();
        
        xhr.onload = onload;
        xhr.onerror = onerror;
        xhr.onprogress = onprogress;
        xhr.ontimeout = ontimeout;
        
        xhr.setUserAgent = function(userAgent){};
        
        /**
         * IE10 throws InvalidStateError when timeout is set before open.
         * @see https://github.com/google/tracing-framework/issues/407
         */
        var _open = xhr.open;
        xhr.open = function() {
            var result = _open.apply(xhr, arguments);
            xhr.timeout = timeout;
            return result;
        };
        
        return xhr;
    };

    return self;
}());

// Syntactic sugar
http.create = http.create || http.Factory.create;

XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest; // npm install xmlhttprequest - Used with http-1.0.1.js

var parse = function(str) {
    try {
        return JSON.parse(str);
    } catch(e) {
        return {error:"protocol",errorMessage:"protocol error"};
    }
}

// openrest4js-client-1.1.1.js
var openrest = {};

openrest.Protocol = openrest.Protocol || function(params) { return (function(params) {
    params = params || {};
    var timeout = params.timeout || 60000;
    var userAgent = params.userAgent || "openrest4js (gzip)"; // required to enable AppEngine gzip compression on Titanium
    
    var self = {};
    
    self.add = function(params) {
        params = params || {};
        var url = params.url;
        var obj = params.obj;
        var callback = params.callback || function(e){};
        
        var client = http.create({
            onload : function(e) {
                callback(parse(client.responseText));
            },
            onerror : function(e) {
                callback({
                    error : "protocol",
                    errorMessage : "protocol error"
                });
            },
            timeout : timeout
        });
    
        client.open("POST", url);
        client.setUserAgent(userAgent);
        client.setRequestHeader("Accept", "application/json");
        client.setRequestHeader("Content-Type", "application/json");

        client.send(JSON.stringify(obj));
    };
    
    return self;
}(params))};

openrest.Client = openrest.Client || function(params) { return (function(params) {
    params = params || {};
    var apiUrl = params.apiUrl || "https://api.openrest.com/v1.1";
    var accessToken = params.accessToken || null;
    
    var self = {};
    
    var protocol = new openrest.Protocol();
    
    self.request = function(params) {
        params = params || {};
        var request = params.request || {};
        var callback = params.callback || function(e){};
        
        protocol.add({
            url : apiUrl,
            obj : request,
            callback : callback
        });
    };
    
    return self;
}(params))};

module.exports = openrest;
