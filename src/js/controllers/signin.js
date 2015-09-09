'use strict';

/* Controllers */
  // signin controller
app.controller('SigninFormController', ['$scope', '$http', '$state', 'acsManager', function($scope, $http, $state, acsManager) {
	$scope.user = {};
	$scope.authError = null;
	
	$scope.login = function() {
		$scope.authError = null;
		acsManager.login($scope.user.username, $scope.user.password, function(err, userInfo) {
			if (err) {
				$scope.authError = err.message;
				return;
		  }
			$state.go('app.dashboard-v3');			
		});
	};

	acsManager.login("hayk", "norisk", function(err, userInfo) {
		if (err) {
			$scope.authError = err.message;
			return;
		}
		$state.go('app.dashboard-v3');			
	});
}]);