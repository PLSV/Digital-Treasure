(function () {
    'use strict';

    angular
        .module('controller.player', [])
        .controller('Player', ['$scope', '$sce', '$stateParams', '$window', '$location', '$state', '$ionicPlatform', '$ionicHistory', function ($scope, $sce, $stateParams, $window, $location, $state, $ionicPlatform, $ionicHistory) {

            console.log("in player- startplaying");

            var vm = this;
            vm.videoplayers;

            $ionicPlatform.onHardwareBackButton(function() 
            {
                videojs(document.getElementById('giblibvideos')).dispose();
                video4container.innerHTML = '<video id="giblibvideos" class="video-js vjs-big-play-centered"></video>';
                console.log($ionicHistory.viewHistory());
                var hist = $ionicHistory.viewHistory();
                if(hist.histories.root.stack.length <= 3)
                    $state.go('page12.swipe');
                else
                    $ionicHistory.goBack();
            });

            $scope.$on('$stateChangeSuccess', function () 
            {
                if($state.params.videodetails !== undefined)
                {
                  console.log($ionicHistory.viewHistory());
                  vm.PlayVideo();
                }
            });

            var video4container = document.getElementById('giblibvideos').parentElement;

            vm.PlayVideo = function ()
            {
                  vm.videoplayers = null;
                  var srce = $state.params.videodetails.source;
                  var posterimg = $state.params.videodetails.posterimage;
                  var video4container = document.getElementById('giblibvideos').parentElement;

                  var srcfile = srce.$$unwrapTrustedValue();

                  if(isYT(srce.$$unwrapTrustedValue()))
                  {
                      var YTfile = getYTId(srce.$$unwrapTrustedValue());
                      document.getElementById('giblibvideos').parentElement.innerHTML = "<iframe src="+YTfile+" frameborder='0'></iframe>"
                  }
                  else
                  {
                      var webmfile = srcfile.substr(0, srcfile.lastIndexOf(".")) + ".webm";
                      var mp4file = srcfile.substr(0, srcfile.lastIndexOf(".")) + ".mp4";
                      vm.videoplayers = videojs('giblibvideos');
                      var cancelButton = vm.videoplayers.addChild('Button');
                      cancelButton.addClass('ion-android-close');
                      cancelButton.on('click', function()
                      {
                          vm.videoplayers.pause();
                          vm.videoplayers.exitFullscreen();
                          videojs(document.getElementById('giblibvideos')).dispose();
                          video4container.innerHTML = '<video id="giblibvideos" class="video-js vjs-big-play-centered"></video>';
                          $ionicHistory.goBack();
                      })
                      vm.videoplayers.src(
                          [
                              {
                                  type: "video/mp4",
                                  src: mp4file
                              },
                              {
                                  type: "video/webm",
                                  src: webmfile
                              }
                          ]
                      );
                      console.log("The ready state is "+vm.videoplayers.readyState());
                      vm.videoplayers.poster(posterimg);
                      vm.videoplayers.aspectRatio("16:9");
                      vm.videoplayers.autoplay(false);
                      vm.videoplayers.controls(true);
                      if(vm.videoplayers.isFullscreen() === false)
                      {
                          document.getElementsByClassName('ion-android-close')[1].style.display = "none";
                      }
                      vm.videoplayers.controlBar.playToggle.off("click");
                      vm.videoplayers.requestFullscreen();
                      vm.videoplayers.controlBar.fullscreenToggle.off("click");
                      vm.videoplayers.on("fullscreenchange", function ()
                      {
                          if(vm.videoplayers.isFullscreen())
                          {
                              console.log("in full screen mode");
                              console.log(cancelButton);
                              document.getElementsByClassName('ion-android-close')[1].style.display = "initial";
                          }
                          else
                          {
                              console.log("off full screen mode");
                              console.log(cancelButton);
                              document.getElementsByClassName('ion-android-close')[1].style.display = "none";
                              //console.log(document.getElementsByClassName('ion-android-close'));
                          }
                      });
                      /*if($state.params.videodetails.is360)
                      {
                          console.log("this is a 360 degree video");
                          if ($state.params.videodetails.metadata360 && $state.params.videodetails.metadata360.videotype != 'equirectangular') 
                          {
                              var minLat;
                              var maxLat = -10;
                              var initLat = -10;
                              var initLon = -270;
                              var rotateX = -Math.PI;

                              if ($state.params.videodetails.metadata360 && $state.params.videodetails.metadata360.orientation == 'bottom') 
                              {
                                  maxLat = undefined;
                                  minLat = 10;
                                  initLat = 10;
                                  rotateX = 0;
                              }

                              vm.videoplayers.panorama({
                                  clickAndDrag: true,
                                  backToVerticalCenter: false,
                                  backToHorizonCenter: false,
                                  clickToToggle: true,
                                  maxLat: maxLat,
                                  minLat: minLat,
                                  initLat: initLat,
                                  initLon: initLon,
                                  rotateX: rotateX,
                                  videoType: $state.params.videodetails.metadata360.videotype,
                                  NoticeMessage: (isMobile())? "Drag the video to change the orientation" : "Click and drag the mouse to change the orientation",
                                  callback: function () {
                                      vm.videoplayers.play();
                                  }
                              });
                          } 
                          else 
                          {
                              vm.videoplayers.panorama({
                                  clickAndDrag: true,
                                  callback: function () 
                                  {
                                      vm.videoplayers.play();
                                  }
                              });
                          } 
                      }*/
                      vm.videoplayers.play();
                  }
            };

            vm.ExitFromVideoPage = function ()
            {
                if(vm.videoplayers === null || vm.videoplayers === undefined)
                {
                    video4container.innerHTML = '<video id="giblibvideos" class="video-js vjs-big-play-centered"></video>';
                }
                else if(vm.videoplayers !== null || vm.videoplayers !== undefined)
                {
                    videojs(document.getElementById('giblibvideos')).dispose();
                    video4container.innerHTML = '<video id="giblibvideos" class="video-js vjs-big-play-centered"></video>';
                }
                console.log($ionicHistory.viewHistory());
                $ionicHistory.goBack();
            }

            function getYTId(url)
            {
                var regex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                var match = url.match(regex);
                if (match && match[2].length == 11)
                {
                    return 'https://www.youtube.com/embed/' + match[2] + '?rel=0&amp;autoplay=1';
                }
                else
                {
                    return 'error';
                }
            }

            function isMobile()
            {
                var check = false;
                (function(a) {
                    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) {
                        check = true;
                    }
                })(navigator.userAgent || navigator.vendor || window.opera);
                return check;
            }

            function isYT(url)
            {
                return url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);
            }
      }]);
})();
