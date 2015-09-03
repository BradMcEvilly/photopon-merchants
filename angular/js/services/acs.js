angular.module('app')

.factory('acsManager', ['$http', function($http) {

	var userInfo = null;

	var cache = {};


	var AcsLogin = function(username, password, callback) {
		

		Parse.User.logIn(username, password, {
		  success: function(user) {
	  		userInfo = user;
			//localStorage.setItem("userInfo", JSON.stringify(userInfo));
			callback(null, userInfo);
		    
		  },
		  error: function(user, error) {
			callback(new Error('Invalid username or password. Please try again.'));

		  }
		});
	};





	var AcsGetInfo = function() {
		return userInfo;
	};

	var AcsLogout = function() {
		userInfo = null;
		//localStorageService.remove("userInfo");
	};

	var AcsGetCoupons = function(callback) {
		
		if (cache.coupons) {
			callback(null, cache.coupons);
			return null;
		}


		return $http.get('api/coupons.php').then(function(response) {

			if (response.data.meta.status != "ok") {
				callback(new Error('Failed to get coupons'));
			} else {
				var coupons = response.data.response.Coupon;
				cache.coupons = coupons;
				callback(null, coupons);
			}
		});
	};


	var AcsGetLocations = function(callback) {
		
		if (cache.locations) {
			callback(null, cache.locations);
			return null;
		}


		return $http.get('api/locations.php').then(function(response) {

			if (response.data.meta.status != "ok") {
				callback(new Error('Failed to get locations'));
			} else {
				var locations = response.data.response.places;
				cache.locations = locations;
				callback(null, locations);
			}
		});
	};

	var AcsAddLocation = function(data, callback) {
		return $http.post('api/addlocation.php', data).then(function(response) {

			if (response.data.meta.status != "ok") {
				callback(new Error('Failed to add location'));
			} else {
				cache.locations = null;
				callback(null, response.data.response);
			}
		});
	};

	var AcsRemoveLocation = function(id, callback) {
		return $http.post('api/removelocation.php', {
			id: id
		}).then(function(response) {

			if (response.data.meta.status != "ok") {
				callback(new Error('Failed to remove location'));
			} else {
				cache.locations = null;
				callback(null, response.data.response);
			}
		});
	};



	return {
		login: AcsLogin,
		logout: AcsLogout,
		info: AcsGetInfo,
		getCoupons: AcsGetCoupons,
		getLocations: AcsGetLocations,
		addLocation: AcsAddLocation,
		removeLocation: AcsRemoveLocation
	};
}]);
