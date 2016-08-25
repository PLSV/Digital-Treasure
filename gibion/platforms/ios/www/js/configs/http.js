(function () {
    'use strict';

    angular
        .module('config.http', [])
        .config(['$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push('authInterceptor');
        }]);
})();