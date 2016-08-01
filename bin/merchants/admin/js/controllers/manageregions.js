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
    var allCoords = {};
    $scope.filteredAreas = [];


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
    };

    var ResizeMap = function() {
        google.maps.event.trigger($scope.myMap,'resize');
        $scope.myMap.setZoom( $scope.myMap.getZoom() );
    };


    function LoadEverything() {

        acsManager.getZipCodes(function(err, zipCodes) {
             $timeout(function () {
                $scope.zipCodes = zipCodes;
            }, 0);


        
            for (var i = 0; i < $scope.polys.length; i++) {
                $scope.polys[i].setMap(null);
            }
            $scope.polys = [];

            allZips = {};

            for (var i = 0; i < allCoords.length; i++) {
                allZips[allCoords[i].properties.zip] = allCoords[i];
                allZips[allCoords[i].properties.zip].isEnabled = false;
            }


             $timeout(function () {
                for (var i = 0; i < zipCodes.length; i++) {
                    var zip = zipCodes[i].get("zipcode");
                    var obj = allZips[zip];

                    if (!obj) {
                        console.log("Not found " + zip);
                        continue;
                    }

                    obj.isEnabled = true;
                    obj.objectId = zipCodes[i].id;
                    
                    var g = obj.geometry;
                    if (g.type != "Polygon") {
                        continue;
                    }

                    var c = g.coordinates[0];
                    zipCodes[i].poly = AddPolygon(c);

                };
                console.log("everything is loaded");

                $scope.evaluateInput();
            }, 0);

             $timeout(function() {
                ResizeMap();
             }, 100);

        });




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

    $scope.batchAddZipCodes = function() {
        var zips = $scope.newZipCodesBatch.split(",");
        for (var i = 0; i < zips.length; i++) {
            zips[i] = zips[i].trim();
        }

        var nextIndex = 0;
        var numAdded = 0;
        var numFailed = 0;
        $scope.batchProgress = "Starting...";

        var addNextZip = function() {
            var zip = zips[nextIndex];
            acsManager.addZipCode(zip, function(err) {

                if (err) {
                    ++numFailed;
                } else {
                    ++numAdded;
                }

                $timeout(function() {
                    $scope.batchProgress = "Added " + numAdded + ", Failed " + numFailed + " from " + zips.length;
                }, 0);

                ++nextIndex;
                if (nextIndex >= zips.length) {
                    $scope.batchProgress = null;
                    $scope.newZipCodesBatch = "";
                    LoadEverything();
                    return;
                }
                addNextZip();
            });
            
        };

        addNextZip();

    };


    $scope.centerArea = function() {
        var bounds = new google.maps.LatLngBounds();

        var p = this.c.geometry.coordinates[0];

        for (var i = 0; i < p.length; i++) {
            bounds.extend(new google.maps.LatLng(p[i][1], p[i][0]));
            
        }

        $scope.myMap.fitBounds(bounds);
    }

    $scope.removeZipCode = function() {
        var id = this.c.objectId;
        acsManager.removeZipCode(id, LoadEverything);
    };

    $scope.enableArea = function() {
        var zip = this.c.properties.zip;

        if (allZips[zip]) {
            acsManager.addZipCode(zip, LoadEverything);
        } else {
            toaster.pop("error", "Error", "Please fill in valid US zip code");
        }
    };

    $scope.onNoteClicked = function() {
        $scope.newZipCode = this.c.get("zipcode");
        $scope.evaluateInput();
        $scope.centerArea.call({ c: allZips[$scope.newZipCode] });
    };

    $scope.evaluateInput = function() {
        var zip = $scope.newZipCode;
        console.log(zip);

        if (zip == "") {
            $scope.filteredAreas = [];
            return;
        }

        var newFiltered = Object.keys(allZips).filter(function (propertyName) {
            return propertyName.indexOf(zip) === 0;
        });

        $scope.resultCount = newFiltered.length;
        newFiltered = newFiltered.slice(0, 10);

        
        $scope.filteredAreas = [];
        for (var i = 0; i < newFiltered.length; i++) {
            $scope.filteredAreas.push(allZips[newFiltered[i]]);
        }

        console.log($scope.filteredAreas);
    };

    $http.get('./zips.json').then(function(us) {
        allCoords = us.data.features;
        LoadEverything();
        $scope.isLoadFinished = true;
    });

}]);



