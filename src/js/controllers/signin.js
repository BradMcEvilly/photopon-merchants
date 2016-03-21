'use strict';

/* Controllers */
  // signin controller
app.controller('SigninFormController', ['$scope', '$http', '$state', 'acsManager', function($scope, $http, $state, acsManager) {
	$scope.user = {};
	$scope.authError = null;


	var GoToDashboard = function() {
		var userInfo = acsManager.info();
		
		if (!userInfo.get("isMerchant")) {
			$scope.authError = "You have no permission to log in. Please send merchant request from Photopon app to get merchant access.";
			return;
		}

	  	if (userInfo.get("isSuperUser")) {
			$state.go('app.dashboard-super');
	  	} else {
			$state.go('app.dashboard-merchant');
	  	}
	}
	
	$scope.login = function() {
		$scope.authError = null;
		acsManager.login($scope.user.username, $scope.user.password, function(err, userInfo) {
			if (err) {
				$scope.authError = err.message;
				return;
		  	}

		  	GoToDashboard();

		});
	};

	if (acsManager.loggedIn()) {
		GoToDashboard();
	}

}]);