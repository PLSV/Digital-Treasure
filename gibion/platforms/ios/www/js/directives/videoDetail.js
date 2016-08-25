(function () {
    'use strict';

     angular
     .module('directive.videoDetail', [])
     .directive('videoDetail', function () {
                 return {
                     restrict: 'E',
                     scope: {
                         video: '='
                     },
                     templateUrl: 'templates/directives/videoDetail.html',
                     transclude: true,

                     controller: function ($scope, model, $sce, $window, auth, $state,$cordovaToast, $ionicLoading, user) {

                        $scope.avatars = {};
                        $scope.doctor = {};
                        $scope.love = {};
                        $scope.outline = {};
                        $scope.videos = {};
                        $scope.thumbnails = {};
                        $scope.likes = {};
                        $scope.yourlikes = {};
                        $scope.comments = {};
                        $scope.commentset = {};
                        $scope.titles = {};
                        $scope.isDirty = false;
                        $scope.isYoutube = {};
                        $scope.featuredvideos = null;
                        $scope.vidID =[];
                        $scope.herospecialty={};
                        $scope.ids = [];

                        $scope.youhaveliked = false;

                        $scope.$on('$stateChangeSuccess', function ()
                        {
                            $ionicLoading.hide();
                        });

                        var getAvatars = function ()
                        {
                        console.log("curret page");
                        console.log($scope.video);
                            $scope.avatar = ($scope.video.uploader) ? $scope.video.uploader.avatar : 'images/avatar_default.png';
                            $scope.doctor = ($scope.video.uploader) ? $scope.video.uploader.salutation + " " + $scope.video.uploader.name.first + " " + $scope.video.uploader.name.last : '';
                        };

                        var getComments = function ()
                        {

                            model.get('comments', $scope.video._id).then(function (res)
                            {
                                $scope.commentset = res.data;
                            });
                        }

                        $scope.isYT = function (url)
                        {
                       	    return url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);
                        }

                        var checkFav = function(id, dirty)
                        {
                            console.log("favo");
                            $scope.love[id] = false;
                            $scope.outline[id] = true;
                            var favflag = false;
                            $scope.favId =[];
                            user.getFavorites(dirty).then(function(result)
                            {
                                console.log("user's results");
                                if (result)
                                {
                                    for (var i = 0; i < result.length; i++)
                                    {
                                        if (result[i]._id == id)
                                        {
                                            favflag = true;
                                            $scope.love[id] = true;
                                            $scope.outline[id] = false;
                                        }
                                    }
                                    if (!favflag)
                                    {
                                    }
                                }
                                for(var i=0;i<result.length;i++)
                                {
                                    console.log("fjjjjjjjm"+result[i]._id);
                                    if(result[i]._id)
                                        $scope.favId.push(result[i]._id);
                                };
                            });
                        }

                        $scope.fav=function(id)
                        {
                            var videoid = {
                                videoid: id
                            };
                            model.post('favorites', videoid).then(function (res)
                            {
                                console.log("check favo");
                                $scope.isDirty = true;
                                checkFav(id, $scope.isDirty);
                            });
                            $scope.love[id] = true;
                            $scope.outline[id] = false;
                            $cordovaToast.show('Added to Favorites !', 'short', 'bottom').then(function(success)
                            {
                                console.log("The toast was shown");
                            }, function (error)
                            {
                                console.log("The toast was not shown due to " + error);
                            });
                        }

                        $scope.unFav=function(id)
                        {
                            model.delete('favorites', id).then(function (res)
                            {

                                $scope.love[id] = false;
                                $scope.outline[id] = true;
                                $scope.isDirty = true;
                                checkFav(id, $scope.isDirty);
                            });
                        }

                        $scope.startplaying = function (video)
                        {
                        console.log("source file"+video.src);
                            var videoload =
                            {
                                source :$sce.trustAsResourceUrl($scope.video.src),
                                posterimage : $scope.video.thumbnail,
                                is360 : $scope.video.is360,
                                meta360 : $scope.video.metadata360,
                                yetToPlay: true
                            }
                            if($scope.isYT($scope.video.src))
                            {
                                $state.go('play_youtube', { videodetails : videoload });
                            }
                            else
                            {
                                $state.go('play', { videodetails : videoload });
                            }
                        }

                        $scope.getLikes = function ()
                        {
                            console.log($scope.video.likes);
                            var userid = auth.getUser()._id;
                            for (var i = 0; i < $scope.video.likes.length; i++)
                            {
                                if ($scope.video.likes[i].author === userid)
                                {
                                    console.log("you have liked this");
                                    console.log(userid);
                                    console.log($scope.video.likes[i].author);
                                    console.log(i);
                                    $scope.youhaveliked = true;
                                    break;
                                }
                            }
                        };

                        $scope.setLike = function (id)
                        {
                            $scope.like = {};
                            $scope.like.video = id;
                            console.log("initialized likes post method");
                            model.post('likes', $scope.like).then(function (res)
                            {
                                var result = res.data;
                                console.log("likes result : ",result);
                                if(result && result.length > 0)
                                {
                                    $scope.getLikes(id);
                                    document.getElementById($scope.video._id).setAttribute("class", "glyphicon glyphicon-thumbs-up "+$scope.video.specialty.name+"Col");
                                    document.getElementById($scope.video._id).setAttribute("disabled", "disabled");
                                    var inc = $scope.video.likes.length+1;
                                    document.getElementById($scope.video._id+"Para").innerHTML = "<b> "+inc+" Likes</b>&nbsp;";
                                }
                            });
                            $cordovaToast.show('You just Liked it !', 'short', 'bottom').then(function(success)
                                                        {
                                                            console.log("The toast was shown");
                                                        }, function (error)
                                                        {
                                                            console.log("The toast was not shown due to " + error);
                                                        });
                        };

                        $scope.commLen = function()
                        {
                            if($scope.commentset && $scope.commentset.length > 2)
                                return true;
                            else
                                return false;
                        }

                        $scope.setId = function(id)
                        {
                            var comments = $scope.commentset;
                            $state.go('commentPage', {comms : comments, videoid : id});
                        };

                        $scope.sendVideoEmail=function()
                        {
                            var link = "mailto:?subject=" + $scope.video.title + "&body=" +$scope.video.uploader.salutation + $scope.video.uploader.fullname+" "+ escape(" has shared a video with you from video:\r\n\r\n") + $scope.video.title + escape("\r\n") + $window.location.href.toString() + escape("\r\n\r\n\r\n") + "Go to www.giblib.com to see more surgical videos"
                            $window.location.href = link;
                        }

                        var init = function()
                        {
                            getAvatars();
                            checkFav($scope.video._id);
                            $scope.limit = 100;
                            $scope.moreShown = false
                            getComments();
                        }
                        init();
                    }
                };
            });
    })();
