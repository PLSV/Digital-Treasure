(function () {
    'use strict';
    angular
    .module('controller.video', [])
    .controller('VideoListCtrl', ['$scope','$ionicLoading','initData', function ($scope,$ionicLoading,initData) {
        console.log("current slide index");
        $scope.reload = function()
                            {
                                $ionicLoading.hide();
                                $window.location.reload(true);
                            }

        var init = function() {

            $scope.featuredVideos = initData.FeaturedVideos;
            /*$scope.bariatricVideos = initData.BariatricVideos;
            $scope.colorectalVideos = initData.ColorectalVideos;
            $scope.cardiothoracicVideos = initData.CardiothoracicVideos;
            $scope.generalSurgeryVideos = initData.GeneralSurgeryVideos;*/
            $ionicLoading.hide();
        }

        init();

    }])


    .controller('VideoSearchCtrl', ['$scope','$ionicLoading','initData', function ($scope, $ionicLoading,initData) {
$scope.reload = function()
                    {
                        $ionicLoading.hide();
                        $window.location.reload(true);
                    }

            var init = function() {

                $scope.searchVideos = initData.SearchVideos.videos;
                $scope.doctorsRoster = initData.SearchVideos.users;

                $scope.limit = 6;
                $scope.doctorlimit = 6;
                $ionicLoading.hide();
            }
            init();

        }])

    .controller('VideoSpecCtrl', ['$scope','$stateParams','$ionicLoading','initData', function ($scope,$stateParams,$ionicLoading,initData) {
            $scope.reload = function()
                                {
                                    $ionicLoading.hide();
                                    $window.location.reload(true);
                                }

            var init = function() {
                console.log('initing data');
                $scope.specialtyAs = $stateParams.specialty;
                $scope.specVideos = initData.SpecialtyVideos.videos;
                $scope.limit = 12;
                $ionicLoading.hide();
            }

            init();

        }])

    .controller('VideoFavCtrl', ['$scope','$sce','$state','$ionicLoading','initData', function ($scope,$sce,$state,$ionicLoading,initData) {

$scope.reload = function()
                    {
                        $ionicLoading.hide();
                        $window.location.reload(true);
                    }
        $scope.$on('$stateChangeSuccess', function ()
        {
            $ionicLoading.hide();
        });

        var init = function()
        {
            $scope.limit = 5;
            $scope.favoriteVideos = initData.FavoriteVideos;
            console.log($scope.favoriteVideos);
            $scope.foll = initData.Followers;
        }

        $scope.startfavVideos = function(id)
        {
            var videoload = {
                source :$sce.trustAsResourceUrl(id.src),
                posterimage : id.thumbnail,
                is360 : id.is360,
                meta360 : id.metadata360,
                yetToPlay: true
            }
            if($scope.isYT(id.src))
            {
                $state.go('play_youtube', { videodetails : videoload });
            }
            else
            {
                $state.go('play', { videodetails : videoload });
            }
        }

        $scope.isYT = function (url)
        {
            return url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);
        }

        init();

    }]);
})();

