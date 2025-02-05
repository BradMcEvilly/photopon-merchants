'use strict';

angular.module('app')
.controller('AddCouponCtrl', ['$scope', '$http', '$state', 'acsManager', '$sce', '$modal', '$filter', '$timeout', '$document', function($scope, $http, $state, acsManager, $sce, $modal, $filter, $timeout, $document) {
    $scope.user = acsManager.info();

    if ($scope.user == null) {
    	$state.go('access.signin');
    	return;
    } 

    $scope.coupon = {
        locations: [],
        expiration: new Date(),
        givetoget: "3", 
        oneperuser: true
    };

    acsManager.getCoupons(function(err, coupons) {
        $timeout(function() {
          $scope.coupons = coupons;

          if ($scope.coupons.length == 0) {
            ShowOverlayFor($document.find(".tutorial-gtg-item"), $scope);

          }
       }, 0);
        
    });

    acsManager.getLocations(function(err, locations) {
        
        $scope.locationNames = [];
        
        for (var i = 0; i < locations.length; i++) {
          $scope.locationNames[i] = locations[i].get("name");
        }

        $timeout(function() {
          $scope.locations = locations;
        }, 0);
        
    });



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


      var locationIds = [];
      var allLocationObjects = $scope.locations;

      if (!$scope.alllocations) {

        for (var i = 0; i < $scope.coupon.locations.length; i++) {
          for (var j = 0; j < allLocationObjects.length; j++) {

            if (allLocationObjects[j].get("name") == $scope.coupon.locations[i]) {
              locationIds.push(allLocationObjects[j].id);
            }
          };
        };
      }

      acsManager.addCoupon({
        title: $scope.coupon.title,
        body: $scope.coupon.body,
        code: $scope.coupon.code,
        oneperuser: $scope.coupon.oneperuser,
        locations: locationIds,
        givetoget: $scope.coupon.givetoget,
        expiration: $scope.coupon.expiration,
        isActive: true
      }, function() {
          $state.go("app.dashboard-merchant");
      });
    };

}]);









angular.module('app')
.controller('EditCouponCtrl', ['$scope', '$http', '$state', 'acsManager', '$sce', '$modal', '$filter', '$stateParams', '$timeout', function($scope, $http, $state, acsManager, $sce, $modal, $filter, $stateParams, $timeout) {
 
    var id = $stateParams.id;
    $scope.user = acsManager.info();

    $scope.isEditing = true;


    if ($scope.user == null) {
      $state.go('access.signin');
      return;
    }

    $scope.coupon = {
        locations: []
    };


    acsManager.getLocations(function(err, locations) {
        $scope.locationNames = [];
        
        for (var i = 0; i < locations.length; i++) {
          $scope.locationNames[i] = locations[i].get("name");
        }

        $timeout(function() {
          $scope.locations = locations;
        }, 0);
        
        acsManager.getCoupon(id, function(err, coupon) {
          $timeout(function() {
            $scope.coupon.title = coupon.get("title");
            $scope.coupon.body = coupon.get("description");
            $scope.coupon.expiration = coupon.get("expiration");
            $scope.coupon.code = coupon.get("code");
            $scope.coupon.givetoget = (coupon.get("givetoget") || 0) + "";
            $scope.coupon.oneperuser = coupon.get("oneperuser");

            
            var locs = coupon.get("locations");
            $scope.coupon.alllocations = (locs.length == 0);

            for (var i = 0; i < locs.length; i++) {

              for (var j = 0; j < locations.length; j++) {
                if (locations[j].id == locs[i]) {
                  $scope.coupon.locations.push(locations[j].get("name"));
                }
              };

            };

          });
          
        });
    });





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
      console.log("Edit coupon");
      
      var locationIds = [];
      var allLocationObjects = $scope.locations;

      if (!$scope.alllocations) {

        for (var i = 0; i < $scope.coupon.locations.length; i++) {
          for (var j = 0; j < allLocationObjects.length; j++) {

            if (allLocationObjects[j].get("name") == $scope.coupon.locations[i]) {
              locationIds.push(allLocationObjects[j].id);
            }
          };
        };
      }

      acsManager.editCoupon(id, {
        title: $scope.coupon.title,
        body: $scope.coupon.body,
        code: $scope.coupon.code,
        oneperuser: $scope.coupon.oneperuser,
        givetoget: $scope.coupon.givetoget,
        locations: locationIds,
        expiration: $scope.coupon.expiration
      }, function() {
        $state.go("app.coupons", {}, {
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


