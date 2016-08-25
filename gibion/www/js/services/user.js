(function () {
    'use strict';

    angular
        .module('service.user', [])
        .service('user', ['$http', '$window', 'API', '$location', '$q', 'model', 'auth',  function ($http, $window, API, $location, $q, model, auth) {
            return {
                login: initLoginAuth,
                logout: logout,
                register: register,
                favoriteVideos: null,

                getFavorites: function(isDirty)
                {
                    var deferred = $q.defer();
                    var self = this;

                    if(isDirty)
                        this.favoriteVideos = null;

                    if (this.favoriteVideos)
                    {
                        deferred.resolve(self.favoriteVideos);
                    }
                    else
                    {
                        console.log('getting favorite');
                        model.get('favorites', auth.getUser()._id).then(function (res)
                        {
                            var user = res.data;
                            if (user.favorites)
                            {
                               // console.log('setting favotires');
                                self.favoriteVideos = user.favorites;
                            }
                          //  console.log(self.favoriteVideos);
                            deferred.resolve(self.favoriteVideos);
                       });
                    }
                    return deferred.promise;
                }
            };

            function initLoginAuth(email, password) {
                console.log("Calling Login and Authentication");
                return $http.post('https://www.giblib.com' + API + '/authenticate', {
                    email: email,
                    password: password
                });
            }

            function logout() {
                $window.localStorage.removeItem('giblib-jwt');
                $location.path("/page1");
            }

            function register() {
                return $http.post('https://www.giblib.com' + API + '/register', {});
            }
        }]);
})();
