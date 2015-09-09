angular.module('app')

.factory('acsManager', ['$http', function($http) {

	var userInfo = null;


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

/*
 ######   #######  ##     ## ########   #######  ##    ## 
##    ## ##     ## ##     ## ##     ## ##     ## ###   ## 
##       ##     ## ##     ## ##     ## ##     ## ####  ## 
##       ##     ## ##     ## ########  ##     ## ## ## ## 
##       ##     ## ##     ## ##        ##     ## ##  #### 
##    ## ##     ## ##     ## ##        ##     ## ##   ### 
 ######   #######   #######  ##         #######  ##    ## 
*/


	var AcsGetCoupons = function(callback) {
		AcsGetLocations(function(err, allLocations) {

		
			var query = new Parse.Query("Coupon");
			query.include("company");
			query.equalTo("owner", Parse.User.current());
			query.find({
				success: function(results) {
					for (var i = 0; i < results.length; i++) {

						results[i].getLocationTitleFull = function() {
							var locs = this.get("locations");
							var locString = "";
							

							if (locs.length == 0) {
								for (var j = 0; j < allLocations.length; j++) {
									locs.push(allLocations[j].id);
								}
							} 

							for (var i = 0; i < locs.length; i++) {

								for (var j = 0; j < allLocations.length; j++) {
									if (allLocations[j].id == locs[i]) {
										locString += allLocations[j].get("name");
										if (locs.length - 1 != i) {
											locString += ", ";
										}
									}
								};

							};

							return locString;
						};

						results[i].getLocationTitle = function() {
							var locs = this.get("locations");
							if (locs.length == 0) {
								return "All Locations";
							} else if (locs.length > 3) {
								return "3+ Locations";
							} else {

								var locString = "";
								for (var i = 0; i < locs.length; i++) {

									for (var j = 0; j < allLocations.length; j++) {
										if (allLocations[j].id == locs[i]) {
											locString += allLocations[j].get("name");
											if (locs.length - 1 != i) {
												locString += ", ";
											}
										}
									};

								};

								return locString;
							}

							return "Error!!!";
						};

					};
					
					callback(null, results);			
				},

				error: function(error) {
				// error is an instance of Parse.Error.
					callback(new Error('Failed to get coupons'));
				}
			});
		});

	};



	var AcsAddCoupon = function(data, callback) {
		
		AcsGetCompany(function(error, company) {
			if (error) {
				alert("Can not get company info");
				return;
			}

			var CouponClass = Parse.Object.extend("Coupon");
			var coupon = new CouponClass();

			coupon.set("title", data.title);
			coupon.set("description", data.body);
			coupon.set("company", company);
			coupon.set("expiration", data.expiration);
			coupon.set("locations", data.locations);

			coupon.set("owner", Parse.User.current());


			coupon.save(null, {
				success: function(coupon) {
					callback();
				},
				error: function(coupon, error) {
					alert("Failed to save object.");
				}
			});

		});
		
	};



/*
##        #######   ######     ###    ######## ####  #######  ##    ## 
##       ##     ## ##    ##   ## ##      ##     ##  ##     ## ###   ## 
##       ##     ## ##        ##   ##     ##     ##  ##     ## ####  ## 
##       ##     ## ##       ##     ##    ##     ##  ##     ## ## ## ## 
##       ##     ## ##       #########    ##     ##  ##     ## ##  #### 
##       ##     ## ##    ## ##     ##    ##     ##  ##     ## ##   ### 
########  #######   ######  ##     ##    ##    ####  #######  ##    ## 
*/
	


	var AcsGetLocations = function(callback) {
		
		var query = new Parse.Query("Location");
		query.equalTo("owner", Parse.User.current());
		query.find({
			success: function(results) {
				callback(null, results);			
			},

			error: function(error) {
			// error is an instance of Parse.Error.
				callback(new Error('Failed to get coupons'));
			}
		});

	};

	var AcsAddLocation = function(data, callback) {
		
		var point = new Parse.GeoPoint({
			latitude: data.latitude, 
			longitude: data.longitude
		});

		var LocationClass = Parse.Object.extend("Location");
		var location = new LocationClass();

		location.set("name", data.name);
		location.set("address", data.address);
		location.set("location", point);
		location.set("owner", Parse.User.current());


		location.save(null, {
			success: function(location) {
				callback();
			},
			error: function(location, error) {
				alert("Failed to save object.");
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
				callback(null, response.data.response);
			}
		});
	};


/*
 ######   #######  ##     ## ########     ###    ##    ## ##    ## 
##    ## ##     ## ###   ### ##     ##   ## ##   ###   ##  ##  ##  
##       ##     ## #### #### ##     ##  ##   ##  ####  ##   ####   
##       ##     ## ## ### ## ########  ##     ## ## ## ##    ##    
##       ##     ## ##     ## ##        ######### ##  ####    ##    
##    ## ##     ## ##     ## ##        ##     ## ##   ###    ##    
 ######   #######  ##     ## ##        ##     ## ##    ##    ##    
*/


	var AcsGetCompany = function(callback) {
		
		var query = new Parse.Query("Company");
		query.equalTo("merchant", Parse.User.current());
		query.first().then(function(results) {
			callback(null, results);			
		});

	};

	var AcsSaveCompanyInfo = function(name, file, callback) {
		var base64 = file;
		var image = new Parse.File("logo.png", { base64: base64 });	
		AcsGetCompany(function(err, company) {
			company.set("name", name);
			company.set("image", image);


			company.save(null, {
				success: function(company) {
					callback();
				},
				error: function(company, error) {
					alert("Failed to save object.");
				}
			});

		});

		
	}

	var AcsRemoveCompanyLogo = function(callback) {

		var query = new Parse.Query("Company");
		query.equalTo("merchant", Parse.User.current());
		query.first().then(function(results) {
			results.unset("image");
			results.save();
			if (callback) callback(null);			
		});

	};




	return {
		login: AcsLogin,
		logout: AcsLogout,
		info: AcsGetInfo,
		
		getCoupons: AcsGetCoupons,
		addCoupon: AcsAddCoupon,

		getLocations: AcsGetLocations,
		addLocation: AcsAddLocation,
		removeLocation: AcsRemoveLocation,


		getCompany: AcsGetCompany,
		removeCompanyLogo: AcsRemoveCompanyLogo,
		saveCompanyInfo: AcsSaveCompanyInfo
	};
}]);
