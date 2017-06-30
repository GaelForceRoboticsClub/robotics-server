Notification.requestPermission(function(permission){});
hljs.initHighlightingOnLoad();

$(function() {
	$('#naventries, #drawerentries').click(function(){loadEntries()});
});

function getCode(t,i){
	$.ajax({
		url: "http://dhsrobotics.com:8000/files/" + t + "/code" + i + ".c"
	})
	.done(function(data){
		$('code').append(data);
		hljs.highlightBlock($('code')[i]);
	});
}