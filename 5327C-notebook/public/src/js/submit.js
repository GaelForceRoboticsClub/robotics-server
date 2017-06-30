$('#textfield3').on('focus', function(){
	$('#textfield3').attr('type','date');
});

$('#textfield3').on('blur', function(){
	if($('#textfield3').val() == "")
		$('#textfield3').attr('type','text');
});

$('#textfield6, #textfield7, #textfield8, #textfield9').on('focus', function(){
	$(this).attr('type','file');
});

$("#checkbox-1").change( function(){
	$('#textfield9').prop('disabled', !$('#checkbox-1').prop('checked'));
});

$('#submit').click(function(){submit()});