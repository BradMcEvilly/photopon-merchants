'use strict';

angular.module('app')
.controller('AddCouponCtrl', ['$scope', '$http', '$state', 'acsManager', '$sce', '$modal', '$filter', function($scope, $http, $state, acsManager, $sce, $modal, $filter) {
    $scope.user = acsManager.info();

    if ($scope.user == null) {
    	$state.go('access.signin');
    	return;
    }

    $scope.coupon = {
        locations: [],
        expiration: new Date()
    };

    acsManager.getCoupons(function(err, coupons) {
        $scope.coupons = coupons;
        $scope.$apply();
    });

    acsManager.getLocations(function(err, locations) {
        $scope.locations = locations;
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
// Expiration date



    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.minDate = new Date();
      $scope.opened = true;
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1,
      class: 'datepicker'
    };

    $scope.format = 'dd-MMMM-yyyy';



    $scope.addCoupon = function() {
      var locations = [];
      if (!$scope.alllocations) {
        for (var i = 0; i < $scope.coupon.locations.length; i++) {
          locations.push($scope.coupon.locations[i].id);
        };
      }

      acsManager.addCoupon({
        title: $scope.coupon.title,
        body: $scope.coupon.body,
        locations: locations,
        expiration: $scope.coupon.expiration
      }, function() {
        $state.go($state.current, {}, {
          reload: true
        });
      });
    };

}]);




angular.module('app').directive('datepickerPopup', function (dateFilter, datepickerPopupConfig) {
    return {
        restrict: 'A',
        priority: 1,
        require: 'ngModel',
        link: function(scope, element, attr, ngModel) {
            var dateFormat = attr.datepickerPopup || datepickerPopupConfig.datepickerPopup;
            ngModel.$formatters.push(function (value) {
                return dateFilter(value, dateFormat);
            });
        }
    };
});


