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
var openrest = {}; openrest.Client=openrest.Client||function(g){return function(d){var d=d||{},e=d.apiUrl||"https://api.openrest.com/v1.1",f=d.accessToken||null,d={},a=new openrest.Protocol;d.getAccessToken=function(){return f};d.setAccessToken=function(a){f=a};d.getMyRoles=function(b){var c=new openrest.QueryStringBuilder(b.params);c.append("access_token",f);a.get({url:e+"/me/roles/"+c.toString(),callback:b.callback})};d.getMeInfo=function(b){var c=new openrest.QueryStringBuilder(b.params);c.append("access_token", f);a.get({url:e+"/me/info"+c.toString(),callback:b.callback})};d.setMeInfo=function(b){var c=new openrest.QueryStringBuilder(b.params);c.append("access_token",f);a.set({url:e+"/me/info"+c.toString(),obj:b.obj,callback:b.callback})};d.getMePayments=function(b){var c=new openrest.QueryStringBuilder(b.params);c.append("access_token",f);a.get({url:e+"/me/payments/"+c.toString(),callback:b.callback})};d.deletePayment=function(b){var c=new openrest.QueryStringBuilder(b.params);c.append("access_token",f); a.remove({url:e+"/me/payments/"+b.id+c.toString(),callback:b.callback})};d.getOrders=function(b){var c=new openrest.QueryStringBuilder(b.params);c.append("access_token",f);a.get({url:e+"/orders/"+c.toString(),callback:b.callback})};d.getOrderHtmlUrl=function(a){var c=new openrest.QueryStringBuilder(a.params);c.append("access_token",f);return e+"/orders/"+a.id+c.toString()};d.getRestaurants=function(b){var c=new openrest.QueryStringBuilder(b.params);a.get({url:e+"/restaurants/"+c.toString(),callback:b.callback})}; d.search=function(b){var c=new openrest.QueryStringBuilder(b.params);a.get({url:e+"/search"+c.toString(),callback:b.callback})};d.getRestaurantsFull=function(b){var c=new openrest.QueryStringBuilder(b.params);a.get({url:e+"/restaurants.full/"+c.toString(),callback:b.callback})};d.request=function(b){b=b||{};a.add({url:e,obj:b.request||{},callback:b.callback||function(){}})};return d}(g)};openrest=openrest||{}; openrest.Protocol=openrest.Protocol||function(g){return function(d){var d=d||{},e=d.timeout||6E4,f=d.userAgent||"openrest4js (gzip)";return{get:function(a){var a=a||{},b=a.url,c=a.callback||function(){},a=http.create({onload:function(){c(parse(this.responseText))},onerror:function(){c({error:"protocol",errorMessage:"protocol error"})},timeout:e});a.open("GET",b);a.setUserAgent(f);a.setRequestHeader("Accept","application/json");a.send()},set:function(a){var a=a||{},b=a.url,c=a.obj,d=a.callback|| function(){},a=http.create({onload:function(){d(parse(this.responseText))},onerror:function(){d({error:"protocol",errorMessage:"protocol error"})},timeout:e});a.open("PUT",b);a.setUserAgent(f);a.setRequestHeader("Accept","application/json");a.setRequestHeader("Content-Type","application/json");a.send(JSON.stringify(c))},add:function(a){var a=a||{},b=a.url,c=a.obj,d=a.callback||function(){},a=http.create({onload:function(){d(parse(this.responseText))},onerror:function(){d({error:"protocol", errorMessage:"protocol error"})},timeout:e});a.open("POST",b);a.setUserAgent(f);a.setRequestHeader("Accept","application/json");a.setRequestHeader("Content-Type","application/json");a.send(JSON.stringify(c))},remove:function(a){var a=a||{},b=a.url,c=a.callback||function(){},a=http.create({onload:function(){c(parse(this.responseText))},onerror:function(){c({error:"protocol",errorMessage:"protocol error"})},timeout:e});a.open("DELETE",b);a.setUserAgent(f);a.setRequestHeader("Accept","application/json"); a.send()}}}(g)};openrest=openrest||{};openrest.QueryStringBuilder=openrest.QueryStringBuilder||function(g){return function(d){var e={},f="";e.append=function(a,c){"undefined"===typeof a||("undefined"===typeof c||null===c)||(f+=(0===f.length?"?":"&")+encodeURIComponent(a)+"="+encodeURIComponent(c))};if(d)for(var a in d)e.append(a,d[a]);e.toString=function(){return f};return e}(g)}; 
// openrest4js-client-1.1.1.js

module.exports = openrest;
