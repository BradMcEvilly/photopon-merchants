'use strict';

/* Controllers */
  // signin controller
app.controller('RequestFormController', ['$scope', '$http', '$state', 'acsManager', '$timeout', function($scope, $http, $state, acsManager, $timeout) {
	$scope.user = {};

  $scope.currentUser = acsManager.info();

  $scope.isExistingAccount = 1;


  $scope.currentStep = 1;
  $scope.isProcessing = false;

  var stepCallbacks = [];
  var storedCode = "";

//$scope.myCroppedImage
  $scope.signout = function() {
    acsManager.logout();
    $state.go($state.current, {}, {
      reload: true
    });
  };



  $scope.gotoNextStep = function () {

      $scope.isProcessing = true;
      var nextStep = 0;

      nextStep = stepCallbacks[$scope.currentStep - 1](function(hasError) {
          $timeout(function() {
            $scope.isProcessing = false;
            if (!hasError)
              $scope.currentStep = nextStep;
          }, 0);

      });
      
  };



  var LoginOrSignup = function(doneCallback) {
    $scope.authError = null;
    var isExisting = $scope.isExistingAccount;


    if (isExisting) {
      acsManager.login($scope.user.username, $scope.user.password, function(err, user) {
        if (err) {
            $timeout(function () {
              $scope.authError = err.message;
              doneCallback(true);
            }, 0);
            return;
        }
        doneCallback();
      });


    } else {
        
      acsManager.register($scope.user.username, $scope.user.password, $scope.user.email, $scope.user.mobile, function(err, user) {
        if (err) {
            $timeout(function () {
              $scope.authError = err.message;
            }, 0);

            doneCallback(true);
            return;
        }


        doneCallback();
      });

      
    }

    return 2;
  };


  var StoreBusinessInfo = function(doneCallback) {

      //if ($scope.fileselected) {
      //  $scope.user.file = $scope.myCroppedImage;
      //}
      
      if (!$scope.user.companyname || $scope.user.companyname == "") {
        $scope.requestError = "Please provide company name.";
        doneCallback(true);
        return 4;
      }

      if (!$scope.user.taxid || $scope.user.taxid == "") {
        $scope.requestError = "Please provide EIN information about your company.";
        doneCallback(true);
        return 4;
      }
      
      if (!$scope.user.phonenumber || $scope.user.phonenumber == "") {
        $scope.requestError = "Please provide phone number.";
        doneCallback(true);
        return 4;
      }


      var CreateRequest = function() {
        acsManager.createMerchantRequest($scope.user, function(err) {
          $timeout(function () {
            if (err) {
              $scope.requestError = err;
              doneCallback(true);
              return;
            }
            acsManager.logout();
            doneCallback();
          }, 0);
        });
      };

      if ($scope.user.promocode && $scope.user.promocode != "") {
        acsManager.checkRepID($scope.user.promocode, function(isAvailable, err, rep) {
          if (!isAvailable) {
            $scope.user.rep = rep;


            CreateRequest();
          } else {
            $timeout(function () {
              $scope.requestError = "Can not find referral code.";
              doneCallback(true);
            }, 0);
          }
        });
        
      } else {
        CreateRequest();
      }

      return 4;
  };


  var VerifyMobileNumber = function(doneCallback) {

    if ($scope.user.verificationInput != storedCode) {
      $scope.verificationError = "Wrong verification code";
    }

    $timeout(function() {
      doneCallback($scope.user.verificationInput != storedCode);
    }, 50);
    return 2;
  };

  var Congrats = function(doneCallback) {
    return -1;
  };


  stepCallbacks.push(LoginOrSignup);
  stepCallbacks.push(StoreBusinessInfo);
  stepCallbacks.push(VerifyMobileNumber);
  stepCallbacks.push(Congrats);


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