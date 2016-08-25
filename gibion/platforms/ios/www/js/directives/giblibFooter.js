(function () {
    'use strict';

     angular
        .module('directive.giblibFooter', [])
     .directive('giblibFooter', function () {
                 return {
                     restrict: 'E',
                     scope: {
                         video: '='
                     },
                     templateUrl: 'templates/directives/giblibFooter.html',
                     transclude: true,

                     controller: function ($scope,$rootScope, model, $sce, $stateParams, $ionicSideMenuDelegate, $window, auth, $timeout, $filter, $mixpanel, $location, $ionicPopup, $state, $ionicPopover, $compile,$cordovaToast, $ionicLoading) {

                     }
                 };
             });
    })();
