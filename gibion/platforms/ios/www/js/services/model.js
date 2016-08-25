(function () {
    'use strict';

    angular
        .module('service.model', [])
        .service('model', ['$http', 'API', function ($http, API) {
            return {
                get: get,
                post: post,
                delete: del
            };

            function get(model, field, value) {
                if (!field) {
                    field = '';
                }
                if (!value) {
                    value = '';
                }
                if (field) {
                    field = field.toString().replace(/,/g , "&");
                    return $http.get('https://www.giblib.com' + API + '/' + model + '/' + field + (field ? ('/' + value) : ('')));
                }
                return $http.get('https://www.giblib.com' + API + '/' + model);
            }

            function post(model, postdata) {
                return $http.post('https://www.giblib.com' + API + '/' + model, postdata);
            }

            function del(model, id) {
                return $http.delete('https://www.giblib.com' + API + '/' + model + '/' + id);
            }
        }]);
})();
