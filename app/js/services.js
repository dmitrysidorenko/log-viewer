'use strict';

/* Services */

var cashBalanceServices = angular.module('logServices', []);

cashBalanceServices.factory('BalanceLine', function ($http) {
    var factory = {};

    factory.getAll = function(){
        return $http.get('/api/log');
    }.bind(factory);

    factory.getAllByCategory = function(categoryId){
        return $http.get('/api/balanceline?categoryId=' + categoryId);
    }.bind(factory);

    factory.save = function(bl){
        return $http.post('/api/balanceline', bl);
    }.bind(factory);

    return factory;
});


cashBalanceServices.factory('Category', function ($http) {
    var factory = {};

    factory.getAll = function(){
        return $http.get('/api/category');
    }.bind(factory);

    return factory;
});