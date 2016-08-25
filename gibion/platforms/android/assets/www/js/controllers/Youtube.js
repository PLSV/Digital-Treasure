(function () {
    'use strict';

    angular
        .module('controller.youtube', [])
        .controller('Youtube', ['$scope', '$sce', '$window', '$state', '$ionicPlatform', '$ionicHistory', function ($scope, $sce, $window, $state, $ionicPlatform, $ionicHistory) {

            var vm = this;
            vm.player = null;
            vm.ID;

            $ionicPlatform.onHardwareBackButton(function() {
                vm.exit();
            });

            window.addEventListener("orientationchange", function() {
                          console.log("change in orientation");
                          console.log(screen.orientation);
                          if(screen.orientation.angle === 0)
                          {
                            if(document.getElementById("player") !== undefined && document.getElementById("player").tagName === "IFRAME")
                            {
                                console.log("portrait");
                                document.getElementById("player").style.marginLeft = "0px";
                                document.getElementById("player").style.marginTop = "0px";
                            }
                          }
                          else if(screen.orientation.angle === 90)
                          {
                            if(document.getElementById("player") !== undefined && document.getElementById("player").tagName === "IFRAME")
                            {
                              console.log("landscape");
                                document.getElementById("player").style.marginLeft = "25%";
                                var marg = (screen.height/screen.width)*175;
                                document.getElementById("player").style.marginTop = "-"+marg+"px";
                            }
                          }
                        }, false);

            $scope.$on('$stateChangeSuccess', function () {
              console.log($ionicHistory.viewHistory());
              if($state.params.videodetails !== undefined)
              {
                  var src = $state.params.videodetails.source;
                  vm.ID = vm.getYTId(src.$$unwrapTrustedValue());
                  vm.setPlayer();
              }
            });

                  vm.setPlayer = function() {
                    onYouTubeIframeAPIReady();
                  }

                  function onYouTubeIframeAPIReady()
                  {
                      vm.player = new YT.Player('player',
                      {
                          height: '390',
                          width: screen.width,
                          videoId: vm.ID,
                          events:
                          {
                              'onReady': onPlayerReady,
                              'onStateChange': onPlayerStateChange
                          }
                      });
                  }

                  function onPlayerReady(event)
                  {
                      event.target.playVideo();
                  }

                  var done = false;

                  function onPlayerStateChange(event)
                  {
                      if (event.data == YT.PlayerState.PLAYING && !done)
                      {
                          //setTimeout(stopVideo, 6000);
                          //done = true;
                      }
                  }

                  function stopVideo()
                  {
                      vm.player.stopVideo();
                  }

            vm.getYTId = function (url) {
                var regex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                var match = url.match(regex);
                return match[2];
            }

            vm.exit = function () {
              vm.player.destroy();
              vm.player = null;
              //$state.go("page12.swipe");
              console.log($ionicHistory.viewHistory());
              $ionicHistory.goBack();
            }

        }]);
})();

