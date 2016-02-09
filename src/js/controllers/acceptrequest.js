'use strict';

angular.module('app')
.controller('AcceptRequestCtrl', ['$scope', '$http', '$state', 'acsManager', '$stateParams', function($scope, $http, $state, acsManager, $stateParams) {
    $scope.user = acsManager.info();

    if ($scope.user == null) {
      $state.go('access.signin');
      return;
    }

    $scope.provided = JSON.parse($stateParams.id);


    $scope.pageTitle = "Accept Request";
    $scope.chosenOne = "new";


    $scope.showAddCompany = function() {
      if ($scope.chosenOne == "new") {
        return true;
      }
      return false;
    };


    $scope.disableAcceptButton = function() {
      if ($scope.chosenOne != "new") {
        return false;
      }

      console.log($scope.companyInfo);

      if (!$scope.companyInfo) {
        return true; 
      }
    
      if (!$scope.companyInfo.name) {
        return true; 
      }

      if (!$scope.myCroppedImage) {
        return true; 
      }

      return false;
    };
    

    acsManager.getCompanies(function(err, companies) {
      $scope.companies = companies;
      console.log($scope.provided);
    }, function() {
      $scope.$apply();
    });



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





    $scope.acceptRequest = function() {
      
      acsManager.newCompany($scope.companyInfo.name, $scope.myCroppedImage, $scope.provided.user.objectId, function(c) {
        acsManager.acceptMerchantRequest($scope.provided.objectId, function() {
          $state.go("app.dashboard-super", {}, {
            reload: true
          });
        });
      });

    };

    $scope.removeImage = function() {
      acsManager.removeCompanyLogo(function() {
        $state.go($state.current, {}, {
          reload: true
        });
      });
      $scope.companyInfo.image = null;
    }



}]);




