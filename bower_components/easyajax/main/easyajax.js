/*!
 * easyajax.js v0.0.1
 * https://github.com/chenkuochen/easyajax.js
 *
 * Copyright 2014 Chen-Kuo Chen
 * Released under the MIT license
 */


var easyAjax = (function(){
    var _config;
    function init(config){
        _config = config;
        easyAjax(_config.method, _config.url, _config.params, _config.success, _config.failure);
    }
    function easyAjax(method, url, params, success, failure){ //only deal with json
        var httpRequest;
        if (window.XMLHttpRequest){
            httpRequest = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            try {
                    httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (exception) {
                try {
                    httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (exception2) {}
            }
        }
        if (!httpRequest || (!(/^http:.*/.test(url)) && !(/^https:.*/.test(url)))) {
            console.log(url);
            return false;
        }
        httpRequest.onreadystatechange = function(){
            try {
                if (4 === httpRequest.readyState) {
                    if (200 === httpRequest.status && success) {
                        success(httpRequest.status, JSON.parse(httpRequest.responseText));
                    } else if (failure) {
                        failure(httpRequest.status, JSON.parse(httpRequest.responseText));
                    }
                }
            } catch (exception) {}
        };
        if ('POST' === method || 'PUT' === method || 'PATCH' === method) {
            httpRequest.open(method, url);
            setHeader(httpRequest);
            httpRequest.setRequestHeader('Content-Type', 'application/json');
            httpRequest.send(JSON.stringify(params));
        } else if ('GET' === method) {
            var getParams = "?";
            for (var key in params) {
                getParams += key + '=' + params[key] + '&';
            }
            httpRequest.open(method, url + getParams.substring(0, getParams.length - 1));
            setHeader(httpRequest);
            httpRequest.send();
        } else {
            httpRequest.open(method, url);
            setHeader(httpRequest);
            httpRequest.send();
        }
    }
    function setHeader(xhr){
        for (var key in _config.headers) {
            xhr.setRequestHeader(key, _config.headers[key]);
        }
    }
    return {
        ajax : init
    };
}());
module.exports = easyAjax;
