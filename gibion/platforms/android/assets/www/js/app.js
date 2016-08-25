// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var cameraTouch=angular.module('app',['ionic',
                                      'ngFileUpload',
                                      'ui.bootstrap',
                                      'tabSlideBox',
									                    'app.routes',
									                    'app.controllers',
									                    'controller.forgot',
									                    'app.directives',
									                    'app.services',
									                    'config.constant',
                          			      'config.http',
                          			      'analytics.mixpanel',
                          			      'config.mixpanel',
                          			      'factory.authinterceptor',
                          			      'service.auth',
                          			      'service.user',
									                    'ngCordova',
									                    'service.model',
                                      'controller.registration',
                                      'controller.video',
                                      'controller.like',
                                      'controller.profile',
                                      'controller.youtube',
                                      'controller.player',
                                      'controller.favCtrl',
                                      'directive.userdetail',
                                      'directive.avatarcard',
                                      'directive.videoDetail',
                                      'directive.giblibHeader',
                                      'directive.giblibFooter',
                                      'service.uploader'
                                      ])

.run(function($ionicPlatform, $state)
{
  $ionicPlatform.ready(function()
	{
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(false);
    }
    if (window.StatusBar)
	  {
      StatusBar.styleDefault();
    }
  });

  /*$ionicPlatform.registerBackButtonAction(function ()
  {

  }, 600);*/
})

.controller('AppCtrl', function($ionicSideMenuDelegate, $scope,$state ,$cordovaToast, user, $window, model)
{
    $scope.specialties = [];
    $scope.isLoaded = true;
    $scope.showToast = function(message, duration, location) {
        $cordovaToast.show(message, duration, location).then(function(success) {
            console.log("The toast was shown");
        }, function (error) {
            console.log("The toast was not shown due to " + error);
        });
    }

    var loadSpecialties = function() {
      model.get('specialty').then(function (res) {
          $scope.specialties = res.data;
      });
    };

    var init = function() {
        loadSpecialties();
    };

    init();

$scope.MainSwipes=true;
  $scope.userData = {
    email : false
  };

  $scope.goto = function (specview)
  {
  console.log("changing state");
    $state.go('app.showspecialties', { specialty:specview });
        $ionicSideMenuDelegate.toggleRight();
  }

  $scope.logout = function () {
    $window.localStorage.clear();
	$window.location.href = '';
  }


    $scope.stat=function(){
    return $state.$current.name;}

  $scope.showAlert = function ()
  {
  console.log("Successful login");
   /*$cordovaToast.show('Authentication Successful', 'short', 'center').then(function(success) {
                    console.log("The toast was shown");
                }, function (error) {
                    console.log("The toast was not shown due to " + error);
                });*/
  }

  $scope.showOtherwise = function ()
  {
    console.log("Login failed");
    $cordovaToast.show('Authentication Failed', 'short', 'center').then(function(success) {
                  console.log("The toast was shown");
              }, function (error) {
                  console.log("The toast was not shown due to " + error);
        });
  }

  $scope.noteEmail = function ()
  {
    if($scope.userData.email === true)
      $window.localStorage['email'] = $scope.email;
    else if($scope.userData.email === false){
      if ($window.localStorage.getItem('email') === null)
        $window.localStorage.removeItem('email');
    }
  }

   $scope.showMenu = function() {
        $ionicSideMenuDelegate.toggleRight();
   };

   $scope.callSearch = function(query) {
      $state.go('app.query', { query:query });

      console.log("after srch"+query);
   }

  $scope.LoginUser = function () {
    var message = user.login($scope.email, $scope.password)
    .then(function (res)
    {
      var token = res.data.token;
      if (token === undefined)
        $scope.showOtherwise();
      else {
        $scope.showAlert();
        $state.go("app.videoList");
      }
    });
  };
})
.controller('TabsCtrl', function($scope, $ionicSideMenuDelegate) {
      $scope.openMenu = function () {
        $ionicSideMenuDelegate.toggleLeft();
      }
})

.controller('MyCtrl', function ($scope, $ionicTabsDelegate) {
    $scope.goForward = function () {
        var selected = $ionicTabsDelegate.selectedIndex();
        if (selected != -1) {
            $ionicTabsDelegate.select(selected + 1);
        }
  }

  $scope.goBack = function () {
      var selected = $ionicTabsDelegate.selectedIndex();
      if (selected != -1 && selected != 0) {
         $ionicTabsDelegate.select(selected - 1);
        }
    }


})

