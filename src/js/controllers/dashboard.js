'use strict';

angular.module('app')
.controller('DashboardCtrl', ['$scope', '$state', 'acsManager', '$timeout', 'toaster', '$modal', '$stateParams', '$document', function($scope, $state, acsManager, $timeout, toaster, $modal, $stateParams, $document) {
    $scope.user = acsManager.info();



   	$scope.coupons = [];
   	$scope.locations = [];

    if ($scope.user == null) {

    	$state.go('access.signin');
    	return;
    }


    $scope.goToAddCoupons = function() {
        if ($scope.locations.length > 0) {
            $state.go('app.addcoupon');
        } else {
            toaster.pop("warning", "No Location", "Please add your business locations first. You need business locations to attach your coupons to them.");
        }
    };


    var MaybeShowTutorial = function() {
        if ($scope.locations.length == 0) {
            ShowOverlayFor($document.find(".tutorial-add-location-button"), $scope);
        }

        if ($scope.coupons.length == 0 && $scope.locations.length > 0) {
            ShowOverlayFor($document.find(".tutorial-add-coupon-button"), $scope);
        }

        if ($scope.coupons.length == 1 && $scope.locations.length > 0) {
            ShowOverlayFor($document.find(".tutorial-analytics-nav"), $scope);
        }
    };

    var waitingFor = 2;


    acsManager.getCoupons(function(err, coupons) {
        $timeout(function() {
            $scope.coupons = coupons;
            waitingFor = waitingFor - 1;

            if (waitingFor == 0) {
                MaybeShowTutorial();
            }
        }, 0);
    });
    acsManager.getLocations(function(err, locations) {
        $timeout(function() {
            $scope.locations = locations;
            waitingFor = waitingFor - 1;

            if (waitingFor == 0) {
                MaybeShowTutorial();
            }
        }, 0);
    });

    acsManager.getCompanyStats(function(stats) {
        $timeout(function() {
            $scope.stats = stats;
        }, 0);
    });


    if ($stateParams.action == "help") {
            
        var modalInstance = $modal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'myModalContent.html',
          controller: 'TutorialController',
          size: 'lg'
        });
    }
}]);







angular.module('app')
.controller('TutorialController', ['$scope', '$state', 'acsManager', '$timeout', 'toaster', '$modalInstance', function($scope, $state, acsManager, $timeout, toaster, $modalInstance) {

    
    $scope.currentStep = 0;

    $scope.skip = function() {
        $modalInstance.close();
    };

    $scope.next = function() {
        $scope.currentStep++;
    };

    $scope.prev = function() {
        $scope.currentStep--;
    };





}]);






