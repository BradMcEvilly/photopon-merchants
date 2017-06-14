<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


	require 'vendor/autoload.php';
	use Parse\ParseClient;
	use Parse\ParseQuery;
	use Parse\ParseUser;
	use Parse\ParseObject;

	$IS_SANDBOX = FALSE;

	function InitializePaypal() {
		$ch = curl_init();
		

		$clientId = "";
		$secret = "";
		
		if ($GLOBALS['IS_SANDBOX']) {
			$clientId = "AR1lrhoTUuSPygq0OzH2lABAGgH1G5TfOf_ZxFZLRnt7amHLSSUsUECpGK95y7Naff9x95WtsVSnwmAL";
			$secret = "EMqqmXd2LTTEgkzex3mZkXsD1bRxZ0jnYHBN_d5A0gotj1pRUnhMCsYPboMPsxsZKhgzUfBeyuVBYRd7";
			curl_setopt($ch, CURLOPT_URL, "https://api.sandbox.paypal.com/v1/oauth2/token");
		} else {
			
			$clientId = "AbARazrTpDFQV-K245lzkKasycB2idNQCdzinIK2rmVuCvI3mmXdTo-mYNNOyTnQPgb2OYlMa5MpJJwq";
			$secret = "EHYtgIQ4lLtASlkg2sEChOf-FoCHRLAtESGht5yOE6abzEkCdpeubEGiTJBdTFYKVWYqbqUbGQ5ZUhYX";
			curl_setopt($ch, CURLOPT_URL, "https://api.paypal.com/v1/oauth2/token");
		}

		curl_setopt($ch, CURLOPT_HEADER, false);
		curl_setopt($ch, CURLOPT_CAINFO, 'cacert.pem');

		curl_setopt($ch, CURLOPT_POST, true);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 
		curl_setopt($ch, CURLOPT_USERPWD, $clientId.":".$secret);
		curl_setopt($ch, CURLOPT_POSTFIELDS, "grant_type=client_credentials");

		curl_setopt($ch, CURLOPT_SSLVERSION,6);

		$result = curl_exec($ch);

		if (empty($result)) {
			echo json_encode(array(
				'error' => "Failed to initialize Paypal"
			));
			exit();
		}

	    $json = json_decode($result);
		curl_close($ch);

		if (!property_exists($json, "access_token")) {

			echo json_encode(array(
				'error' => $json->message
			));
			exit();
		}
	    return $json->access_token;
	}


	function GetInvoice($objId) {
		ParseClient::initialize('qyY21OT36AiP5hIEdrzrBvbOS1HgXzIK52oyzrAN', '', '2sVDZTTVJnQ7oX5p81wOPOsB5R7ci929Q3WIOcOs');
	//	ParseClient::setServerURL('http://YOUR_PARSE_SERVER:1337/parse');


		$query = new ParseQuery("Bills");
		$query->includeKey("user");
		try {
		 	$invoice = $query->get($objId, TRUE);
		 	$invoiceId = $invoice->get("invoiceId");
		 	
		 	if ($invoiceId) {
		 		echo json_encode(array(
					'id' => $invoiceId
				));
				exit();
		 	}

			return $invoice;

		} catch (ParseException $ex) {

			echo json_encode(array(
				'error' => "Failed to get invoice"
			));
			exit();
		}
	}


	function CreatePaypalInvoice($invoice, $token) {

		$inv = array(

			'merchant_info' => array(
				"email" => "brad.mcevilly@gmail.com",
			    "first_name" => "Brad",
			    "last_name" => "McEvilly",
			    "business_name" => "Photopon Merchant",
			    "phone" => array(
			    	"country_code" => "001",
			    	"national_number" => "5032141716"
			    ),
			    "address" => array(
					"line1" => "254B Mountain Ave., Suite 201",
					"city" => "Hackettstown",
					"state" => "NJ",
					"postal_code" => "07840",
					"country_code" => "US"
			    )
			),

			'billing_info' => [ array(
				'email'=> $invoice->get("user")->get("email")
			)],

			'items' => [
				array(
					'name' => 'Photopon redeems',
					'quantity' => $invoice->get("currentRedeems"),
					'unit_price' => array(
						'currency' => 'USD',
						'value' => 0.05
					)
				)
			],

			'note' => 'Photopon Invoice',
			'payment_term' => array(
				'term_type' => 'NET_45'
			)
		);





		$ch = curl_init();
		
		if ($GLOBALS['IS_SANDBOX']) {
			curl_setopt($ch, CURLOPT_URL, "https://api.sandbox.paypal.com/v1/invoicing/invoices");
			$inv["merchant_info"]["email"] = "brad.mcevilly-facilitator@gmail.com";
		} else {
			curl_setopt($ch, CURLOPT_URL, "https://api.paypal.com/v1/invoicing/invoices");
		}

		curl_setopt($ch, CURLOPT_HEADER, false);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array(
			"Authorization: Bearer " . $token,
			"Content-Type: application/json"
		));


		curl_setopt($ch, CURLOPT_CAINFO, 'cacert.pem');

		curl_setopt($ch, CURLOPT_POST, true);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 
		curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($inv));
		curl_setopt($ch, CURLOPT_SSLVERSION,6);

		$result = curl_exec($ch);

		if (empty($result)) {
			
			echo json_encode(array(
				'error' => "Failed to create invoice"
			));
			exit();
		}

	    $json = json_decode($result);
		curl_close($ch);
	    return $json;

	}





	function SendPaypalInvoice($invoice, $token) {

		$links = $invoice->links;
		$sendlink = "";

		if ($GLOBALS['IS_SANDBOX']) {
			$sendlink = "https://api.sandbox.paypal.com/v1/invoicing/invoices/" + $invoice->id + "/send";
		} else {
			$sendlink = "https://api.paypal.com/v1/invoicing/invoices/" + $invoice->id + "/send";
		}

		for ($i = 0; $i < count($links); $i++) { 
			if ($links[$i]->rel == "send") {
				$sendlink = $links[$i]->href;
			}
		}


		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $sendlink);
		

		curl_setopt($ch, CURLOPT_HEADER, false);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array(
			"Authorization: Bearer " . $token,
			"Content-Type: application/json"
		));


		curl_setopt($ch, CURLOPT_CAINFO, 'cacert.pem');

		curl_setopt($ch, CURLOPT_POST, true);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 
		curl_setopt($ch, CURLOPT_POSTFIELDS, "");

		curl_setopt($ch, CURLOPT_SSLVERSION,6);

		$result = curl_exec($ch);

		if (curl_errno($ch) != 0) {
			echo json_encode(array(
				'error' => "Failed to send invoice"
			));
			exit();
		}
		curl_close($ch);
	}






	if (!isset($_GET["id"])) {
		header("Location: http://photopon.co/merchants/admin/#/app/invoices");
		return;
	}


	$objId = $_GET["id"];

	$invoice = GetInvoice($objId);
	$token = InitializePaypal();
	$res = CreatePaypalInvoice($invoice, $token);
	

	SendPaypalInvoice($res, $token);

	$invoice->set("status", "PENDING");
	$invoice->set("invoiceId", $res->id);
	$invoice->save(TRUE);

	echo json_encode(array(
		'id' => $res->id
	));
?>

