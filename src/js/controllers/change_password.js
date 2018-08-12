'use strict';

angular.module('app')
.controller('ChangePasswordCtrl', ['$scope', '$http', '$state', 'acsManager', '$sce', '$modal', '$filter', '$timeout', function($scope, $http, $state, acsManager, $sce, $modal, $filter, $timeout) {
    
    var user = acsManager.info();
    
    $scope.user = user;
   
   $scope.inputs={}
    
	 $scope.isTemp = user.get("isTempPassword");
	 
	 
	 
	 $scope.changePassword = function() {
		$scope.formError = null;
		$scope.formSuccess = null;
		
		if($scope.inputs.password != $scope.inputs.password2){
		
				return $scope.formError = "Passwords must match";
		}
		
		if($scope.inputs.password.length < 8){
		
				return $scope.formError = "Password must be at least 8 characters.";
		}
		
		
		
		acsManager.changePassword($scope.inputs.password, function(err) {
			if(err){
				$timeout(function () {
					$scope.formError = err.message;
	    		}, 0);
				return;
			}else{
				$timeout(function () {
					if($scope.isTemp){
					
						if (user.get("isSuperUser")) {
								$state.go('app.dashboard-super');
	  					} else {
							$state.go('app.dashboard-merchant');
	  					}
					
					}else{
						$scope.formSuccess = "Your password has been successfully changed.";
					}
				}, 0);
    		}
			
			
		});
		
		
	};

	 
}]);






