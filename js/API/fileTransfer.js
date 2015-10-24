var ft = {

	win: function (r) {
		if(r.response){
			//EXITOSO

		navigator.notification.alert('Registrado correctamente',
			function(){
				navigator.vibrate(2000);
				navigator.notification.beep(1);
				window.localStorage.setItem('uuid',10);
				window.location.href ="home";
			},
			'Bienvenido',
			'Registrado'
		);


		}else{
			alert("Error");
		}
	},

	fail: function (error) {
		alert("Error "+error.code);
	},

	start: function(path){

		var options = new FileUploadOptions();
		options.fileKey = "foto";
		options.fileName = "Edgar";
		options.mimeType = "image/jpg";

		var ft = new FileTransfer();
		ft.upload(path, encodeURI("http://carlos.igitsoft.com/apps/test.php"), ft.win, ft.fail, options);

	}
};







