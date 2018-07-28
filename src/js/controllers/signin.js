'use strict';

/* Controllers */
  // signin controller
app.controller('SigninFormController', ['$scope', '$http', '$state', 'acsManager', '$timeout', function($scope, $http, $state, acsManager, $timeout) {
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
				$timeout(function () {
					$scope.authError = err.message;
	    		}, 0);
				return;
		  	}
		  	$timeout(function () {
		    	GoToDashboard();
    		}, 0);

		});
	};

	if (acsManager.loggedIn()) {
		GoToDashboard();
	}

}]);



app.controller('ForgotPasswordFormController', ['$scope', '$http', '$state', 'acsManager', '$timeout', function($scope, $http, $state, acsManager, $timeout) {

	$scope.resetPassword = function() {
		$scope.authError = null;
		acsManager.forgot($scope.email, function(err) {
			if(err){
				$timeout(function () {
					$scope.authError = err.message;
	    		}, 0);
				return;
			}else{
				$timeout(function () {
					$scope.isCollapsed = !$scope.isCollapsed;
				}, 0);
    		}
			
			
		});
	};


}]);


app.controller('ValidateEmailController', ['$scope', '$http', '$state', 'acsManager', '$timeout','$stateParams', function($scope, $http, $state, acsManager, $timeout,$stateParams) {

	var token;
    if ($stateParams) {
        $scope.token = $stateParams.token;
    }

	
	acsManager.validateEmail($scope.token, function(err) {
			console.log(err);
			if(err){
				$timeout(function () {
					$scope.validToken = false
					$scope.errMessage = err.message;
	    		}, 0);
				return;
			}else{
				$timeout(function () {
					$scope.validToken = true;
				}, 0);
    		}
			
			
	});


}]);



