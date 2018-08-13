'use strict';

angular.module('app')
.controller('QRCodeCtrl', ['$scope', 'toaster', '$http', '$state', 'acsManager', '$sce', '$modal', '$filter', '$timeout', '$stateParams', 'ENV', function($scope, toaster, $http, $state, acsManager, $sce, $modal, $filter, $timeout, $stateParams, ENV) {
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
        
        $scope.picUrl = ENV.qr_base+"?t=" + (new Date().getTime());
        console.log(c);
        var cid = c.id;
        $scope.picUrl += "&company="+cid;
        if ($stateParams.location) {
            $scope.picUrl += "&location="+$stateParams.location;
        }

    });


}]);






