'use strict';

angular.module('app')
.controller('HeaderBarCtrl', ['$scope', '$state', 'acsManager', function($scope, $state, acsManager) {
    var user = acsManager.info();
    if (user == null) {
    	$state.go('access.signin');
    	return;
    }

    var file = user.get("image");

    $scope.user = {
    	username: user.getUsername(),
    	photo: file.url()
    };

    console.log($scope.user);
    console.log(user);



}]);