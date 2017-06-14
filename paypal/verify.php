<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


	require 'vendor/autoload.php';
	use Parse\ParseClient;
	use Parse\ParseQuery;
	use Parse\ParseUser;
	use Parse\ParseObject;

	$IS_SANDBOX = TRUE;


	function LogSomething($name, $value) {
		$log = new ParseObject("Log");

		$log->set("name", $name);
		$log->set("value", $value);

		$log->save(TRUE);
	}



	function InitializeParse() {
		ParseClient::initialize('qyY21OT36AiP5hIEdrzrBvbOS1HgXzIK52oyzrAN', '4lRWeelk28OYYIZBQcpP29jSwYGE15jvoRP9Vfwx', '2sVDZTTVJnQ7oX5p81wOPOsB5R7ci929Q3WIOcOs');
	//	ParseClient::setServerURL('http://YOUR_PARSE_SERVER:1337/parse');\		


	}
	function GetOurInvoice($objId) {

		$query = new ParseQuery("Bills");
		$query->includeKey("user");
		$query->equalTo("invoiceId", $objId);

	 	$invoice = $query->find(TRUE);

	 	if (count($invoice) != 1) {
	 		http_response_code(404);
	 		exit();
	 	}
	 	
	 	LogSomething("found", var_export($invoice[0], TRUE));

	 	return $invoice[0];
	}



	$inputJSON = file_get_contents('php://input');
	$input= json_decode( $inputJSON, TRUE ); 

	InitializeParse();

	LogSomething("paypal_hook", $input["resource"]["id"]);
	$invoice = GetOurInvoice($input["resource"]["id"]);

	$invoice->set("status", "PAID");
	$invoice->save();
?>

