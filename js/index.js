//Funcion para inicialiar Funciones y contador
$(document).ready(function(){

    actualizar();
    mostrar();

    //BOTONES

    //Boton para registrar estudiante
    $("#b_registrar").click(function(){
        var e_cod = $("#codigo").val();
        var e_nom = $("#nombre").val();
        var e_not = $("#nota").val();

        var estudiante = {
            codigo:e_cod,
            nombre:e_nom,
            nota:e_not
        };

        localStorage.setItem(e_cod,JSON.stringify(estudiante));
        
        mostrar();
        restablecer();
        
    });

    //Boton para restablecer los inputs
    $("#b_restablecer").click(function(){
        restablecer();
    });

    //Funcion para Mostrar el promedio
    $("#b_promedio").click(function(){


        var resultado = 0;
        var cont =  localStorage.length;

        for(var i=0;i<localStorage.length+1;i++){

            var clave = localStorage.key(i);
            var contenido = $.parseJSON(localStorage.getItem(clave));
            
            resultado+= parseInt(contenido.nota);
        }

       alert("El promedio de las notas de los estudiantes registrados es:" + (resultado/cont).toFixed(2) );
    });

    //Funcion para Mostrar la nota mayor
    $("#b_mayor").click(function(){

        var claveInicio = localStorage.key(0);
        var nota_m = $.parseJSON(localStorage.getItem(claveInicio));
        

        for(var i=0;i<localStorage.length;i++){

            var clave = localStorage.key(i);
            
            var contenido = $.parseJSON(localStorage.getItem(clave));

            
            if(parseInt(nota_m.nota) < parseInt(contenido.nota)){
                nota_m = contenido
            } 

        }
        alert("El estudiante con mayor nota es: "+ nota_m.nombre + " con " + nota_m.nota);
    });

    //Funcion para Mostrar la nota menor
    $("#b_menor").click(function(){

        var claveInicio = localStorage.key(0);
        var nota_men = $.parseJSON(localStorage.getItem(claveInicio));
        
        for(var i=0;i<localStorage.length;i++){

            var clave = localStorage.key(i);
            var contenido = $.parseJSON(localStorage.getItem(clave));

            if(parseInt(nota_men.nota) >= parseInt(contenido.nota)){
                nota_men = contenido;
            } 
        } 
        alert("El estudiante con menor nota es: "+ nota_men.nombre + " con " + nota_men.nota);
    });

});

//Funcion Editar
function editar(id){
    var estudiante;
    for(var i=0; i<localStorage.length+1;i++){
        var clave = localStorage.key(i);
        if(clave==id){
            estudiante = $.parseJSON(localStorage.getItem(clave));

            $("#codigo").val(estudiante.codigo);
            $("#nombre").val(estudiante.nombre);
            $("#nota").val(estudiante.nota);
        }
    }
}

//Funcion para restabler los input
function restablecer(){
        actualizar();
        $("#nombre").val("");
        $("#nota").val("");
    }
    
//Funcion para actualizar correctamente el contador luego de agregar
function actualizar(){

    if(localStorage.length==0){
        
        var  contInicial=1;
        $("#codigo").val(contInicial);

    }else{
        var cont = 1;
        for(var i=0;i<localStorage.length;i++){
            
            var clave = localStorage.key(i);
            var contenido = $.parseJSON(localStorage.getItem(clave));

            if(cont==contenido.codigo){
                cont++;
            }else{
                break;
            }
        }
        $("#codigo").val(cont);
    }    
}

//Funcion para visualizar la tabla e actualizarla (JQUERY)
function mostrar(){

    var tbody = $("#contenido-tabla");
    var tabla = "";
    
    for(var i=0;i<localStorage.length;i++){
        var clave = localStorage.key(i);
        var contenido = $.parseJSON(localStorage.getItem(clave));

        tabla += '<tr>';
        tabla += '<td>'+contenido.codigo+'</td>';
        tabla += '<td>'+contenido.nombre+'</td>';
        tabla += '<td>'+contenido.nota+'</td>';
        tabla += '<td><button onclick="editar(\''+contenido.codigo+'\');">Editar</button></td>'; 
        tabla += '<td><button onclick="eliminar(\''+contenido.codigo+'\');">Eliminar</button></td>';    
        tabla += '</tr>';
    }
    
    $(tbody).html(tabla);
}

//Funcion para eliminar un estudiante
function eliminar(id){
    localStorage.removeItem(id);
    mostrar();
}


