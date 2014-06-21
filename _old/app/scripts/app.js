$(document).ready(function() {

	$('.content').load('app/partials/test.html');

	$('.next').click(function() {
		$('.content').load('app/partials/test2.html').hide().fadeIn(300);
	});

	$('.prev').click(function() {
		$('.content').load('app/partials/test.html').hide().fadeIn(300);
	});

	$('#check').click(function() {
		var form = $('form').serializeArray();
		console.log(form);
	});

	$.getJSON('app/data/test.json', function(data) {
		console.log(data);
	});

//	$.ajax({
//		url: 'app/partials/test.html',
//		dataType: 'html',
//		success: function(data) {
//			var $d = data;
//			console.log();
//		}
//	});


});