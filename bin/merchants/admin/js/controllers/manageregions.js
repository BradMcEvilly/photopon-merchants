'use strict';

angular.module('app')
.controller('ManageRegions', ['$scope', 'toaster', '$http', '$state', 'acsManager', '$sce', '$timeout', function($scope, toaster, $http, $state, acsManager, $sce, $timeout, $stateParams) {
    $scope.user = acsManager.info();
    
    if ($scope.user == null) {
        $state.go('access.signin');
        return;
    }

    function isNormalInteger(str) {
        var n = ~~Number(str);
        return String(n) === str && n >= 0;
    }


    function LoadEverything() {

        acsManager.getZipCodes(function(err, zipCodes) {
             $timeout(function () {
                $scope.zipCodes = zipCodes;

            }, 0);

        });

        $scope.newZipCode = "";
    };

    $scope.removeZipCode = function() {
        var id = this.c.id;
        acsManager.removeZipCode(id, LoadEverything);
    };

    $scope.enableArea = function() {
        var zip = $scope.newZipCode;

        if (zip.length == 5 && isNormalInteger(zip)) {
            acsManager.addZipCode(parseInt(zip, 10), LoadEverything);
        } else {
            toaster.pop("error", "Error", "Please fill in valid US zip code");
        }
    };


    LoadEverything();

}]);



