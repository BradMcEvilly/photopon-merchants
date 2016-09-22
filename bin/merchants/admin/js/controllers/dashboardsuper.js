'use strict';

app.filter('dize', function() {
  return function(input) {
    if (input === undefined) {
        return "?";
    }

    return input;
  };
});

app.filter('dizeusd', function() {
  return function(input) {
    if (input === undefined) {
        return "?";
    }

    return "$" + Math.floor(input * 100) / 100;
  };
});


app.controller('DashboardSuperCtrl', ['$scope', '$state', 'acsManager', '$timeout', function($scope, $state, acsManager, $timeout) {
    $scope.user = acsManager.info();

    if (!acsManager.isAdmin()) {
        $state.go('access.signin');
        return;
    }


   	$scope.coupons = [];
   	$scope.locations = [];
   

    $scope.reviewRequest = function() {
        $state.go("app.acceptrequest", { obj: this.r });
    };



    acsManager.getCompanies(function(err, companies) {
        $timeout(function() {
            $scope.companies = companies;
        }, 0);
    }, function() {
        $scope.$apply();
    });

    acsManager.numAllCoupons(function(err, num, activeCount) {
         $timeout(function() {
            $scope.numCoupons = num;
            $scope.numActiveCoupons = activeCount;
        }, 0);
    });


    acsManager.numPhotopons(function(err, num) {
         $timeout(function() {
            $scope.totalPhotopons = num;
        }, 0);
    });



    acsManager.getTotalStats(function(err, stats) {
         $timeout(function() {
            $scope.stats = stats;
            console.log(stats);
        }, 0);
    });

    acsManager.getUserStats(function(err, stats) {
         $timeout(function() {
            $scope.userStats = stats;
        }, 0);
    });


    acsManager.getMerchantRequests(function(err, requests) {
         $timeout(function() {
            $scope.requests = requests;
        }, 0);
    });

}]);





