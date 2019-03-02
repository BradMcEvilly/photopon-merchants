angular.module('app')

.factory('acsManager', ['$http', function($http) {

	var userInfo = null;


	var AcsLogin = function(username, password, callback) {
		

		Parse.User.logIn(username, password, {
		  success: function(user) {
	  		userInfo = user;
			//localStorage.setItem("userInfo", JSON.stringify(userInfo));

			user.set("lastLogin", new Date());
			user.save();
			callback(null, userInfo);
		    
		  },
		  error: function(user, error) {
			callback(new Error('Invalid username or password. Please try again.'));

		  }
		});
	};

	var AcsRegister = function(username, password, email, mobile, callback) {
		
		var user = new Parse.User();
        user.set("username", username);
        user.set("password", password);
        
        if (mobile) {
        	mobile = mobile.replace(/\D/g,'');
        	user.set("phone", mobile);
        }
        
        user.set("email", email);

        user.signUp(null, {
              success: function(user) {
              	user.set("lastLogin", new Date());
				user.save();
				
              	callback(null, user);
              },
              error: function(user, error) {
                callback(new Error(error.message));
              }
        });
		
	};


	var AcsChangePassword = function(password, callback) {
		
		var user = Parse.User.current();
        user.set("password", password);
        user.set("isTempPassword", false);
       
        
       
        user.save().then(function() {
		    callback(null);
		}, function(error){
			callback(error);
		});

		
	};


	var AcsForgot = function(email, callback) {
				
		/*Parse.User.requestPasswordReset(email, {
		  success: function() {
			callback(null);
		  },
		  error: function(error) {
			callback(new Error('Failed to reset password.'));
		  }
		});*/
		Parse.Cloud.run('resetPhotoponUserClient', { email: email }).then(function() {
		    callback(null);
		}, function(error){
			callback(error);
		});
	};
	
	
	var AcsValidateEmail = function(token, callback) {
				
		/*Parse.User.requestPasswordReset(email, {
		  success: function() {
			callback(null);
		  },
		  error: function(error) {
			callback(new Error('Failed to reset password.'));
		  }
		});*/
		
		Parse.Cloud.run('validateEmailClient', { token: token }).then(function() {
		    callback(null);
		}, function(error){
			callback(error);
		});
	};

	var AcsIsLoggedIn = function() {
		if (Parse.User.current()) {
			return true;
		}
		return false;
	};




	var AcsGetInfo = function() {
		var currentUser = Parse.User.current();
		return currentUser;
	};


	var AcsIsAdmin = function() {
		
	    if (!Parse.User.current()) {
	        return false;
	    }

	    if (!Parse.User.current().get("isSuperUser")) {
	        return false;
	    }

	    return true;
	};

	var AcsLogout = function(callback) {
		Parse.User.logOut().then(function(){
			if(callback) callback();
		});
		console.log("Logging out from parse");
		
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


	var AcsNumAllCoupons = function(callback) {
		var query = new Parse.Query("Coupon");
		var query1 = new Parse.Query("Coupon");
		query1.equalTo("isActive", true);

		query.count({
			success: function(count) {
				
				query1.count({
					success: function(activeCount) {
						callback(null, count, activeCount);			
					},

					error: function(error) {
						callback(new Error("Failed to get coupons"), null);
					}
				});
				
			},

			error: function(error) {
				callback(new Error("Failed to get coupons"), null);
			}
		});
	};


	var AcsNumPhotopons = function(callback) {
		var query = new Parse.Query("Photopon");

		query.count({
			success: function(count) {
				callback(null, count);
			},

			error: function(error) {
				callback(new Error("Failed to get photopons"), null);
			}
		});
	};


	var AcsGetCoupon = function(id, callback) {
	
		var query = new Parse.Query("Coupon");
		query.include("company");

		query.get(id, {
			success: function(object) {
				callback(null, object);			
			},

			error: function(object, error) {
				callback(new Error("Failed to get coupon"), null);
			}
		});
		
	};



	var AcsGetCoupons = function(callback, allCoupons, forUser) {
		AcsGetLocations(function(err, allLocations) {

		
			var query = new Parse.Query("Coupon");
			query.include("company");
			query.include("company.merchant");

			if (!allCoupons) {
				query.equalTo("owner", Parse.User.current());
			}

			if (forUser) {
				query.equalTo("owner", forUser);
			}

			query.ascending("company");
			
			query.find({
				success: function(results) {



					for (var i = 0; i < results.length; i++) {

						results[i].getGiveToGet = function() {
							var giveToGet = this.get('givetoget') || 0;

							if (giveToGet == 0) {
								return "None";
							}

							return giveToGet + ((giveToGet == 1) ? " share" : " shares");
						};


						results[i].getShareRato = function() {
							var numShared = this.get('numShared');
							var numRedeemed = this.get('numRedeemed');

							return Math.floor(100 * numRedeemed / numShared) + "%";
						};



						results[i].getImageStyle = function() {
							var imgObj = this.get("company").get("image");

							var img = "img/icon-discount.png";
							if (imgObj) {
								img = imgObj.url();
							}

							return {
								'background-image': 'url("' + img + '")'
							};

						};

						results[i].getExpirationDelta = function() {
							var exp = moment(this.get("expiration"));
							
							return exp.fromNow();
						};
						
						results[i].getExpirationDeltaColor = function() {
							var exp = moment(this.get("expiration"));
							if (exp.format("X") > moment().format("X")) {
								return "#00aa33";
							} else {
								return "#ff0000";
							}
						};						

						results[i].fetchNumRedeems = function(uiupdater) {
							var cpn = this;
							cpn.actualNumRedeemed = "Loading...";
							cpn.numRedeemedRaw = "Loading...";
							cpn.noAvailableRedeems = true;


							var query = new Parse.Query("Redeem");
							query.equalTo("coupon", this);
							
							query.count({
								success: function(count) {
									if (count == 0) {
										cpn.actualNumRedeemed = "No redeems";
										cpn.numRedeemedRaw = 0;
									} else if (count == 1) {
										cpn.actualNumRedeemed = "View 1 redeem";
										cpn.numRedeemedRaw = 1;
										cpn.noAvailableRedeems = false;
									} else {
										cpn.actualNumRedeemed = "View " + count + " redeems";
										cpn.numRedeemedRaw = count;
										cpn.noAvailableRedeems = false;
									}

									uiupdater();
								},
								error: function(err) {
									cpn.actualNumRedeemed = "Error!";
									cpn.numRedeemedRaw = "Error!";
									uiupdater();
								}
							});
						};

						results[i].getExpiration = function() {
							var exp = moment(this.get("expiration"));
							
							return exp.calendar();
						};



						results[i].getLocationTitleFull = function() {
							var locs = this.get("locations");
							var locString = "";
							

							if (locs.length == 0) {
								locs = [];
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
		}, allCoupons, forUser);

	};


	var AcsGetRedeems = function(callback, id) {
		var query = new Parse.Query("Redeem");
		query.include("to");
		query.include("from");
		query.include("coupon");

		if (id) {

			var Coupon = Parse.Object.extend("Coupon");
			var coupon = new Coupon();
			coupon.id = id;
			query.equalTo("coupon", coupon);

		} else {
			var innerQuery = new Parse.Query("Coupon");
			innerQuery.equalTo("owner", Parse.User.current());
			query.matchesQuery("coupon", innerQuery);
		}
		

		query.find({
			success: function(results) {

				for (var i = 0; i < results.length; i++) {

					results[i].getExpiration = function() {
						var exp = moment(this.get("coupon").get("expiration"));
						return exp.calendar();
					};
					
					results[i].getUser = function(key) {
						var user = this.get(key);
						
						return user;
					};

					results[i].getUserEmail = function(key) {
						var user = this.get(key);
						if (!user) return "No Email";
						
						return user.get("email");
					};

					results[i].getUserPhone = function(key) {
						var user = this.get(key);

						if (user && user.get("phone")) {
							return user.get("phone");
						} else {
							return "No phone";
						}
					};
					results[i].getUserName = function(key) {
						var user = this.get(key);
						if (!user) return "No Username";

						return user.get("username");
					};

					results[i].getCreateTime = function() {
						return moment(this.createdAt).format('MM/DD/YYYY h:mm:ss a');
						
					};
				}
				callback(results);			
			},

			error: function(error) {
				throw new Error('Failed to get redeems');
			}
		});

	};


	var AcsGetFriendInfo = function(user, callback) {
		var info = {
			activeFriends: 0,
			totalFriends: 0
		};
		
		var query = new Parse.Query("Friends");
		query.include("user2");
		query.equalTo("user1", user);


		query.find({
			success: function(results) {
				info.totalFriends = results.length;
				info.activeFriends = 0;

				for (var i = 0; i < results.length; i++) {
					var lp = results[i].get("user2").get("lastPhotopon");
					if (!lp) continue;

					var momentLastPhotopon = moment(lp);
					if (momentLastPhotopon.add(3, 'days') > moment()) {
						++info.activeFriends;
					}
				}
				callback(info);
			}, 
			error: function() {
				callback(info);
			}
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
			coupon.set("code", data.code);
			coupon.set("company", company);
			coupon.set("expiration", data.expiration);
			coupon.set("oneperuser", data.oneperuser);
			coupon.set("givetoget", parseInt(data.givetoget + "", 10));
			coupon.set("isActive", data.isActive);
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

	var AcsEditCoupon = function(id, data, callback) {
		var query = new Parse.Query("Coupon");
		query.include("company");

		query.get(id, {
			success: function(object) {

				object.set("title", data.title);
				object.set("description", data.body);
				object.set("code", data.code);
				object.set("expiration", data.expiration);
				object.set("oneperuser", data.oneperuser);
				object.set("locations", data.locations);
				object.set("givetoget", parseInt(data.givetoget + "", 10));

				object.save(null, {
					success: function(coupon) {
						callback();
					},
					error: function(coupon, error) {
						alert("Failed to save object.");
					}
				});
			},

			error: function(object, error) {
				callback(new Error("Failed to get coupon"), null);
			}
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

	var AcsGetLocation = function(id, callback) {
	
		var query = new Parse.Query("Location");

		query.get(id, {
			success: function(object) {
				callback(null, object);			
			},

			error: function(object, error) {
				callback(new Error("Failed to get object"), null);
			}
		});
		
	};

	var AcsGetLocations = function(callback, allLocations, uiupdater, forUser) {
		
		var query = new Parse.Query("Location");
		query.include("owner");

		if (!allLocations) {
			query.equalTo("owner", Parse.User.current());
		}

		if (forUser) {
			query.equalTo("owner", forUser);
		}

		query.ascending("company");

		query.find({
			success: function(results) {

				for (var i = 0; i < results.length; i++) {
					results[i].fetchEverything = function() {
						var obj = this;
						var merchant = obj.get('owner');

						obj.companyName = "Loading...";

						var query2 = new Parse.Query("Company");
						query2.equalTo("merchant", merchant);

						query2.find({
							success: function(company) {
								obj.companyName = company[0].get("name");
								if (uiupdater) uiupdater();		
							},
							error: function(error) {
								obj.companyName = "Not Found!";
								if (uiupdater) uiupdater();		
							}
						});
					};


					results[i].getImageMapStyle = function() {

						var img = "https://maps.googleapis.com/maps/api/staticmap?center=" + this.get('location').latitude + "," + this.get('location').longitude + "&zoom=16&size=160x160&key=AIzaSyDQnoF0KD2EZ1eYzbbkyFf25KjQUsebzjw";
						
						return {
							'background-image': 'url("' + img + '")'
						};

					}

					results[i].fetchEverything();
				};

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
		location.set("phoneNumber", data.phoneNumber);
		location.set("address", data.address);
		location.set("location", point);
		location.set("owner", Parse.User.current());
		location.set("countryID", data.countryID);
		location.set("isNational", data.isNational);



		location.save(null, {
			success: function(location) {
				callback();
			},
			error: function(location, error) {
				alert("Failed to save object.");
			}
		});

	};

	var AcsEditLocation = function(id, data, callback) {
		var query = new Parse.Query("Location");

		query.get(id, {
			success: function(object) {



				var point = new Parse.GeoPoint({
					latitude: data.latitude, 
					longitude: data.longitude
				});

				object.set("name", data.name);
				object.set("phoneNumber", data.phoneNumber);
				object.set("address", data.address);
				object.set("location", point);
				object.set("countryID", data.countryID);
				object.set("isNational", data.isNational);



				object.save(null, {
					success: function(coupon) {
						callback();
					},
					error: function(coupon, error) {
						alert("Failed to save object.");
					}
				});
			},

			error: function(object, error) {
				callback(new Error("Failed to get object"), null);
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


	var AcsGetBills = function(callback) {

		var query = new Parse.Query("Bills");
		query.include("user");

		query.equalTo("user", Parse.User.current());
		query.descending("generation");

		query.find({
			success: function(results) {

				callback(null, results);			
			},

			error: function(error) {
				callback(new Error('Failed to get bills'));
			}
		});
	}


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

	var AcsGetCompanyByID = function(id, callback) {
		
		var query = new Parse.Query("Company");
		
		query.get(id, {
			success: function(object) {
				callback(null, object);
			},

			error: function(object, error) {
				callback(new Error("Failed to get object"), null);
			}
		});
	};


	var AcsGetCompanies = function(callback, uiupdater) {
		
		var query = new Parse.Query("Company");
		query.find({
			success: function(results) {

				for (var i = 0; i < results.length; i++) {
					results[i].fetchEverything = function() {
						//return merchant.id;
						var obj = this;
						var merchant = obj.get('merchant');

						obj.numLocations = "Loading...";
						obj.numCoupons = "Loading...";
						obj.numShared = "Loading...";
						obj.numRedeemed = "Loading...";

						// Load locations
						var query1 = new Parse.Query("Location");
						query1.equalTo("owner", merchant);

						query1.count({
							success: function(count) {
								obj.numLocations = count;
								uiupdater();		
							},
							error: function(error) {
								obj.numLocations = "Error";
								uiupdater();
							}
						});



						// Load coupons
						var query2 = new Parse.Query("Coupon");
						query2.equalTo("owner", merchant);

						query2.find({
							success: function(coupons) {
								obj.numCoupons = coupons.length;
								obj.numShared = 0;
								obj.numRedeemed = 0;

								for (var i = 0; i < coupons.length; i++) {
									obj.numShared += coupons[i].get('numShared') || 0;
									obj.numRedeemed += coupons[i].get('numRedeemed') || 0;
								};


								obj.shareRatio = Math.floor(100 * obj.numRedeemed / obj.numShared) + "%";
								uiupdater();		
							},
							error: function(error) {
								obj.numCoupons = "Error";
								uiupdater();
							}
						});




					}

					results[i].fetchEverything();
				};
				callback(null, results);			
			},
			error: function() {
				callback(new Error('Failed to get coupons'));
			}
		});

	};

	var AcsNewCompany = function(name, file, userId, callback, realFile) {
		var base64 = file;
		var image = null;

		if (!realFile) {
			image = new Parse.File("logo.png", { base64: base64 });	
		} else {
			image = file;	
		}

		AcsGetCompany(function(err, company) {

			var CompanyClass = Parse.Object.extend("Company");
			var company = new CompanyClass();

			var tuser = new Parse.User();
			tuser.id = userId;



			company.set("name", name);
			company.set("image", image);
			company.set("merchant", tuser);


			company.save(null, {
				success: function(company) {
					callback(company);
				},
				error: function(company, error) {
					alert("Failed to save object.");
				}
			});

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
					callback(company);
				},
				error: function(company, error) {
					alert("Failed to save object.");
				}
			});

		});

		
	}
	var AcsSaveCompanyName = function(name, callback) {
		AcsGetCompany(function(err, company) {
			company.set("name", name);

			company.save(null, {
				success: function(company) {
					callback(company);
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



	var AcsGetCompanyStats = function(callback) {
		var query = new Parse.Query("Coupon");
		query.equalTo("owner", Parse.User.current());
		
		query.find({
			success: function(results) {
				var stats = {
					numShares: 0,
					numRedeems: 0
				};

				for (var i = 0; i < results.length; i++) {
					var ns = results[i].get("numShared");
					var nr = results[i].get("numRedeemed");
					ns = ns || "0";
					nr = nr || "0";
					stats.numShares += parseInt(ns, 10);
					stats.numRedeems += parseInt(nr, 10);
				};
				callback(stats);			
			},

			error: function(error) {
			}
		});

	};


	var AcsGetCompanyBannedNumbers = function(callback) {
		AcsGetCompany(function(err, company) {

			var query = new Parse.Query("BannedNumbers");
			query.equalTo("company", company);
			
			query.find({
				success: function(results) {
					callback(results);			
				},

				error: function(error) {
				}
			});
		});

	};


	var AcsAddBannedNumber = function(newBannedNumber, callback) {
		AcsGetCompany(function(err, company) {


			var BannedNumbers = Parse.Object.extend("BannedNumbers");
			var num = new BannedNumbers();

			num.set("name", newBannedNumber.name);
			num.set("phoneNumber", newBannedNumber.phone);
			num.set("company", company);

			num.save(null, {
			  success: function(num) {
			  	callback(null);
			  },
			  error: function(num, error) {
				callback(error);
			  }
			});

		});

	};

	var AcsRemoveBannedNumber = function(id, callback) {
		var BannedNumbers = Parse.Object.extend("BannedNumbers");
		var query = new Parse.Query(BannedNumbers);
		query.get(id, {
		  success: function(num) {

		    num.destroy({
			  success: function(myObject) {
			    callback(null);
			  },
			  error: function(myObject, error) {
			    callback(error, null);
			  }
			});

		  },
		  error: function(object, error) {
		    callback(error, null);

		  }
		});

	};



	var AcsGetUserStats = function(callback) {
		
		Parse.Cloud.run("UserStats", {}, {
			success: function(stats) {
				callback(null, stats);			
			},

			error: function(error) {
				callback(new Error('Failed to get user stats'));
			}
		});

	};

	var AcsGetTotalStats = function(callback) {
		var stats = {
			numShares: 0,
			numRedeems: 0
		};



		var maybeSendStats = function() {

			if ((stats.todaysPhotopon !== undefined) && (stats.todaysShares !== undefined) && (stats.todaysRedeems !== undefined)) {
				stats.dailyRevenue = stats.todaysRedeems * 0.25;
				callback(null, stats);

			}
		};


		var query = new Parse.Query("Coupon");
		
		query.find({
			success: function(results) {
				

				for (var i = 0; i < results.length; i++) {
					var ns = results[i].get("numShared");
					var nr = results[i].get("numRedeemed");
					ns = ns || "0";
					nr = nr || "0";
					stats.numShares += parseInt(ns, 10);
					stats.numRedeems += parseInt(nr, 10);
				};



				var dayBeforeDate = new Date((new Date()).getTime() - (24 * 3600 * 1000));



				var query1 = new Parse.Query("Photopon");
				query1.greaterThanOrEqualTo("createdAt", dayBeforeDate);
				query1.count({
					success: function(count) {
						stats.todaysPhotopon = count;
						maybeSendStats();
					},

					error: function(error) {
						callback(new Error("Failed to get stats"), null);
					}
				});

				
				var query2 = new Parse.Query("Notifications");
				query2.greaterThanOrEqualTo("createdAt", dayBeforeDate);
				query2.equalTo("type", "PHOTOPON");
				query2.count({
					success: function(count) {
						stats.todaysShares = count;
						maybeSendStats();
					},

					error: function(error) {
						callback(new Error("Failed to get stats"), null);
					}
				});



				var query3 = new Parse.Query("Notifications");
				query3.greaterThanOrEqualTo("createdAt", dayBeforeDate);
				query3.equalTo("type", "REDEEMED");
				query3.count({
					success: function(count) {
						stats.todaysRedeems = count;
						maybeSendStats();
					},

					error: function(error) {
						callback(new Error("Failed to get stats"), null);
					}
				});




			},

			error: function(error) {
				callback(new Error('Failed to get stats'));
			}
		});

	};


	var AcsGetMerchantRequests = function(callback) {
		
		
		Parse.Cloud.run("getMerchantRequests").then(function(results) {

			for (var i = 0; i < results.length; i++) {
      				results[i].getCreationDate = function() {
							var exp = moment(this.get("createdAt"));
							
							return exp.calendar();
						};

    		}
    
    callback(null, results);			
		}).catch(function(error) {
				callback(new Error('Failed to get merchant requests'));
			});;
		
	};
	
	
	var AcsGetMerchants = function(callback) {
		
		
		Parse.Cloud.run("getMerchants").then(function(results) {
			
			for (var i = 0; i < results.length; i++) {
      				results[i].getCreationDate = function() {
							var exp = moment(this.get("createdAt"));
							
							return exp.calendar();
						};

    		}
    
    callback(null, results);			
		}).catch(function(error) {
				callback(new Error('Failed to get merchants'));
			});;
		
	}





	var AcsDenyMerchantRequest = function(id, callback) {
		var MerchantRequest = Parse.Object.extend("MerchantRequests");
		var query = new Parse.Query(MerchantRequest);

		query.get(id, {
			success: function(obj) {
				obj.set("isAccepted", false);
				obj.save().then(function(){
					callback();
				
				});
				
			},
			error: function(object, error) {
				callback(new Error('Failed to deny merchant request'));
			}
		});
	};

	var AcsAcceptMerchantRequest = function(id, callback) {
		
		var MerchantRequest = Parse.Object.extend("MerchantRequests");
		var query = new Parse.Query(MerchantRequest);

		query.get(id, {
			success: function(obj) {
				obj.set("isAccepted", true);
				obj.save().then(function(){
					callback();
				
				});

			},
			error: function(object, error) {
				callback(new Error('Failed to accept merchant request'));
			}
		});
	};

	var AcsCreateMerchantRequest = function(data, callback) {

		var SaveRequest = function(parseFile) {

            var ReqClass = Parse.Object.extend("MerchantRequests");
            var req = new ReqClass();

            req.set("taxID", data.taxid);
            req.set("promo", data.promocode);
            req.set("businessName", data.companyname);
            req.set("phoneNumber", data.phonenumber);
            req.set("user", Parse.User.current());

            if (parseFile) {
            	req.set("logo", parseFile);
            }


            req.save(null, {
                success: function(req) {
                    callback();
                },
                error: function(req, error) {
                     callback(error.message);
                }
            });

		};


		if (data.file) {
			var base64 = data.file;
			var parseFile = new Parse.File("logo.png", { base64: base64 });	

	        parseFile.save().then(function() {
	        	SaveRequest(parseFile);
	        }, function(error) {
	            callback("Failed to upload file");
	        });	
		} else {
			SaveRequest(null);
		}
		
	};


	var AcsGetAllLocations = function(callback, uiupdater) {
		AcsGetLocations(callback, true, uiupdater);
	};

	var AcsGetAllCoupons = function(callback) {
		AcsGetCoupons(callback, true);
	};

	var AcsGetAllPhotopons = function(callback, uiupdater) {
		var query = new Parse.Query("Photopon");

		query.include("creator");
		query.include("coupon");
		query.include("coupon.company");

		query.find({
			success: function(results) {
				for (var i = 0; i < results.length; i++) {
					results[i].fetchEverything = function() {
						var obj = this;
						var users = obj.get("users");

						obj.userList = "Loading...";

						var query2 = new Parse.Query("User");
						console.log(users);
						query2.containedIn("objectId", users);

						query2.find({
							success: function(users) {
								obj.userList = "";
								console.log(users);

								for (var i = 0; i < users.length; i++) {
									obj.userList += users[i].get("username") + ((i == users.length - 1) ? "" : ", ")
								};
								if (uiupdater) uiupdater();		
							},
							error: function(error) {
								obj.userList = "Not Found!";
								if (uiupdater) uiupdater();		
							}
						});




					}

					results[i].fetchEverything();
				};

				callback(null, results);
			}
		});
	};




	var AcsGetLocationsFor = function(user, callback, uiupdater) {
		AcsGetLocations(callback, false, uiupdater, user);
	};

	var AcsGetCouponsFor = function(user, callback) {
		AcsGetCoupons(callback, false, user);
	};

	var AcsGetPhotoponsFor = function(user, callback, uiupdater) {
		var query = new Parse.Query("Photopon");

		query.include("creator");
		query.include("coupon");
		query.include("coupon.company");

		//query.equalTo("coupon.owner", user);
		query.find({
			success: function(results) {
				for (var i = 0; i < results.length; i++) {
					results[i].fetchEverything = function() {
						var obj = this;
						var users = obj.get("users");

						obj.userList = "Loading...";

						var query2 = new Parse.Query("User");
						console.log(users);
						query2.containedIn("objectId", users);

						query2.find({
							success: function(users) {
								obj.userList = "";
								console.log(users);

								for (var i = 0; i < users.length; i++) {
									obj.userList += users[i].get("username") + ((i == users.length - 1) ? "" : ", ")
								};
								if (uiupdater) uiupdater();		
							},
							error: function(error) {
								obj.userList = "Not Found!";
								if (uiupdater) uiupdater();		
							}
						});




					}

					results[i].fetchEverything();
				};

				callback(null, results);
			}
		});
	};






	var AcsAddRepresentative = function(repInfo, callback, isEditing) {

		var FillInfo = function(rep) {
			rep.set("title", repInfo.title);
			rep.set("firstName", repInfo.firstName);
			rep.set("middleName", repInfo.middleName);
			rep.set("lastName", repInfo.lastName);
			rep.set("phoneNumber", repInfo.phoneNumber);
			rep.set("address", repInfo.address);
			rep.set("birthday", repInfo.birthday);
			rep.set("bio", repInfo.bio);
			rep.set("linkedin", repInfo.linkedin);
			rep.set("facebook", repInfo.facebook);
			rep.set("twitter", repInfo.twitter);
			rep.set("repID", repInfo.repID);


			if (repInfo.profile) {
				image = new Parse.File("profile.png", { base64: repInfo.profile });	
				rep.set("photo", image);
			}
		};

		var SaveRep = function(rep) {
			if (repInfo.originalRepID == repInfo.repID) {
				rep.save(null, {
					success: function(rep) {
						callback(null, rep);
					},
					error: function(rep, error) {
						callback("Failed to save object.");
					}
				});
			} else {
				AcsCheckRepID(repInfo.repID, function(isValid, err) {
					if (!isValid) {
						callback(err);
						return;
					}

					rep.save(null, {
						success: function(rep) {
							callback(null, rep);
						},
						error: function(rep, error) {
							callback("Failed to save object.");
						}
					});
				});
			}
		};
		

		var RepClass = Parse.Object.extend("Representative");
		
		if (!isEditing) {
			var rep = new RepClass();

			FillInfo(rep);
			SaveRep(rep);
		} else {
			
			var query = new Parse.Query(RepClass);
            query.get(repInfo.objectId, {
                success: function(repObj) {
                    FillInfo(repObj);
                    SaveRep(repObj);
                },
                error: function(repObj, err) {
                	callback("Failed to save object.");
                }
            });
		}

	};



	var AcsCheckRepID = function(id, callback) {
		var query = new Parse.Query("Representative");
		query.equalTo("repID", id);
		
		query.find({
			success: function(results) {
				if (results.length == 0) {
					callback(true);
				} else {
					callback(false, "Representative ID is already used. Please use other ID", results[0]);
				}
			},

			error: function(error) {
				callback(false, "Server communication error", results[0]);
			}
		});

	};


	var AcsGetReps = function(callback, allCoupons) {
		var query = new Parse.Query("Representative");

		query.find({
			success: function(results) {



				for (var i = 0; i < results.length; i++) {

					results[i].getBirthday = function() {
						return  moment(this.get("birthday")).format('MM/DD/YYYY');
					};



					results[i].getFullName = function() {
						var first = this.get("firstName");
						var middle = this.get("middleName");
						var last = this.get("lastName");
						var title = this.get("title");
						
						return title + " " + first + " " + (middle ? middle : "") + " " + last;
					};

				};
				
				callback(null, results);			
			},

			error: function(error) {
				callback('Failed to get representatives');
			}
		});

	};


	var AcsGetZipCodes = function(callback) {
		var allResults = [];
		var maxResults = 1000;
		var currentOffset = 0;

		var GetSomething = function() {
			var query = new Parse.Query("EnabledLocations");
			query.limit(maxResults);
			query.skip(currentOffset);
			query.ascending("zipcode");

			query.find({
				success: function(results) {
					allResults = allResults.concat(results);

					if (results.length == maxResults) {
						currentOffset += maxResults;
						GetSomething();
					} else {
						callback(null, allResults);				
					}

				},

				error: function(error) {
					callback('Failed to get representatives');
				}
			});

		};

		GetSomething();
	};

	var AcsRemoveZipCode = function(id, callback) {
		var EnableLocation = Parse.Object.extend("EnabledLocations");
		var query = new Parse.Query(EnableLocation);

		query.get(id, {
			success: function(obj) {
				obj.destroy();
				callback();
			},
			error: function(object, error) {
				callback(new Error('Failed to deny merchant request'));
			}
		});
	};

	var AcsAddZipCode = function(zip, callback) {

        var EnabledLocation = Parse.Object.extend("EnabledLocations");
        var loc = new EnabledLocation();

        loc.set("zipcode", zip);

        loc.save(null, {
            success: function(req) {
                callback();
            },
            error: function(req, error) {
                 callback("Failed to send request");
            }
        });
	};



	var AcsGetLastBill = function(callback) {


		var billQuery = new Parse.Query("Bills");
		billQuery.equalTo("user", Parse.User.current());
		billQuery.descending("generation");
		
		billQuery.first({
			success: function(object) {
				callback(object);
			},
			error: function(error) {
				callback(null);
			}
		});


	};

	var AcsVerifyNumber = function(number, callback) {
		var cnum = number.replace(/[^0-9]/, '');

	    var Verifications = Parse.Object.extend("Verifications");
	    var v = new Verifications();
	    var c = Math.ceil(Math.random() * 900000 + 100000) + "";

	    v.set("userName", Parse.User.current().get("username"));
	    v.set("code", c);
	    v.set("phoneNumber", cnum);
	    v.set("numTried", 0);


	    v.save(null, {
	        success: function(v) {
	            callback(null, c);
	        },
	        error: function(v, error) {
	             callback("Failed to send request");
	        }
	    });

	};


	return {
		loggedIn: AcsIsLoggedIn,
		login: AcsLogin,
		register: AcsRegister,
		forgot: AcsForgot,
		logout: AcsLogout,
		info: AcsGetInfo,
		isAdmin: AcsIsAdmin,
		validateEmail: AcsValidateEmail,
		changePassword: AcsChangePassword,


		
		numAllCoupons: AcsNumAllCoupons,
		getCoupons: AcsGetCoupons,
		getCoupon: AcsGetCoupon,
		addCoupon: AcsAddCoupon,
		editCoupon: AcsEditCoupon,



		getLocations: AcsGetLocations,
		getLocation: AcsGetLocation,
		addLocation: AcsAddLocation,
		editLocation: AcsEditLocation,
		removeLocation: AcsRemoveLocation,


		getRedeems: AcsGetRedeems,
		getFriendInfo: AcsGetFriendInfo,


		getCompany: AcsGetCompany,
		getCompanyByID: AcsGetCompanyByID,
		newCompany: AcsNewCompany,
		getCompanies: AcsGetCompanies,
		removeCompanyLogo: AcsRemoveCompanyLogo,
		saveCompanyInfo: AcsSaveCompanyInfo,
		saveCompanyName: AcsSaveCompanyName,
		getCompanyStats: AcsGetCompanyStats,
		getCompanyInvoices: AcsGetBills,
		getLastBill: AcsGetLastBill,

		getBannedNumbers: AcsGetCompanyBannedNumbers,
		removeBannedNumber: AcsRemoveBannedNumber,
		addBannedNumber: AcsAddBannedNumber,



		getUserStats: AcsGetUserStats,
		getTotalStats: AcsGetTotalStats,
		getMerchantRequests: AcsGetMerchantRequests,
		getMerchants: AcsGetMerchants,
		denyMerchantRequest: AcsDenyMerchantRequest,
		acceptMerchantRequest: AcsAcceptMerchantRequest,
		createMerchantRequest: AcsCreateMerchantRequest,
		
		getAllLocations: AcsGetAllLocations,
		getAllCoupons: AcsGetAllCoupons,
		getAllPhotopons: AcsGetAllPhotopons,

		getLocationsFor: AcsGetLocationsFor,
		getCouponsFor: AcsGetCouponsFor,
		getPhotoponsFor: AcsGetPhotoponsFor,
		numPhotopons: AcsNumPhotopons,


		addRepresentative: AcsAddRepresentative,
		getRepresentatives: AcsGetReps,
		checkRepID: AcsCheckRepID,

		verifyNumber: AcsVerifyNumber,
		getZipCodes: AcsGetZipCodes,
		addZipCode: AcsAddZipCode,
		removeZipCode: AcsRemoveZipCode
	};
}]);




