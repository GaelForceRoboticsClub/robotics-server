var socket = io.connect("http://104.236.187.122:8000");

function submit(){
	if($('#textfield1').val() != "" && $('#textfield2').val() != "" && $('#textfield3').val() != "" && $('#textfield4').val() != "" && $('#textfield5').val() != "" && $('#textfield6').prop('files') != null && $('#textfield10').val() != ""){
		var blobs = [];
		var info = {'title': $('#textfield1').val(), 'author': $('#textfield2').val(), 'date': $('#textfield3').val(), 'summary': $('#textfield4').val(), 'entry': $('#textfield5').val()};
		var files = [];
		files.push({'filename': $('#textfield6').prop('files')[0].name, 'type': 'coverphoto', 'stream': ss.createStream()});
		blobs.push($('#textfield6').prop('files')[0]);
		if($('#textfield7').prop('files') != null){
			for(var i = 0; i < $('#textfield7').prop('files').length; i++){
				files.push({'filename': $('#textfield7').prop('files')[i].name, 'type': 'photo', 'stream': ss.createStream()});
				blobs.push($('#textfield7').prop('files')[i]);
			}
		}
		if($('#textfield8').prop('files') != null){
			for(var i = 0; i < $('#textfield8').prop('files').length; i++){
				files.push({'filename': $('#textfield8').prop('files')[i].name, 'type': 'code', 'stream': ss.createStream()});
				blobs.push($('#textfield8').prop('files')[i]);
			}
		}
		if($('#checkbox-1').prop('checked') && $('#textfield9').prop('files') != null){
			files.push({'filename': $('#textfield9').prop('files')[0].name, 'type': 'buildphoto', 'stream': ss.createStream()});
			blobs.push($('#textfield9').prop('files')[0]);
		}
		ss(socket).emit('submit', $('#textfield10').val(), info, files);
		for(var i = 0; i < files.length; i++){
			ss.createBlobReadStream(blobs[i]).pipe(files[i].stream);
		}
		socket.on('status', function(status){
			$('#dirhome').click();
			var title;
			var options;
			if(status == 200){
				title = "Success";
				options = {
					body: 'The entry was uploaded successfully!',
					icon: './src/img/done.png'
				};
			}
			else if(status == 401){
				title = "Error";
				options = {
					body: 'The entry upload failed in some way',
					icon: './src/img/error.png'
				};
			}
			var myNotification = new Notification(title, options);
		});
	}
	else{
		var myNotification = new Notification("Error", {body: 'The entry upload failed in some way', icon: './src/img/error.png'});
	}
}

var docs;

function loadEntries(){
	$('#overlay').show();
	$('#loader').show();
	ss(socket).emit('loadEntries');
	ss(socket).on('entriesDocs', function(data){
		docs = data;
		for(var i = 0; i < docs.length; i++){
			var date = moment(docs[i].info.date);
			docs[i].info.dayOfWeek = date.format('dddd');
			docs[i].info.date = date.format('MMMM D, YYYY');
		}
		$('#overlay').hide();
		$('#loader').hide();
		$('#direntries').click();
	});
}