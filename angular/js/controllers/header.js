'use strict';

angular.module('app')
.controller('HeaderBarCtrl', ['$scope', '$state', 'acsManager', function($scope, $state, acsManager) {
    $scope.user = acsManager.info();
    if ($scope.user == null) {
    	$state.go('access.signin');
    	return;
    }

    console.log($scope.user);



}]);