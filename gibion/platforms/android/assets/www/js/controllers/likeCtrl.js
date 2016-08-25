(function () {
    'use strict';

    angular
        .module('controller.like', [])
        .controller('likeCtrl', ['$scope', '$state', 'model', '$ionicHistory', function ($scope,$state,model,$ionicHistory) {
          $scope.opinion;
          $scope.commentsreceived = $state.params.comms;
          $scope.video_id = $state.params.videoid;

          $scope.respond = function (id, _id, response) 
          {
              var reply = 
              {
                  parent: _id,
                  text: response
              };
              model.post('reply', reply).then(function (res) 
              {
                  model.get('comments', id).then(function (res) 
                  {
                      $scope.commentsreceived = res.data;
                  });
              });
          };

          $scope.addComment = function () 
          {
              var comment = {};
              comment.video = $scope.video_id;
              comment.text = $scope.opinion;
              model.post('comments', comment).then(function (res) 
              {
                  model.get('comments', $scope.video_id).then(function (res) 
                  {
                      $scope.commentsreceived = res.data;
                      console.log (res.data);
                      $scope.opinion = "";
                  });
              });
          };

        $scope.back = function () 
        {
            $ionicHistory.goBack();
        }

        }]);

})();

