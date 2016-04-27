'use strict';

/* Controllers */
  // signin controller
app.controller('RequestFormController', ['$scope', '$http', '$state', 'acsManager', '$timeout', function($scope, $http, $state, acsManager, $timeout) {
	$scope.user = {};



// Image cropping
    $scope.myImage = '';
    $scope.myCroppedImage = '';
    $scope.cropType = "square";

    var handleFileSelect = function(evt) {
      var file = evt.currentTarget.files[0];
      var reader = new FileReader();
      reader.onload = function (evt) {
        $scope.$apply(function($scope){
          $scope.myImage=evt.target.result;
          $scope.fileselected = true;
        });
      };
      reader.readAsDataURL(file);
    };
    angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);



}]);