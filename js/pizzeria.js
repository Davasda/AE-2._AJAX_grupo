//funcion que se ejecuta una vez cargada la página.
window.onload = function(){

    //Creamos el nodo formulario y sus atributos
        let formulario = document.createElement("form")
            formulario.setAttribute("name", "formulario")
            formulario.setAttribute("id", "formulario")
            formulario.setAttribute("action","urlServidor")
            formulario.setAttribute("method","get")
        
    
            //  Creamos los nodos campos de texto donde poner el DNI, el nombre y los apellidos, la dirección y el teléfono.
            //   y asignamos los atributos a cada uno.
            let dni = document.createElement("input")
                dni.setAttribute("id", "dni")
                dni.setAttribute("type", "text")
                dni.setAttribute("name", "dni")
                dni.setAttribute("placeholder","dni con letra")
                formulario.appendChild(dni) // Añadimos el nodo dni al nodo form.
                formulario.appendChild(saltolinea.cloneNode())
    
            let nombre = document.createElement("input")
                nombre.setAttribute("id", "nombre")
                nombre.setAttribute("type", "text")
                nombre.setAttribute("name", "Nombre y apellidos")
                nombre.setAttribute("placeholder","Nombre y Apellidos")
                formulario.appendChild(nombre)
                formulario.appendChild(saltolinea.cloneNode())
    
            let direccion = document.createElement("input")
                direccion.setAttribute("id", "direccion")
                direccion.setAttribute("label", "Direccion")
                direccion.setAttribute("type", "text")
                direccion.setAttribute("name", "Direccion")
                direccion.setAttribute("placeholder","Dirección Completa")
                formulario.appendChild(direccion) // Añadimos el nodo direccion al nodo form.
                formulario.appendChild(saltolinea.cloneNode())
    
            let telefono = document.createElement("input")
                telefono.setAttribute("id", "telefono")
                telefono.setAttribute("type", "text")
                telefono.setAttribute("name", "Telefono")
                telefono.setAttribute("placeholder","Teléfono")
                formulario.appendChild(telefono) // Añadimos el nodo telefono al nodo form.
                formulario.appendChild(saltolinea.cloneNode())
    
    
        // AÑADIMOS EL FORMULARIO AL DIV DEL HTML
        divPrincipal.appendChild(formulario)
    
    // Llama a la función que solicita datos Json    
    peticionAsincrona()
}

//CARGA DEL JSON
        const URL_DESTINO = "http://localhost:5500/datos/"//Carpeta en la que se encuentra el Json
        const bbdd_pizzeria = "bbdd_pizzeria.json"// Nombre del archivo Json

        //Creamos el nodo de salto de linea que nos permite ver el formulario en lineas diferentes.
        let saltolinea = document.createElement("br");  

    // FUNCION para petición de los datos del Json.
        function peticionAsincrona() {

            let xmlHttp = new XMLHttpRequest()

            xmlHttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        respuestaJson(this.responseText)//Obtenemos el valor en texto
                    } else {
                        alert("¡¡NO SE PUEDE PROCESAR!!")
                    }
                }
            }

            xmlHttp.open('GET', URL_DESTINO + bbdd_pizzeria, true)
            xmlHttp.send(null)
        }

    // FUNCION PARA PROCESAR LOS DATOS RECIBIDOS DEL JSON
        function respuestaJson(jsonDoc) {
            //Convertimos el texto a un objeto JSON
            var pizzeriaJson = JSON.parse(jsonDoc) //Almacenamos en esta variable el json como un objeto array json
            console.log(pizzeriaJson)

        //RADIO BUTTON TAMAÑO PIZZA
           
            



        //CHECKBOX INGREDIENTES PIZZA
        
        



        }  


        

    // FUNCION PARA CALCULAR EL TOTAL DEL PEDIDO
    function totalPedido(){
        var total=0
        var totalTam =0
        //Calculamos el importe según el tamaño de la pizza        
        console.log("Calculando importe tamaño pizza")
        var tam = document.getElementsByName('tamano');
            for(i = 0; i < tam.length; i++) { 
                        if(tam[i].checked) 
                            totalTam=parseInt(tamanoPizzas[i].PRECIO_BASE)
            }
        console.log(totalTam)
        //Calculamos el importe según los ingredientes 
        console.log("Calculando importe ingredientes")
        //Variable que contiene el total de los ingredientes seleccionados
        var totalIng =0
        //Variable que contiene el numero de ingredientes del array ingredientes
        var ingrediente = document.getElementsByName('ingredientes');        
        console.log(ingrediente)
        
        // Chequeamos de array ingredientesPizzas los que estan checked
        for(i = 0; i < ingredientesPizzas.length; i++) { 
                if(ingrediente[i].checked) //Si el ingrediente del formulario esta checked
                    /*A la variabla totalIng le sumamos su contenido más el precio que aparede en el 
                    json como PRECIO_INGREDIENTE*/
                    totalIng=totalIng + parseInt(ingredientesPizzas[i].PRECIO_INGREDIENTE)
            }

        console.log("Total Ingredientes")    
        console.log(totalIng)
        /* Una vez tenemos almacenada la información en las variables que totalizan el tamaño y los ingredientes, 
        los sumamos y asignamos a la variable total.*/    
        total = totalTam+totalIng
        // Añadimos el total del pedido al div del body
        totalizarPedido.innerHTML = "<h4 align='left'>Total Pedido:</h2>" + total
        console.log(total)
        console.log("validando el pedido FIN")
}