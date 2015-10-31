var fn = {
    init:function(){
       // alert();
       // var x = false;
        if (!fn.estarRegistrado())
            window.location.href = '#registro';
        $('#regSend').click(fn.getReg);
        $('#tomarFoto').click(mc.start());

    },

    deviceready: function(){
        document.addEventListener("deviceready", fn.init, false);
    }

    estarRegistrado: function(){
        window.localStorage.getItem('uuid') !=undefined){
            return true;
        }
        return false;
    }

    
    getReg: function(){
       // var nom=document.getElementById('regNom').value;

        var nom = $('#regNom').val();
        var tel = $('#regTel').val();
        var mail = $('#regMail').val();
        var foto = $('#fotoTomada').attr("rel");

        if (nom!= '' && tel!= '' && mail!= '' && foto!= undefined && foto != ''){
        //if (nom!= '' && tel!= '' && mail!= ''){

            //alert(nom + '-' + tel + '-'+ mail);
            fn.enviarRegistro(nom,mail,tel,foto);
            //fn.enviarRegistro(nom,mail,tel);

        }

        else {
            //alert("Todos los campos son requeridos");
            navigator.notification.alert('Todos los campos son requeridos!');
        }
            



    },

    enviarRegistro: function(nombre,mail,telefono,foto){

            $.ajax({
                      method: "POST",
                      url: "http://carlos.igitsoft.com/apps/test.php",
                      data: { 
                        nom: nombre,
                        mail: mail,
                        tel: telefono
                    }
            }).done(function(msg){
                if(msg == 1 ){
                    // Enviar foto
                    ft.start(foto);
                 }else{
                    alert("Datos incorrectos");
                }

            });

    }
    
    
};
/*window.addEventListener("load",fn.init,false);*/
/*jQuery(dcoument).ready(fn.init);*/
//$(dcoument).ready(fn.init);


//comentar línea de abajo cuando la app esté lista para compilar
//$(fn.init);

//descomentar línea de abajo cuando la app esté lista para compilar
$(fn.deviceready);