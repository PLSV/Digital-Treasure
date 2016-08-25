angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider,$compileProvider) {
  $compileProvider.debugInfoEnabled(false);
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
$ionicConfigProvider.tabs.position("top");
  $stateProvider
  .state('app', {
        url: "/app",
        cache: false,
        abstract: true,
        templateUrl: "templates/side-menu.html",
        controller: 'AppCtrl',
        resolve: {
            initData: function(user) {
                return user.getFavorites();
            }
        }
  })

  .state('page', {
    url: '',
    templateUrl: 'templates/page.html',
    controller: 'pageCtrl'
  })

  .state('page2', {
    url: '/page2',
    templateUrl: 'templates/page2.html',
    controller: 'page2Ctrl'
  })

  .state('page3', {
    url: '/page3',
    templateUrl: 'templates/page3.html',
    controller: 'page3Ctrl'
  })

  .state('page4', {
    url: '/page4',
    templateUrl: 'templates/page4.html',
    controller: 'page4Ctrl'
  })

  .state('page5', {
    url: '/page5',
    templateUrl: 'templates/page5.html',
    controller: 'page5Ctrl'
  })

  .state('page6', {
    url: '/page6',
    templateUrl: 'templates/page6.html',
    controller: 'page6Ctrl'
  })

  .state('page7', {
    url: '/page15',
    templateUrl: 'templates/page7.html',
    controller: 'page7Ctrl'
  })

  .state('page9', {
    url: '/page14',
    templateUrl: 'templates/page9.html',
    controller: 'Registration'
  })

  .state('page10', {
    url: '/page18',
    templateUrl: 'templates/page10.html',
    controller: 'page10Ctrl'
  })

  .state('app.videoList', {
      url: '/video-list',
      cache: false,
      views: {
          'menuContent': {
              templateUrl: 'templates/videoList.html',
              controller: 'VideoListCtrl',
          }
      },
      resolve: {
        initData: function($q, $ionicLoading, model)
        {
            var deferred = $q.defer();
            $ionicLoading.show( {
                      duration: 5000
                  });

            var getFeaturedVids = model.get('hero').then(function (res)
            {
                var Featured = res.data;
                return Featured;
            });

           /* var getBariatricVids = model.get('specialty', 'Bariatric').then(function (res)
            {
                var Bariatric = res.data;
                return Bariatric;
            });

            var getColorectalVids = model.get('specialty', 'Colorectal').then(function (res)
            {
                var Colorectal = res.data;

                return Colorectal;
            });

            var getCardiothoracicVids = model.get('specialty', 'Cardiothoracic').then(function (res)
            {
                var Cardiothoracic = res.data;

                return Cardiothoracic;
            });

            var getGeneralSurgeryVids = model.get('specialty', 'General Surgery').then(function (res)
            {
                var GeneralSurgery = res.data;

                return GeneralSurgery;
            });*/

            $q.all([getFeaturedVids]).then(function(results)
            {
                var initData =
                {
                    FeaturedVideos: results[0],
                   // BariatricVideos: results[1],
                   // ColorectalVideos: results[2],
                  //  CardiothoracicVideos: results[3],
                   // GeneralSurgeryVideos: results[4]
                }
                console.log(initData);
                deferred.resolve(initData);
            });

            return deferred.promise;
        }
     }

  })

  .state('app.videoFavorites', {
      url: '/video-favorites',
      cache: false,
      views: {
          'menuContent': {
              templateUrl: 'templates/videoFavorites.html',
              controller: 'VideoFavCtrl',
          }
      },
      resolve: {
        initData: function($q, $ionicLoading, model,auth)
        {
            var deferred = $q.defer();
            $ionicLoading.show( {
                      duration: 5000
                  });

            var getFavorites = model.get('favorites', auth.getUser()._id).then(function (res)
            {
                var Featured = res.data;
                return Featured;
            });

            var getFollow = model.get('following', auth.getUser()._id).then(function (res)
                        {
                            var follow = res.data;
                            console.log(follow);
                            return follow;
                        });

            $q.all([getFavorites,getFollow]).then(function(results)
            {
                var initData =
                {
                    FavoriteVideos: results[0],
                    Followers: results[1]
                }

                deferred.resolve(initData);
            });

            return deferred.promise;
        }
     }

  })

   .state('app.showspecialties', {
       url: '/specialties/:specialty',
       cache: false,
        views: {
            'menuContent': {
               templateUrl: 'templates/video.html',
               controller: 'VideoSpecCtrl'
            }
        },
        resolve:
        {
            initData: function($q, $ionicLoading, $stateParams, $mixpanel, model)
            {
                var surgerybranch = $stateParams.specialty;
                $mixpanel.track('search');
                var deferred = $q.defer();
                $ionicLoading.show( {
                      duration: 5000
                  });

                var getSpecialtyVideos = model.get('search', surgerybranch).then(function (res)
                {
                    var search = res.data;
                    return search;
                });

                $q.all([getSpecialtyVideos]).then(function(results)
                {
                    var initData =
                    {
                        SpecialtyVideos: results[0]
                    }
                    console.log(initData);
                    deferred.resolve(initData);
                });

                return deferred.promise;
            }
        }
    })

  .state('page13', {
      url: '/page13',
      templateUrl: 'templates/page13.html',
      controller: 'page13Ctrl'
  })

  .state('page14', {
     url: '/page14',
     templateUrl: 'templates/page14.html',
     controller: 'page14Ctrl'
  })

  .state('page15', {
     url: '/page15',
     templateUrl: 'templates/page15.html',
     controller: 'page15Ctrl'
  })

  .state('forgot', {
     url: '/forgot',
     templateUrl: 'templates/forgot.html',
     controller: 'forgotCtrl'
  })

  .state('play_youtube', {
            url: '/play_youtube',
            params: {
            videodetails:null
            },
            templateUrl: 'templates/youtube.html',
            controller: 'Youtube',
            controllerAs: 'yt'
  })

   .state('app.query',{
         url:'/search/:query',
         cache: false,
         views: {
             'menuContent': {
                 templateUrl: 'templates/search.html',
                 controller: 'VideoSearchCtrl'
             }
         },
         resolve:
         {
             initData: function($q, $ionicLoading, $stateParams, $mixpanel, model)
             {
                 var queryvar = $stateParams.query;
                 $mixpanel.track('search');
                 var deferred = $q.defer();
                 $ionicLoading.show( {
                      duration: 5000
                  });

                 var getSearchVideos = model.get('search', queryvar).then(function (res)
                 {
                     var search = res.data;
                     if(typeof search.SearchVideos === "string")
                     {
                         var temp;
                         temp = {
                             SearchVideos : {
                                 users : [],
                                 videos : []
                             }
                         };
                         console.log(temp);
                         return temp;
                     }
                     return search;
                 });

                 $q.all([getSearchVideos]).then(function(results)
                 {
                     var initData =
                     {
                         SearchVideos: results[0]
                     }
                     console.log(initData);
                     deferred.resolve(initData);
                 });

                 return deferred.promise;
             }
         }
     })


.state('commentPage',{
     url :'/commentPage',
     params: {
          comms: null,
          videoid: null
        },
     templateUrl: 'templates/commentPage.html',
     controller: 'likeCtrl'
})

.state ('app.profile', {
    url: '/profile?user',
    views: {
        'menuContent': {
            templateUrl : 'templates/profile.html',
            controller: 'Profile',
            controllerAs: 'user',
        }
    },
})


  .state('changePassword', {
       url: '/changePassword',
       templateUrl: 'templates/changePassword',
       controller: 'Forgot'
    })

    .state('play', {
           url: '/play',
           params: {
           videodetails:null
           },
           templateUrl: 'templates/player.html',
           controller: 'Player',
           controllerAs: 'vp'
        })

    .state('app.more', {
        url: '/more',
        views: {
            'menuContent': {
                templateUrl: 'templates/more.html',
            }
        },
    })
    .state('about', {
        url: '/about',
        templateUrl: 'templates/about.html'
    })

    .state('press', {
        url: '/press',
        templateUrl: 'templates/press.html',
        controller: 'AppCtrl'
    })

    .state('tos', {
        url: '/tos',
        templateUrl: 'templates/tos.html'
    })

    .state('faq', {
        url: '/faq',
        templateUrl: 'templates/faq.html'
    })

    .state('privacy', {
        url: '/privacy',
        templateUrl: 'templates/privacy.html'
    })

    .state('doctor',{
        url: '/doctor/:doctor',
        templateUrl: 'templates/doctor.html',
        controller: 'Profile',
        controllerAs: 'doctor'
    })

    .state('serviceTerms', {
        url: '/ServiceTerms',
        templateUrl: 'templates/TOSentry.html'
    })

    .state('privacyTerms', {
        url: '/PrivacyTerms',
        templateUrl: 'templates/privacy_entry.html'
    })

  $urlRouterProvider
  .otherwise('/page1')

});
