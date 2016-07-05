'use strict';

angular.module('app')
.controller('ManageRegions', ['$scope', 'toaster', '$http', '$state', 'acsManager', '$sce', '$timeout', function($scope, toaster, $http, $state, acsManager, $sce, $timeout, $stateParams) {
    $scope.user = acsManager.info();
    
    if ($scope.user == null) {
        $state.go('access.signin');
        return;
    }


    $scope.polys = [];

    $scope.mapOptions = {
        zoom: 3,
        center: {lat: 37.2584114, lng: -104.652163},
        mapTypeId: google.maps.MapTypeId.TERRAIN
    };

    var allZips = {};


    function isNormalInteger(str) {
        var n = ~~Number(str);
        return String(n) === str && n >= 0;
    }


    var AddPolygon = function(p)  {
        var coords = [];
        for (var i = 0; i < p.length; i++) {
            coords.push(new google.maps.LatLng(p[i][1], p[i][0]));
        }
            
        var polygon = new google.maps.Polygon({
            map: $scope.myMap,
            paths: coords,
            strokeColor: '#008800',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#008800',
            fillOpacity: 0.35
        });

        $scope.polys.push(polygon);
        return {
            obj: polygon,
            coords: coords
        };
    }


    function LoadEverything() {

        acsManager.getZipCodes(function(err, zipCodes) {
             $timeout(function () {
                $scope.zipCodes = zipCodes;
            }, 0);


            $http.get('./zips.json').then(function(us) {

                var allCoords = us.data.features;

                allZips = {};

                for (var i = 0; i < $scope.polys.length; i++) {
                    $scope.polys[i].setMap(null);
                }
                $scope.polys = [];


                for (var i = 0; i < allCoords.length; i++) {
                    allZips[allCoords[i].properties.zip] = allCoords[i];
                }


                 $timeout(function () {
                    for (var i = 0; i < zipCodes.length; i++) {
                        var zip = zipCodes[i].get("zipcode");
                        var obj = allZips[zip];
                        
                        var g = obj.geometry;
                        if (g.type != "Polygon") {
                            continue;
                        }

                        var c = g.coordinates[0];
                        zipCodes[i].poly = AddPolygon(c);
                    };
                }, 0);

            });



        });


        

        $scope.newZipCode = "";
    };


    $scope.findZipCode = function(e, p) {

        console.log(p[0].latLng.lat(), p[0].latLng.lng());

        var params = {
            latlng: p[0].latLng.lat() + "," + p[0].latLng.lng()
        };
        return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
            params: params
        }).then(function(response) {
            var addrs = response.data.results;
            if (addrs.length > 0) {
                var addr = addrs[0];

                for (var i = 0; i < addr.address_components.length; i++) {
                    var types = addr.address_components[i].types;

                    for (var t = 0; t < types.length; t++) {
                        if (types[t] == "postal_code") {
                            $scope.newZipCode = addr.address_components[i].short_name;
                        }
                    }
                }

                
            }
        });
    };


    $scope.centerArea = function() {
        var bounds = new google.maps.LatLngBounds();

        for (var i = 0; i < this.c.poly.coords.length; i++) {
          bounds.extend(this.c.poly.coords[i]);
        }

        $scope.myMap.fitBounds(bounds);
    }

    $scope.removeZipCode = function() {
        var id = this.c.id;
        acsManager.removeZipCode(id, LoadEverything);
    };

    $scope.enableArea = function() {
        var zip = $scope.newZipCode;

        if (allZips[zip]) {
            acsManager.addZipCode(zip, LoadEverything);
        } else {
            toaster.pop("error", "Error", "Please fill in valid US zip code");
        }
    };


    LoadEverything();

}]);



