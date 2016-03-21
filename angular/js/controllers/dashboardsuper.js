'use strict';

app.controller('DashboardSuperCtrl', ['$scope', '$state', 'acsManager', function($scope, $state, acsManager) {
    $scope.user = acsManager.info();


   	$scope.coupons = [];
   	$scope.locations = [];

    if ($scope.user == null) {

    	$state.go('access.signin');
    	return;
    }

    if (!$scope.user.get("isSuperUser")) {
        $state.go('app.dashboard-merchant');
        return;
    }


    $scope.denyRequest = function() {
        acsManager.denyMerchantRequest(this.r.id, function() {

            acsManager.getMerchantRequests(function(err, requests) {
                $scope.requests = requests;
                $scope.$apply();
            });

        });
    };

    $scope.acceptRequest = function() {
        $state.go("app.acceptrequest", { obj: this.r });
    };



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


    acsManager.getMerchantRequests(function(err, requests) {
        $scope.requests = requests;
    });

}]);