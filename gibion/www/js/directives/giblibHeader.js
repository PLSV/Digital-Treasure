(function () {
    'use strict';

    angular
    .module('directive.giblibHeader', [])
    .directive('giblibHeader', function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/directives/giblibHeader.html',
            transclude: true,
            controller: function ($scope,$rootScope, model, $sce, $stateParams, $ionicSideMenuDelegate, $window, auth, $timeout, $filter, $mixpanel, $location, $ionicPopup, $state, $ionicPopover, $compile,$cordovaToast, $ionicLoading) {

            }
        };
    });
})();
