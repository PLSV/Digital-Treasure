(function () {
    'use strict';

     angular
        .module('directive.userdetail', [])
        .directive('userDetail', userDetail);

    userDetail.$inject = [];

    function userDetail() {

        return {
            scope: {
                user: '=',
                organizations: '=',
                specialties: '=',
                isEditable: '=',
                isEditing: '=',
                specColor: '=specialty',
                edit: '&',
                save: '&',
                noSave: '&'
            },
            templateUrl: 'templates/userdetail.html',
            transclude: true,
            link: function (scope) {
                scope.updateModel = function (model, collection, field) {
                    if (collection) {
                        for (var i = 0; i < collection.length; i++) {
                            if (model === collection[i]._id) {
                                scope.user[field][0]._id = collection[i]._id;
                                scope.user[field][0].name = collection[i].name;
                                return collection[i].name;
                            }
                        }
                    }
                    return model;
                };
                scope.updateColor = function () {
                    scope.specColor = scope.user.specialties[0].name.toLowerCase();
                };
            }
        };
    }
})();
