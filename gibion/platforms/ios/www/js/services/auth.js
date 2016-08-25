(function () {
    'use strict';

    angular
        .module('service.auth', [])
        .service('auth', ['$window', function ($window) {
            return {
                saveToken: saveToken,
                getToken: getToken,
                getUser: getUser,
                checkUser: checkUser,
                isAuthed: isAuthed
            };

            function parseJwt(token) {
                if (token) {
                    var base64Url = token.split('.')[1];
                    var base64 = base64Url.replace('-', '+').replace('_', '/');
                    return JSON.parse($window.atob(base64));
                }
                return false;
            }

            function saveToken(token) {
                $window.localStorage['giblib-jwt'] = token;
            }

            function getToken() {
                return $window.localStorage['giblib-jwt'];
            }

            function getUser() {
                return parseJwt(getToken());
            }

            function checkUser() {
                var messages = [];
                var user = getUser();
                if (user.activate) {
                    messages.push("Please activate");
                }
            }

            function isAuthed() {
                var token = getToken();
                if (token) {
                    var params = parseJwt(token);
                    if (Math.round(new Date().getTime() / 1000) <= params.exp && params.active) {
                        return true;
                    }
                    $window.localStorage.removeItem('giblib-jwt');
                    return false;
                } else {
                    return false;
                }
            }
        }]);
})();
