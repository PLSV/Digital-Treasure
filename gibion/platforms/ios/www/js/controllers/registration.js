  (function () {
      'use strict';

      angular
          .module('controller.registration', [])
          .controller('Registration', ['$scope', '$location', 'model', 'user','$state', '$window', '$ionicPopup', function ($scope, $location, model, user, $state, $window,$ionicPopup, $ionicTabsDelegate) {

                $scope.isLoaded =true;

              var uploads = [];
              var files = [];
              $scope.specialties = [];
              $scope.check_NPI = null;
              $scope.showSpecialties = false;
              $scope.showSalutation=false;
              $scope.us=true;
              $scope.days = [];
              $scope.gradYears = [];
              $scope.birthYears = [];
              $scope.trueDr = true;
              $scope.trueStudent =true;

              $scope.dd = null;
              $scope.mm = null;
              $scope.yyyy = null;

               $scope.openExternal= function(elem) {
                      $scope.window.open(elem.href, "_blank" , 'location=yes');
                      return false; // Prevent execution of the default onClick handler
                  }

              $scope.professions = {
                 'Physician': 'doctor',
                 'Fellow': 'doctor',
                 'Resident': 'doctor',
                 'Medical Student': 'student'
              };

              $scope.countList = [
                  { id: 0, name: 'United States' },
                  { id: 1, name: 'Outside United States' }
              ];

              $scope.loc = $scope.countList[0].id;

              $scope.onchange = function(id)
              {
                  if(id.name == "United States")
                  {
                      $scope.us=true;
                      $scope.outside=false;
                      $window.localStorage.setItem("US",true);
                  }
                  else
                  {
                      $scope.outside=true;
                      $scope.us=false;
                      $window.localStorage.setItem("US",false);
                  }
              }

              $scope.invalidData = {
                       email: true,
                       password: true,
                       firstname: true,
                       lastname: true,
                       NPI: true,
                       edumail: true
              };

              $scope.registerform = {
                  verificationMethod: "npi"
              };

              $scope.months = [
                              'Jan',
                              'Feb',
                              'Mar',
                              'Apr',
                              'May',
                              'Jun',
                              'Jul',
                              'Aug',
                              'Sep',
                              'Oct',
                              'Nov',
                              'Dec'
                          ];

              $scope.prof = $scope.registerform.profession;
              console.log("i m a " + $scope.prof);

              $scope.professionSelected = function () {

                              $scope.specialty = "";
                              if ($scope.professions[$scope.registerform.profession] === 'doctor') {

                                  $scope.showSpecialties = true;
                                  $scope.showSalutation=false;
                                  $scope.studPage=false;
                                  $scope.docPage=true;
                                  $scope.doc=true;
                                  $scope.stud=false;
                              }
                              else {
                                  $scope.showSpecialties = false;
                                  $scope.showSalutation=true;
                                  $scope.studPage=true;
                                  $scope.docPage=false;
                                  $scope.stud=true;
                                  $scope.doc=false;

                                }
                              }

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

              $scope.isInvalidDate = function (inYear, inMonthIndex, inDay) {
                  var selectedDate = new Date(inYear, inMonthIndex, inDay);
                  if (isNaN(selectedDate) || selectedDate.getMonth() != inMonthIndex) {
                      $ionicPopup.alert({
                          title: 'Registration',
                          template: "You have successfully registered",
                          okText: 'OK',
                          okType: 'button-assertive'
                      });
                      return true;
                  }
                  else
                      return false;
              };

              $scope.isInvalidEmail = function (inEmail)
              {
                  if (inEmail === undefined || inEmail.indexOf('@') === -1 || inEmail.indexOf('.') === -1 || inEmail.length < 4) {
                      $ionicPopup.alert({
                          title: 'Invalid Email',
                          template: "Please enter the proper Email",
                          okText: 'OK',
                          okType: 'button-assertive'
                      });
                      $scope.invalidData.email = true;
                  }
                  else
                      $scope.invalidData.email = false;
              };

              $scope.isInvalidEduMail = function (inEmail)
              {
                  var uscRegex = new RegExp('^[A-Za-z0-9+_.-]+@[A-Za-z0-9+_.-]+\.(edu)$');
                  if (!uscRegex.test(inEmail)) {
                      $ionicPopup.alert({
                          title: 'Wrong Email',
                          template: "Please enter the correct email, it must end with \'.edu\'",
                          okText: 'OK',
                          okType: 'button-assertive'
                      });
                      $scope.invalidData.edumail = true;
                  }
                  else
                      $scope.invalidData.edumail = false;
              };

              $scope.isInvalidString = function (inString) {
                  if (inString === undefined || inString.length < 1) {
                      $ionicPopup.alert({
                          title: 'Invalid Input',
                          template: "Please enter Valid Input",
                          okText: 'OK',
                          okType: 'button-assertive'
                      });
                  }
               };

              $scope.isInvalidNPI = function (inNPI) {
                  var npiRegEx = new RegExp('^[0-9]{10}$');
                  if (inNPI === undefined || !npiRegEx.test(inNPI)) {
                      $ionicPopup.alert({
                          title: 'Invalid NPI',
                          template: "Please enter the proper NPI",
                          okText: 'OK',
                          okType: 'button-assertive'
                      });
                      $scope.invalidData.NPI = true;
                  }
                  else
                      $scope.invalidData.NPI = false;
              };

              $scope.validateSpecialty = function () {
                  for (var i = 0, len = $scope.specialties.length; i < len; i++) {
                      if ($scope.specialties[i]._id === $scope.registerform.specialty) {
                          $scope.invalidData.specialty = false;
                          return;
                      }
                  }
                  $ionicPopup.alert({
                      title: 'Invalid NPI',
                      template: "Please enter the proper Specialty",
                      okText: 'OK',
                      okType: 'button-assertive'
                  });
                  $scope.invalidData.specialty = true;
              };

              function registrationInit()
              {
                  model.get('specialty').then(function (res)
                  {
                      $scope.specialties = res.data;
                  });
              };

              function registrationBirthdayInit()
              {
                  for (var i = 1; i <= 31; i++)
                  {
                      $scope.days.push(i.toString());
                  }
                  var today = new Date();
                  for (var j = today.getFullYear() - 16; j >= today.getFullYear() - 100; j--)
                  {
                      $scope.birthYears.push(j.toString());
                  }
                  for (var k = today.getFullYear() + 5; k >= today.getFullYear() - 20; k--)
                  {
                      $scope.gradYears.push(k.toString());
                  }
              };

              $scope.getOrganizations = function () {
                  model.get('organization', 'type', 'Medical School').then(function (res) {
                      $scope.medicalSchools = res.data;
                  });
                  model.get('organization', 'type', 'Residency Program').then(function (res) {
                      $scope.residencies = res.data;
                  });
                  model.get('organization', 'type', 'Affiliated Organization').then(function (res) {
                      $scope.fellowships = res.data;
                  });

                  model.get('organization').then(function (res) {
                      $scope.organizations = res.data;
                  });
              };

              $scope.setFormData = function ()
              {
               console.log("reg chk");
                                console.log($scope.registerform);
                  for (var p in $scope.registerform)
                  {

                      if($scope.registerform.hasOwnProperty(p))
                      {
                          $window.sessionStorage.setItem(p, $scope.registerform[p]);
                      }
                  }
                  console.log($window.sessionStorage);
                  for(var i in $window.sessionStorage )
                  {
                  console.log($window.sessionStorage[i]);

                  }
              };

              $scope.NPI_clearance_received = function ()
              {

                  model.post('register', $scope.registerform).then(function (res)
                  {
                      console.log("the NPI_clearance_received function is being called");
                      console.log(res);
                      if (res.data.error || res.data._id===undefined)
                      {
                          console.log("The error message");
                          $ionicPopup.alert({
                              title: 'Error',
                              template: "Registration failed: " + res.data.error.errmsg,
                              okText: 'ok',
                              okType: 'button-assertive'
                          });
                      }
                      else
                      {
                          $scope.registerform._id = res.data._id;
                          console.log("the registered id is :"+$scope.registerform._id);
                          $ionicPopup.alert({
                              title: 'Registration',
                              template: "You have successfully registered",
                              okText: 'ok',
                              okType: 'button-assertive'
                          });
                          console.log("The reg id is : "+$scope.registerform._id);
                          $location.path("/page14");
                      }
                  });
              };

              $scope.register = function ()
              {
                  for (var i = 0; i < sessionStorage.length; i++)
                  {    
                      var key = sessionStorage.key(i); 

                      $scope.registerform[key] = sessionStorage.getItem(key); 
                      console.log("key is : "+key+" and it\'s value is : "+$scope.registerform[key]);
                  } 
                      if($scope.registerform.gradday !== undefined) {
                      var dateData = $scope.registerform.gradday.split('/');
                      $scope.registerform.graduationDate = new Date(dateData[1], dateData[0], 1);
                  }
                  if($scope.professions[$scope.registerform.profession]==='student' || $window.localStorage.getItem("US")==="false")
                  {
                      console.log("I am an alien/student");
                      if($scope.registerform.npi)
                      {
                          delete $scope.registerform.npi;
                      }
                      $scope.NPI_clearance_received();
                  }
                  else
                  {
                      console.log("I am a US citizen");
                      model.get('npi', $scope.registerform.NPI).then(function (res)
                      {

                          if (res.data !== '' || res.data !== null)
                          {
                              if (res.data.result_count > 0 && typeof res.data.results[0].basic.first_name != 'undefined')
                              {
                                  if (res.data.results[0].basic.first_name.toLowerCase() == $scope.registerform.firstname.toLowerCase() && res.data.results[0].basic.last_name.toLowerCase() == $scope.registerform.lastname.toLowerCase())
                                  {
                                      $scope.NPI_clearance_received();
                                  }
                                  else
                                  {
                                      console.log("Reason 1");
                                      $ionicPopup.alert({
                                          title: 'NPI Verification',
                                          template: "Sorry, we could not verify your NPI number, please contact GIBLIB at contact@giblib.com",
                                          okText: 'OK',
                                          okType: 'button-assertive'
                                      });
                                  }
                              }
                              else if (res.data.result_count > 0 && typeof res.data.results[0].basic.name != 'undefined')
                              {
                                  if (res.data.results[0].basic.name.toLowerCase().indexOf($scope.registerform.firstname.toLowerCase()) > -1 && res.data.results[0].basic.name.toLowerCase().indexOf($scope.registerform.lastname.toLowerCase()) > -1)
                                  {
                                      $scope.NPI_clearance_received();
                                  }
                                  else
                                  {
                                      console.log("Reason 2");
                                      $ionicPopup.alert({
                                          title: 'NPI Verification',
                                          template: "Sorry, we could not verify your NPI number, please contact GIBLIB at contact@giblib.com",
                                          okText: 'OK',
                                          okType: 'button-assertive'
                                      });
                                  }
                              }
                              else
                              {
                                  console.log("Reason 3");
                                  $ionicPopup.alert({
                                      title: 'NPI Verification',
                                      template: "Sorry, we could not verify your NPI number, please contact GIBLIB at contact@giblib.com",
                                      okText: 'OK',
                                      okType: 'button-assertive'
                                  });
                              }
                          }
                      });
                  }
              };

              $scope.formatLabel = function (model, collection) {
                  if (collection) {
                      for (var i = 0; i < collection.length; i++) {
                          if (model === collection[i]._id) {
                              return collection[i].name;
                          }
                      }
                  }
                  return model;
              };

              registrationInit();
              registrationBirthdayInit();

          }]);
  })();
