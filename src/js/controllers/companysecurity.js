'use strict';

angular.module('app')
.controller('CompanySecurityCtrl', ['$scope', 'toaster', '$http', '$state', 'acsManager', '$sce', '$modal', '$filter', '$timeout', function($scope, toaster, $http, $state, acsManager, $sce, $modal, $filter, $timeout) {
	$scope.user = acsManager.info();

	$scope.invoices = [];

	if ($scope.user == null) {
		$state.go('access.signin');
		return;
	}

	var UpdateNumbers = function() {
		$scope.processing = true;
		acsManager.getBannedNumbers(function(bannedNumbers) {
			$scope.processing = false;
			$timeout(function() {
				$scope.numbers = bannedNumbers;
			}, 0);
		});
	};

	$scope.remove = function() {
		var id = this.c.id;
		$scope.processing = true;
		acsManager.removeBannedNumber(id, function() {
			$scope.processing = false;
			UpdateNumbers();
		});
	};

	$scope.add = function() {
		if (!$scope.newBannedNumber || !$scope.newBannedNumber.name || !$scope.newBannedNumber.phone) {
			toaster.pop("error", "Error", "Please fill up input boxes");
			return;
		}

		$scope.processing = true;
		acsManager.addBannedNumber($scope.newBannedNumber, function() {
			$scope.processing = false;
			UpdateNumbers();
			$scope.newBannedNumber = {};
		});
	};

	UpdateNumbers();

}]);

































