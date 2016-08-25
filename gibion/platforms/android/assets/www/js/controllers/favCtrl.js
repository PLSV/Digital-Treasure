(function () {
    'use strict';

    angular
        .module('controller.favCtrl', [])
        .controller('favCtrl', ['$scope', '$state','model', function ($scope,$state,model) {
        $scope.fav=$state.params.favpar;
        $scope.follow= $state.params.followpar;
        console.log($scope.follow);
        }])
    })();
