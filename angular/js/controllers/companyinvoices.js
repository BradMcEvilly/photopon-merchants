'use strict';

angular.module('app')
.controller('CompanyInvoicesCtrl', ['$scope', '$http', '$state', 'acsManager', '$sce', '$modal', '$filter', function($scope, $http, $state, acsManager, $sce, $modal, $filter) {
    $scope.user = acsManager.info();

    $scope.invoices = [];

    if ($scope.user == null) {
      $state.go('access.signin');
      return;
    }

    acsManager.getCompanyInvoices(function(err, invoices) {
      $scope.invoices = invoices;
      $scope.$apply();
    });


}]);




