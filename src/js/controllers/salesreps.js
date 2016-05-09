'use strict';

angular.module('app')
.controller('SalesReps', ['$scope', '$http', '$state', 'acsManager', '$sce', '$modal', '$filter', '$timeout', function($scope, $http, $state, acsManager, $sce, $modal, $filter, $timeout) {
    $scope.user = acsManager.info();

    var IDLENGTH = 6;

    if (!acsManager.isAdmin()) {
    	$state.go('access.signin');
    	return;
    }

    $scope.rep = {};


    $scope.generateID = function() {
      $scope.rep.repID = "";

      var id = "";
      var dict = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      for (var i = 0; i < IDLENGTH; i++) {
        var r = Math.floor(Math.random() * dict.length);
        id += dict.substr(r, 1);
      }

      acsManager.checkRepID(id, function(isValid) {
        
        if (isValid) {
          $timeout(function() {
            $scope.rep.repID = id;
          }, 0);
        } else {
          $scope.generateID();
        }

      })
    };

    $scope.startEditing = function() {
      $scope.isEditing = true;
      $scope.isEditingExisting = (this.c != null);

      if ($scope.isEditingExisting) {
        $scope.rep = {

          title: this.c.get("title"),
          firstName: this.c.get("firstName"),
          middleName: this.c.get("middleName"),
          lastName: this.c.get("lastName"),
          phoneNumber: this.c.get("phoneNumber"),
          address: this.c.get("address"),
          birthday: this.c.get("birthday"),
          bio: this.c.get("bio"),
          linkedin: this.c.get("linkedin"),
          facebook: this.c.get("facebook"),
          twitter: this.c.get("twitter"),
          repID: this.c.get("repID"),
          originalRepID: this.c.get("repID"),
          objectId: this.c.id
        };
      }

      if (!$scope.isEditingExisting) {
        $scope.generateID();
      }
      console.log(this);
    };

    $scope.onButtonClick = function() {

      acsManager.addRepresentative($scope.rep, function(err) {
        if (err) {
          $timeout(function() {
            $scope.errorMessage = err;
          }, 0);

          return;
        }

        $state.go($state.current, {}, {
          reload: true
        });
      }, $scope.isEditingExisting);
      
    };


    $scope.stopEditing = function() {
      $scope.rep = {};
      $scope.isEditing = false;
      $scope.isEditingExisting = false;
      $scope.form.$setPristine(true);
    };



    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

//      $scope.minDate = new Date();
      $scope.opened = true;
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1,
      class: 'datepicker'
    };

    $scope.format = 'dd-MMMM-yyyy';




    acsManager.getRepresentatives(function(err, reps) {
      $timeout(function() {
        $scope.reps = reps;
      }, 0);
    });


    var handleFileSelect = function(evt) {
      var file = evt.currentTarget.files[0];
      var reader = new FileReader();
      reader.onload = function (evt) {
        $scope.$apply(function($scope){
          $scope.rep.profile=evt.target.result;
          $scope.fileselected = true;
        });
      };
      reader.readAsDataURL(file);
    };
    angular.element(document.querySelector('#profilePicFile')).on('change',handleFileSelect);



}]);






angular.module('app').directive('datepickerPopup', function (dateFilter, datepickerPopupConfig) {
    return {
        restrict: 'A',
        priority: 1,
        require: 'ngModel',
        link: function(scope, element, attr, ngModel) {
            var dateFormat = attr.datepickerPopup || datepickerPopupConfig.datepickerPopup;
            ngModel.$formatters.push(function (value) {
                return dateFilter(value, dateFormat);
            });
        }
    };
});


angular.module('app').directive('uppercased', function() {
    return {
        require: 'ngModel',  
              
        link: function(scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function(val) {
                val = val ? val.toUpperCase() : "";

                var regex = new RegExp("[^A-Z]");
                var replaced = val.replace(regex, ""); 
                if (replaced !== val) {
                  modelCtrl.$setViewValue(replaced);
                  modelCtrl.$render();
                }         
                return replaced; 

            });
            element.css("text-transform","uppercase");
        }
    };
});

