/*
 * restfactory.js v0.0.1
 * https://github.com/chenkuochen/restfactory.js
 *
 * Copyright 2014 Chen-Kuo Chen
 * Released under the MIT license
 *
 * !Now restfactory.js depends on easyajax.js.
 * URL layout:
 *   => Tailing trash is designed for integration with Django Restframework.
 * list         /api/resources/        GET
 * retrieve     /api/resources/id/     GET
 * create       /api/resources/        POST with params
 * destroy      /api/resources/id/     DELETE
 * update       /api/resources/id/     PUT/PATCH
 *
 * */

//var easyAjax = require('../bower_components/easyajax/main/easyajax.js'); 
var restFactory = (function(){
    var _apiURL;
    var _resource;
    function resourceList(onSuccess, onFailure){ 
        easyAjax.ajax({
            method: 'GET',
            url: _apiURL + '/' + _resource + '/',
            success: onSuccess,
            failure: onFailure 
        });
    }
    function resourceRetrieve(id, onSuccess, onFailure){ 
        easyAjax.ajax({
            method: 'GET',
            url: _apiURL + '/' + _resource + '/' + id + '/',
            success: onSuccess,
            failure: onFailure 
        });
    }
    function resourceCreate(params, extraHeaders, onSuccess, onFailure){ 
        easyAjax.ajax({
            method: 'POST',
            url: _apiURL + '/' + _resource + '/',
            params: params,
            headers: extraHeaders,
            success: onSuccess,
            failure: onFailure 
        });
    }
    function resourceDestroy(id, extraHeaders,  onSuccess, onFailure){ 
        easyAjax.ajax({
            method: 'DELETE',
            url: _apiURL + '/' + _resource + '/' + id + '/',
            headers: extraHeaders,
            success: onSuccess,
            failure: onFailure 
        });
    }
    function resourceUpdate(id, params, extraHeaders, isPartial, onSuccess, onFailure){ 
        easyAjax.ajax({
            method: isPartial?'PATCH':'PUT',
            url: _apiURL + '/' + _resource + '/' + id + '/',
            params: params,
            headers: extraHeaders,
            success: onSuccess,
            failure: onFailure 
        });
    }

    function createRestObject(apiURL, resource){
        if (!(/^http:.*/.test(apiURL)) && !(/^https:.*/.test(apiURL))) {
            return;
        }
        _apiURL = apiURL;
        _resource = resource;
        return {
            list : resourceList,
            retrieve : resourceRetrieve,
            create : resourceCreate,
            destroy : resourceDestroy,
            update : resourceUpdate
        };
    }
    return {
        factory : createRestObject
    };
}());
//module.exports = restFactory;
