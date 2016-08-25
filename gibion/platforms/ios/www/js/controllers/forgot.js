(function () {
    'use strict';

    angular
        .module('controller.forgot', [])
        .controller('Forgot', ['$scope', 'model', '$ionicPopup', '$ionicHistory', function ($scope, model, $ionicPopup, $ionicHistory) {

            $scope.back = function ()
            {
                $ionicHistory.goBack();
            }

            $scope.sendForgotEmail = function () 
            {
                model.post('forgot', $scope.forgotForm).then(function () 
                {

                });
                $ionicPopup.alert(
                {
                    title: "success",
                    template: "If an account exists under the email address, you will recieve an email with further instructions.",
                    okText: 'OK',
                    okType: 'button-assertive'
                });
            };

        }]);
})();
