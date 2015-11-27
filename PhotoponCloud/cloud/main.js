
Parse.Cloud.afterSave("MerchantRequests", function(request) {

	if (request.object.get("isAccepted")) {
		Parse.Cloud.useMasterKey();
		request.object.get("user").set("isMerchant", true);
		request.object.get("user").save();
		request.object.destroy();
	}

});


Parse.Cloud.beforeSave("Photopon", function(request, response) {

	request.object.set("creator", request.user);
	request.object.set("installationId", request.installationId);
	
    var groupACL = new Parse.ACL();
    groupACL.setPublicReadAccess(true);
    groupACL.setWriteAccess(request.user, true);
    request.object.setACL(groupACL);
 
    response.success();
});


Parse.Cloud.afterSave("Notifications", function(request) {

	var user = request.object.get("to");
	var assocUser = request.object.get("assocUser");
	
	var notificationType = request.object.get("type");
	var channelName = "User_" + user.id;

	assocUser.fetch({
		success: function(assocUser) {
			console.log(assocUser);

			var message = "";
			if (notificationType == "PHOTOPON") {

				message = "User " + assocUser.get("username") + " sent you Photopon!"

			} else if (notificationType == "MESSAGE") {
				message = assocUser.get("username") + ": " + request.object.get("content");

			}

			Parse.Push.send({
				channels: [ channelName ],
				data: {
					alert: message
				}
			}, {
				success: function() {

				},
				error: function(error) {
				// Handle error
				}
			});


		},
		error: function(error) {
		// Handle error
		}
	});

});


Parse.Cloud.job("CreateBills", function(request, response) {
		var WhenBillsGenerated = function(merchantCouponMap) {
			var numMerchants = Object.keys(merchantCouponMap).length;
			response.success("Generated " + numMerchants + " invoices");
		};


		var GetLastBill = function(id, callback) {

			var user = new Parse.User();
			user.id = id;


			var billQuery = new Parse.Query("Bills");
			billQuery.equalTo("user", user);
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


		var GenerateBillForMrechant = function(merchantId, coupons, callback) {
			var BillClass = Parse.Object.extend("Bills");


			GetLastBill(merchantId, function(lastBill) {

				var totalShares = 0;
				var totalRedeems = 0;

				for (var i = 0; i < coupons.length; i++) {
					totalShares += parseInt(coupons[i].get("numShared") || 0, 10);
					totalRedeems += parseInt(coupons[i].get("numRedeemed") || 0, 10);
				};


				var lastTotalShared = parseInt(lastBill ? (lastBill.get("numShared") || 0) : 0, 10);
				var lastTotalRedeemed = parseInt(lastBill ? (lastBill.get("numRedeemed") || 0) : 0, 10);

				var generation = parseInt(lastBill ? lastBill.get("generation") : 0, 10);

				var currentShared = totalShares - lastTotalShared;
				var currentRedeemed = totalRedeems - lastTotalRedeemed;

				var billItems = [];
				billItems.push(currentShared + " coupons shares");
				billItems.push(currentRedeemed + " coupons redeems");

				var price = currentShared * 5 + currentRedeemed * 25;


				var user = new Parse.User();
				user.id = merchantId;
				
				var bill = new BillClass();

				bill.set("numShared", totalShares);
				bill.set("numRedeemed", totalRedeems);
				bill.set("billItems", billItems);
				bill.set("amount", price);
				bill.set("generation", generation + 1);
				bill.set("user", user);



				bill.save(null, {
					success: function(bill) {
						callback();
					},
					error: function(bill, error) {
						throw ("Failed to save object.");
					}
				});
			});


		};

		var WhenCouponsFetched = function(merchantCouponMap) {

			var numMerchantsLeft = Object.keys(merchantCouponMap).length;


			for (var merchantId in merchantCouponMap) {
				GenerateBillForMrechant(merchantId, merchantCouponMap[merchantId], function() {
					numMerchantsLeft--;
					if (numMerchantsLeft == 0) {
						WhenBillsGenerated(merchantCouponMap);
					}
				});
			}

		};


		var GetMerchantCoupons = function() {
			var Company = Parse.Object.extend("Company");

			var queryCompany = new Parse.Query(Company);
			queryCompany.include("merchant");

			queryCompany.find({

				success: function(companies) {
					var merchants = {};

					for (var i = 0; i < companies.length; i++) {
						
						var company = companies[i];
						merchants[company.get("merchant").id] = [];
						var numRequests = companies.length;


						(function(id) {
							
							console.log("Getting " + id);
							
							var user = new Parse.User();
							user.id = id;


							var couponQuery = new Parse.Query("Coupon");
							couponQuery.equalTo("owner", user);
							couponQuery.find({
								success: function(merchantCoupons) {
									numRequests = numRequests - 1;

									for (var j = 0; j < merchantCoupons.length; j++) {
										merchants[id].push(merchantCoupons[j]);
									};

									if (numRequests == 0) {
										WhenCouponsFetched(merchants);
									}

								},
								error: function(error, res) {
									throw error;
								}
							})

						})(company.get("merchant").id);




					}
				
				},
				error: function(error) {
					throw ("Error: " + error.code + " " + error.message);
				}
			});
		};



		try {
			GetMerchantCoupons();
		} catch (ex) {
			response.error(ex);
		}

		


});