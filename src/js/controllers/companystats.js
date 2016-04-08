'use strict';

angular.module('app')
.controller('CompanyStatsCtrl', ['$scope', '$http', '$state', 'acsManager', '$sce', '$modal', '$timeout', function($scope, $http, $state, acsManager, $sce, $modal, $timeout) {
    $scope.user = acsManager.info();

    $scope.coupons = [];

    if ($scope.user == null) {
      $state.go('access.signin');
      return;
    }

    acsManager.getCoupons(function(err, coupons) {
      $timeout(function() {
        $scope.coupons = coupons;
      }, 0);
    });

    $scope.stats = {
      numShares: 0,
      numRedeems: 0
    };
    
    acsManager.getCompanyStats(function(stats) {
        $timeout(function() {
          $scope.stats = stats;
        }, 0);
      });

}]);




