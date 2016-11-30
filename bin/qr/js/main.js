$(document).ready(function() {
	var num = Math.floor((new Date()).getTime() / 120000);
	var chunks = [];
	while (num > 0) {
		chunks.unshift(num % 1000);
		num = Math.floor(num / 1000);
	}
	
	$(".title-2").text(chunks.join(',')); 
});
