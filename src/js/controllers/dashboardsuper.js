'use strict';

angular.module('app')
.controller('DashboardSuperCtrl', ['$scope', '$state', 'acsManager', function($scope, $state, acsManager) {
    $scope.user = acsManager.info();


   	$scope.coupons = [];
   	$scope.locations = [];

    if ($scope.user == null) {

    	$state.go('access.signin');
    	return;
    }



    acsManager.getCompanies(function(err, companies) {
        $scope.companies = companies;
        $scope.$apply();
    }, function() {
        $scope.$apply();
    });

    acsManager.numAllCoupons(function(err, num) {
        $scope.numCoupons = num;
        $scope.$apply();
    });



    acsManager.getTotalStats(function(err, stats) {
        $scope.stats = stats;
        $scope.$apply();
    });

}]);