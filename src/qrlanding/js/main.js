$(document).ready(function() {
	
	var num = Math.floor((new Date()).getTime() / 120000);
	var chunks = [];
	while (num > 0) {
		chunks.unshift(num % 1000);
		num = Math.floor(num / 1000);
	}
	
	$(".title-2").text(chunks.join(',')); 

	var now = new Date().valueOf();
	setTimeout(function () {
		if (new Date().valueOf() - now > 100) 
			return;
		
		$("body").show();
	}, 25);

	var company = window.location.hash.split("/")[1] || "all";
	var location = window.location.hash.split("/")[2] || "all";
	
	window.location = "photopon://" + company + "/" + location;



});
