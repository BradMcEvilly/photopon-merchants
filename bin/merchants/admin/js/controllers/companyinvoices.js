'use strict';

angular.module('app')
.controller('CompanyInvoicesCtrl', ['$scope', '$http', '$state', 'acsManager', '$sce', '$modal', '$filter', function($scope, $http, $state, acsManager, $sce, $modal, $filter) {
	$scope.user = acsManager.info();

	$scope.invoices = [];

	if ($scope.user == null) {
		$state.go('access.signin');
		return;
	}



	acsManager.getCoupons(function(err, coupons) {
		$scope.totalShares = 0;
		$scope.totalRedeems = 0;

		for (var i = 0; i < coupons.length; i++) {
			var shares = parseInt(coupons[i].get("numShared") || 0, 10);
			var redeems = parseInt(coupons[i].get("numRedeemed") || 0, 10);

			$scope.totalShares += shares;
			$scope.totalRedeems += redeems;
		}

		acsManager.getLastBill(function(bill) {
			var shares = 0;
			var redeems = 0;
			var centPerRedeem = 0;


			if (bill) {
				redeems = parseInt(bill.get("numRedeemed") || 0, 10);
				shares = parseInt(bill.get("numShared") || 0, 10);
				centPerRedeem = bill.get("centPerRedeem");
			}

			$scope.currentShared = $scope.totalShares - shares;
			$scope.currentRedeemed = $scope.totalRedeems - redeems;

			$scope.currentTotal = $scope.currentRedeemed * centPerRedeem / 100;
			$scope.$apply();
		});

	});




	$scope.totalDue = 0;
	acsManager.getCompanyInvoices(function(err, invoices) {
		for (var i = 0; i < invoices.length; i++) {

			//var cShare = invoices[i].get("currentShares");
			var cRedeem = invoices[i].get("currentRedeems");

			//var CPS = invoices[i].get("centPerShare");
			var CPR = invoices[i].get("centPerRedeem");

			invoices[i].dateText = moment(invoices[i].createdAt).format('MM/DD/YYYY');
			//invoices[i].totalAmount = cShare * CPS + cRedeem * CPR;
			invoices[i].totalAmount = cRedeem * CPR;

			if (invoices[i].get("status") == "DUE") {
				$scope.totalDue += invoices[i].totalAmount;
			}
		}

		$scope.invoices = invoices;
		$scope.$apply();
	});


	$scope.payInvoice = function(obj) {
		console.log(obj);

		$.ajax({
			type: "GET",
			url: "/paypal/pay.php?id=" + obj.c.id,

			success: function(data) {
				window.location.href = "https://www.paypal.com/us/cgi-bin/?cmd=_pay-inv&id=" + data.id;
			},
			dataType: "json"

		}).fail(function() {
			console.log(arguments);
		});
			
	};


	$scope.downloadInvoice = function(obj) {
		console.log(obj);

		var fonts = {
			Roboto: {
				normal: 'fonts/Roboto-Regular.ttf',
				bold: 'fonts/Roboto-Medium.ttf',
				italics: 'fonts/Roboto-Italic.ttf',
				bolditalics: 'fonts/Roboto-Italic.ttf'
			}
		};

		//var cShare = obj.c.get("currentShares");
		var cRedeem = obj.c.get("currentRedeems");

		//var CPS = obj.c.get("centPerShare");
		var CPR = obj.c.get("centPerRedeem");
	
		var docDefinition = {
			content: [
						{ text: 'Invoice', style: 'header' },
						'Invoice from Photopon, Inc.',


						{ text: 'Items:', fontSize: 14, bold: true, margin: [0, 20, 0, 8] },
						{
								widths: [ '*', 'auto', 'auto'],
								style: 'tableExample',
								table: {
										headerRows: 1,
										body: [
												[{ text: 'Description', style: 'tableHeader' }, { text: 'Amount', style: 'tableHeader'}, { text: 'Subtotal', style: 'tableHeader' }],
												//[ 'Coupon share (' + CPS + ' cents per share)' , cShare + " share(s)", "$" + CPS * cShare / 100.0 ],
												[ 'Coupon redeem (' + CPR + ' cents per redeem)', cRedeem + " redeem(s)", "$" + CPR * cRedeem / 100.0 ],
												//[ 'Total', "", "$" + (CPR * cRedeem + CPS * cShare) / 100.0 ],
												[ 'Total', "", "$" + (CPR * cRedeem ) / 100.0 ],
										]
								},
								layout: 'lightHorizontalLines'
						}
			],
			styles: {
				header: {
					fontSize: 18,
					bold: true,
					margin: [0, 0, 0, 10]
				},
				subheader: {
					fontSize: 16,
					bold: true,
					margin: [0, 10, 0, 5]
				},
				tableExample: {
					margin: [0, 5, 0, 15]
				},
				tableHeader: {
					bold: true,
					fontSize: 13,
					color: 'black'
				}
			},
			defaultStyle: {
				// alignment: 'justify'
			}
		};

		var ts = moment(obj.c.createdAt).format('YYYY-MM-DD');

		pdfMake.createPdf(docDefinition).download("invoice-" + ts + ".pdf");

			
	}

}]);

































