(function () {
    'use strict';

    angular
        .module('factory.authinterceptor', [])
        .factory('authInterceptor', ['API', 'auth', function (API, auth) {
            return {
                request: request,
                response: response
            };

            function request(config) {
                var token = auth.getToken();
                if (token) {
                    config.headers['x-access-token'] = token;
                }
                return config;
            }

            function response(res) {
                if (res.data.token) {
                    auth.saveToken(res.data.token);
                }
                return res;
            }
        }]);
})();
