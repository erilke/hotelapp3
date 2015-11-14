var fn = {
	init: function(){
		if(!fn.islogged())
			window.location.href = "#reg";

	
		//Funcionalidades de Registro
		$('#regSend').click(fn.getRegister);
		$('#takePhoto').click(mediaCapture.takePhoto);
		$('#nr1 ul[data-role=listview] a').click(fn.seleccionarTipo);
		$('#nr1 div[data-role= navbar] li').click(fn.nr1Siguiente);
		$('#nr2 div[data-role= navbar] li').click(fn.nr2Reservar);

		conexion.eventoConectado();

	},
	ready:function(){
		document.addEventListener("deviceready", fn.init, false);
	},
	islogged: function(){
		return ls.estaRegistrado();
	},
	getRegister: function(){
		var nom = $('#regName').val();
		var tel = $('#regTel').val();
		var mail = $('#regMail').val();
		var foto = $('#regPhoto').attr('rel');
		if(nom != '' && tel != '' && mail != '' && foto != undefined && foto != ''){
			server.regSend(nom, tel, mail, foto);
		}else{
			navigator.notification.alert('Todos los campos son requeridos', null, "Error de Registro", "Aceptar");
		}
	},
	seleccionarTipo: function(){
//		console.log($(this));
		$(this).parents("ul").find("a").removeClass("ui-btn-active");
		$(this).addClass("ui-btn-active");
		$("#nr1").attr("th", $(this).text());
	},
	nr1Siguiente: function() {

		/* $(this).index()==1 se utiliza para saber que se pulsa el boton siguiente que en el index es el 1.*/
		if( $(this).index()==1 && $("#nr1").attr("th") != undefined){
			/* Opcion seleccionada, pasar a la siguiente pantalla*/
			window.location.href="#nr2";
		}else{
			if ( $(this).index()!==0) {
				alert("Es necesario seleccionar un tipo de habitación");
			};

		}
	},

	nr2Reservar: function(){
		var th = $("#nr1").attr("th");
		var np = $("#numPersonas").val();
		var nh = $("#numHabitaciones").val();		
		var nd = $("#numDias").val();
		//console.log(th + np + nh + nd);

		if( conexion.estaConectado() ){
			/*Enviar información al servidor*/
			server.envRes(th, np, nh, nd);

		}else{
			/* Almacenar en el dispositivo*/
			$.mobile.loading("show");
			almacen.guardarReserva(th, np, nh, nd);
			$.mobile.loading("hide");
		}
	}
};

$(fn.ready);
//fn.init();