.controller("cameraClickCtrl", function($scope, $cordovaCamera, $ionicPopup, $window, model,$cordovaFileTransfer) {
    var uploads = [];
    var data = {};
    var index=0;

    $scope.takePicture = function() {
        $scope.fileName = "";
        var options = {
            quality : 75,
            destinationType : Camera.DestinationType.FILE_URI,
            sourceType :Camera.PictureSourceType.CAMERA,
            //for upload feature: sourceType:0,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            //popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        }
        $cordovaCamera.getPicture(options).then(function(imageData) {
            var imgURI = "data:image/jpeg;base64," + imageData;
            var sourceDirectory = imageData.substring(0, imageData.lastIndexOf('/') + 1);
            var sourceFileName = imageData.substring(imageData.lastIndexOf('/') + 1, imageData.length);
            $scope.upload(imgURI,imageData,sourceFileName);
            $ionicPopup.alert({
                           title: 'Camera Upload',
                           template:'Uploaded Successfully',
                           okText: 'OK',
                           okType: 'button-assertive'
                         });
            }, function(err) {
                 console.log(err);
                 $ionicPopup.alert({
                          title: 'Camera Upload',
                          template:$scope.fileName+'Failed',
                          okText: 'OK',
                          okType: 'button-assertive'
                       });
                 });

        $scope.upload = function (imgURI,imageData,sourceFileName) {
                                        model.get('aws/s3/signature/giblib-verification').then(function (res) {
                                        var responsejson = angular.toJson(res.data);
                                        data.fileKey = "file";
                                        data.fileName = sourceFileName.name;
                                        data.mimeType = "image/jpeg";
                                        data.chunkedMode = false;
                                        data.headers = {
                                            connection: "close"
                                        };
                                        data.params= {
                                                    key: $window.sessionStorage["email"] + "/" + sourceFileName,
                                                    AWSAccessKeyId: res.data.accesskey,
                                                    acl: "private",
                                                    policy: res.data.policy,
                                                    signature: res.data.signature,
                                                    "Content-Type": "image/jpeg",
                                                    filename: sourceFileName
                                              };
                                      $cordovaFileTransfer.upload("https://giblib-verification.s3.amazonaws.com/", imageData, data,true)
                                              .then(function(result) {
                                                  console.log('upload to Amazon s3 succeed ', result);
                                              }, function(err) {
                                                  console.log('upload to s3 fail ', angular.toJson(err));
                                              });
            });
        }
}
})

.controller("cameraUploadCtrl", function($scope, $cordovaCamera,$ionicPopup, $window, model,$cordovaFileTransfer) {
    var data={};
    $scope.takePicture = function() {
        var options = {
            quality : 75,
            destinationType : Camera.DestinationType.FILE_URI,
            sourceType :0,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };

          $cordovaCamera.getPicture(options).then(function(imageData) {
                      var imgURI = "data:image/jpeg;base64," + imageData;
                      var sourceDirectory = imageData.substring(0, imageData.lastIndexOf('/') + 1);
                      var sourceFileName = imageData.substring(imageData.lastIndexOf('/') + 1, imageData.length);
                      $scope.upload(imgURI,imageData,sourceFileName);
                      $ionicPopup.alert({
                                     title: 'Camera Upload',
                                     template:'Uploaded Successfully',
                                     okText: 'OK',
                                     okType: 'button-assertive'
                                   });
                      }, function(err) {
                           console.log(err);
                           $ionicPopup.alert({
                                    title: 'Camera Upload',
                                    template:$scope.fileName+'Failed',
                                    okText: 'OK',
                                    okType: 'button-assertive'
                                 });
                           });

                  $scope.upload = function (imgURI,imageData,sourceFileName) {
                                                  model.get('aws/s3/signature/giblib-verification').then(function (res) {
                                                  var responsejson = angular.toJson(res.data);
                                                  data.fileKey = "file";
                                                  data.fileName = sourceFileName.name;
                                                  data.mimeType = "image/jpeg";
                                                  data.chunkedMode = false;
                                                  data.headers = {
                                                      connection: "close"
                                                  };
                                                  data.params= {
                                                              key: $window.sessionStorage["email"] + "/" + sourceFileName,
                                                              AWSAccessKeyId: res.data.accesskey,
                                                              acl: "private",
                                                              policy: res.data.policy,
                                                              signature: res.data.signature,
                                                              "Content-Type": "image/jpeg",
                                                              filename: sourceFileName
                                                        };
                                                $cordovaFileTransfer.upload("https://giblib-verification.s3.amazonaws.com/", imageData, data,true)
                                                        .then(function(result) {
                                                            console.log('upload to Amazon s3 succeed ', result);
                                                        }, function(err) {
                                                            console.log('upload to s3 fail ', angular.toJson(err));
                                                        });
                      });
                  }
    }
})




