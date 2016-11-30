'use strict';

angular.module('app')
.controller('QRCodeCtrl', ['$scope', 'toaster', '$http', '$state', 'acsManager', '$sce', '$modal', '$filter', '$timeout', '$stateParams', function($scope, toaster, $http, $state, acsManager, $sce, $modal, $filter, $timeout, $stateParams) {
    $scope.user = acsManager.info();
    
    if (!acsManager.loggedIn()) {
        $state.go('access.signin');
        return;
    }

    if (!$stateParams.location && !$stateParams.all) {
        $state.go('access.signin');
        return;
    }


    console.log($stateParams);

    $scope.download = function() {
        window.location = $scope.picUrl + "&download";
    };


    acsManager.getCompany(function(err, c) {
        
        $scope.picUrl = "/merchants/admin/api/qrcode.php?t=" + (new Date().getTime());
        console.log(c);
        var cid = c.id;
        $scope.picUrl += "&company="+cid;
        if ($stateParams.location) {
            $scope.picUrl += "&location="+$stateParams.location;
        }

    });


}]);






