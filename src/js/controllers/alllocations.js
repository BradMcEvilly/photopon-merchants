'use strict';

angular.module('app')
.controller('AllLoctionsCtrl', ['$scope', '$http', '$state', 'acsManager', '$sce', '$modal', function($scope, $http, $state, acsManager, $sce, $modal) {
    $scope.user = acsManager.info();

    if ($scope.user == null) {
    	$state.go('access.signin');
    	return;
    }


    $scope.locations = [];
	acsManager.getLocations(function(err, locations) {
    	$scope.locations = locations;
    });


}]);

