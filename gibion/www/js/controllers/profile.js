(function ()
{
    'use strict';

    angular
        .module('controller.profile', [])
        .controller('Profile', ['$scope','$stateParams','$sce', 'model', 'auth','$q','uploader','$state', function ($scope,$stateParams,$sce , model ,auth ,$q ,uploader ,$state)
        {

         $scope.reload = function()
                    {
                        $ionicLoading.hide();
                        $window.location.reload(true);
                    }

            console.log("dr");
            var vm = this;
            $scope.name=auth.getUser().fullname;
            $scope.picture= auth.getUser().avatar;
            var searchPattern  = new RegExp("images");
            if(searchPattern.test($scope.picture))
            {
                $scope.picture = "img/avatar_default.png";
            }
            vm.profile = [];
            vm.obtID = [];
            vm.uploadIDs = [];
            vm.uploadsrc = {};
            vm.uploadtitles = {};
            vm.uploadthumbnails = {};
            vm.uploadspecialty = {};
            vm.profileCopy = [];
            vm.avatar = null;
            vm.alerts = [];
            vm.isUploading = false;
            vm.isYoutube = {};
            var vjs = null;
            vm.followed=false;

            $scope.$on('$stateChangeSuccess', function ()
            {
                if($state.current.name === 'doctor')
                {
                    console.log("I have entered the state "+$state.current.name);
                    vm.getFollows($stateParams.doctor);
                }
            });

            function activate()
            {
                vm.obtID = $stateParams.doctor;
                getUserDetails();
                getSpecialties();
            }

            activate();

            vm.getFollows = function (doctor)
            {
                model.get('followers', doctor).then(function (res)
                {
                    var user = auth.getUser();
                    console.log("cur user id" +user._id);
                    vm.follows = res.data;
                    vm.follMsg = "+ Follow";
                    for (var i = 0; i < vm.follows.length; i++)
                    {
                        if(vm.follows[i].follower === null)
                        {

                        }
                        else if (vm.follows[i].follower._id && vm.follows[i].follower._id == user._id)
                        {
                            vm.follMsg = "+ Followed";
                            vm.followed = true;
                        }
                    }
                });
            };

            vm.followDoctor = function(doctor)
            {
                vm.followed = true;
                console.log(auth.getUser());
                var followee =
                {
                    doctor: doctor
                };
                model.post('follow', followee).then(function (res)
                {
                    vm.getFollows(doctor);
                });
            }

            vm.unfollowDoctor = function(doctor)
            {
                vm.followed = false;
                model.delete('follow', doctor).then(function (res)
                {
                    vm.getFollows(doctor);
                });
            }


            function updateUser(user)
            {
                return model.post('user', user)
                .then(function (res)
                {
                    if (res.data.error)
                    {
                        vm.alerts.push({
                            type: 'danger',
                            msg: 'There was an error updating your profile, please try again later.'
                        });
                        console.log('Updating error', res.data.error);
                        return res.data.error;
                    }
                    else if (res.data)
                    {
                        vm.alerts.push({
                            type: 'success',
                            msg: 'Success! Your profile has been updated.'
                        });
                        return res.data;
                    }
                });
            }

            function getOrganizations()
            {
                model.get('organization')
                .then(function (res)
                {
                    vm.organizations = res.data;
                });
            }

            function getSpecialties()
            {
                model.get('specialty')
                .then(function (res)
                {
                    vm.specialties = res.data;
                });
            }

            function getUserDetails()
            {
                console.log("inside getuserdetails");
                var userid = $stateParams.doctor || auth.getUser()._id;
                console.log("doctor's id check in profile.js");
                model.get('user', userid)
                .then(function (user)
                {
                    if (user.data.organizations === null || user.data.organizations.length < 1)
                    {
                        user.data.organizations = [];
                        user.data.organizations[0] = {};
                    }
                    vm.profile =
                    {
                        _id: userid,
                        name: user.data.name,
                        specialties: user.data.specialties,
                        workplaces: user.data.organizations,
                        avatar: user.data.avatar,
                        aboutme: user.data.aboutme,
                        salutation: user.data.salutation,
                        profession: user.data.profession,
                        featuredvideo: user.data.featuredvideo,
                        fullname: user.data.salutation + ' ' + user.data.fullname,
                    };

                    console.log("doctor id");
                    console.log(vm.profile._id);

                    if (user.data.specialties  && user.data.specialties.length > 0)
                    {
                        vm.specialty = user.data.specialties[0].name.toLowerCase();
                    }
                    else
                    {
                        vm.profile.specialties = [];
                        vm.profile.specialties[0] = {};
                    }
                    if (user.data.residencies !== null && user.data.residencies.length > 0)
                    {
                        getResidencies(user.data.residencies)
                        .then(function (res)
                        {
                            vm.profile.residencies = res;
                        });
                    }
                    else
                    {
                        vm.profile.residencies = [];
                        vm.profile.residencies[0] = {};
                    }

                    if (user.data.medicalSchools !== null && user.data.medicalSchools.length > 0)
                    {
                        getSchools(user.data.medicalSchools)
                        .then(function (res)
                        {
                            vm.profile.schools = res;
                        });
                    }
                    else
                    {
                        vm.profile.schools = [];
                        vm.profile.schools[0] = {};
                    }

                    if (user.data.fellowships !== null && user.data.fellowships.length > 0)
                    {
                        getSchools(user.data.fellowships)
                        .then(function (res)
                        {
                            vm.profile.fellowships = res;
                        });
                    }
                    else
                    {
                        vm.profile.fellowships = [];
                        vm.profile.fellowships[0] = {};
                    }

                    getUploads('uploader', userid)
                    .then(function (res)
                    {
                        for(var i=0;i<res.length;i++)
                        {
                            vm.uploadIDs.push(res[i]);
                        }
                        vm.profile.uploads = res;
                    });
                });
            }

            function getResidencies(orgIds)
            {
                var residencies = [];
                orgIds.forEach(function (id, index)
                {
                    var promise = model.get('organization', orgIds[index])
                    .then(function (res)
                    {
                        return res.data;
                    });
                    residencies.push(promise);
                });
                return $q.all(residencies);
            }

            function getSchools(orgIds)
            {
                var schools = [];
                orgIds.forEach(function (id, index)
                {
                    var promise = model.get('organization', orgIds[index])
                    .then(function (res)
                    {
                        return res.data;
                    });
                    schools.push(promise);
                });
                return $q.all(schools);
            }

            function getUploads(field, userid)
            {
                return model.get('video', field, userid)
                .then(function (res)
                {
                    for(var i=0;i<res.data.length;i++)
                    {
                        console.log(res.data[i].thumbnail);
                    }
                    return res.data;
                });
            }

            vm.uploadAvatar = function (avatar)
            {
                if (avatar)
                {
                    vm.isUploading = true;
                    uploader.uploadFile(avatar, vm.profile._id, 'image')
                    .then(function (response)
                    {
                        if (response.error)
                        {
                            vm.isUploading = false;
                            return console.log('error uploading:', response.error);
                        }
                        var url = 'https://d3qvvqcer8e0wf.cloudfront.net/',
                        fileKey = response.config.data.key,
                        avatarPath = url + fileKey;
                        var avatarPayload = {};
                        avatarPayload._id = vm.profile._id;
                        avatarPayload.avatar = avatarPath;

                        updateUser(avatarPayload)
                        .then(function (res)
                        {
                            vm.profile.avatar = avatarPath;
                            vm.isUploading = false;
                        });
                    });
                }
                else
                {
                    console.log('no file selected');
                }
                console.log('uploadAvatar function called', avatar);
            };

            vm.hoverIn = function (section)
            {
                if (section === 'avatar')
                {
                    this.isHoverAvatar = true;
                }
            };

            vm.hoverOut = function (section)
            {
                if (section === 'avatar')
                {
                    this.isHoverAvatar = false;
                }
            };

            vm.editForm = function (name)
            {
                vm.profileCopy = angular.copy(vm.profile);
                getOrganizations();
                vm.isEditing = true;
            };

            vm.exitForm = function ()
            {
                vm.profile = vm.profileCopy;
                vm.isEditing = false;
            };

            vm.saveForm = function (user)
            {
                var updatedUser = {};
                updatedUser._id = user._id;

                if (user.specialties[0]._id)
                {
                    updatedUser.specialties = user.specialties;
                }
                if (user.residencies[0]._id)
                {
                    updatedUser.residencies = user.residencies;
                }
                if (user.schools[0]._id)
                {
                    updatedUser.medicalSchools = user.schools;
                }
                if (user.fellowships[0]._id)
                {
                    updatedUser.fellowships = user.fellowships;
                }
                if (user.workplaces[0]._id)
                {
                    updatedUser.organizations = user.workplaces;
                }
                updatedUser.aboutme = user.aboutme;

                updateUser(updatedUser);
                vm.isEditing = false;
            };

            vm.closeAlert = function (index)
            {
                vm.alerts.splice(index, 1);
            };

            vm.toggleFollow = function (doctorId, index)
            {
                vm.profile.following[index].isUnfollowed = !vm.profile.following[index].isUnfollowed;
            };

            vm.removefav = function ()
            {
                var userid = $stateParams.doctor || auth.getUser()._id;
                if (vm.unfavid)
                {
                    delFavorites(vm.unfavid, userid);
                    vm.removeWarning = '';
                }
                else
                {
                    vm.removeWarning = 'CLICK AGAIN TO REMOVE';
                }
            };

            vm.startplaying = function (id)
            {
                var videoload =
                {
                    source : $sce.trustAsResourceUrl(id.src),
                    posterimage : id.thumbnail,
                    yetToPlay: true
                }
                if(vm.isYT(id.src))
                {
                    $state.go('play_youtube', { videodetails : videoload });
                }
                else
                {
                    $state.go('play', { videodetails : videoload });
                }
            }

            function getYTId(url)
            {
                var regex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                var match = url.match(regex);
                if (match && match[2].length == 11)
                {
                    return 'https://www.youtube.com/embed/' + match[2];
                }
                else
                {
                    return 'error';
                }
            }

            vm.isYT = function (url)
            {
                return url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);
            }

            vm.getVideo = function ()
            {
                model.get('video', '_id', vm.profile.featuredvideo[0]._id).then(function (res)
                {
                    vm.current = res.data[0];
                    vm.current.embed = getYTId(res.data[0].src);

                    if (auth.getUser()._id === res.data[0].uploader._id)
                    {
                        vm.isOwner = true;
                    }

                    videojs(document.getElementById('videoplayer')).dispose();
                    angular.element('<video id="videoplayer" class="video-js"></video>').appendTo(document.getElementById('videocontainer'));

                    if (vm.isYT(vm.current.src))
                    {
                        vjs = videojs('videoplayer',
                        {
                            techOrder: [
                                "youtube"
                            ]
                        });
                    }
                    else
                    {
                        vjs = videojs('videoplayer',
                        {
                            techOrder: [
                                "html5",
                                "flash"
                            ]
                        });
                    }

                    vjs.src(vm.current.src);
                    vjs.poster(vm.current.thumbnail);
                    vjs.aspectRatio("16:9");
                    vjs.autoplay(false);
                    vjs.controls(true);

                    vjs.on('play', function ()
                    {
                        if (!hasBeenCounted)
                        {
                            model.post('views', {video: vm.current._id}).then(function (res)
                            {
                                hasBeenCounted = true;
                            });
                        }
                    });
                });
            };

        }]);
})();
