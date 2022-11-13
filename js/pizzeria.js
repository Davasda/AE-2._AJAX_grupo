//funcion que se ejecuta una vez cargada la página.
window.onload = function(){

    //Creamos el nodo formulario y sus atributos
        let formulario = document.createElement("form")
            formulario.setAttribute("name", "formulario")
            formulario.setAttribute("id", "formulario")
            formulario.setAttribute("action","urlServidor")
            formulario.setAttribute("method","get")
        
    //Creamos un titulo con texto y lo añadimos al formulario
        let titulop = document.createElement("h2")
        let textop = document.createTextNode("¿Dónde te la mandamos?")
               
        titulop.appendChild(textop)
        formulario.appendChild(titulop)
    
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
        const URL_DESTINO = "http://localhost:5501/"//Carpeta en la que se encuentra el Json
        const bbdd_pizzeria = "datos/bbdd_pizzeria.json"// Nombre del archivo Json

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

           //Creamos un titulo con texto y lo añadimos al formulario
           let tituloh3 = document.createElement("h3")
           let texto1 = document.createTextNode("¿Qué tamaño te gustaria?")
           
           tituloh3.appendChild(texto1)
           formulario.appendChild(tituloh3)
           console.log(tituloh3)

           //Almacenamos el objeto JSON datos.json en una variable, para poder acceder a ella(ARRAY)
           var tamanoPizzas = pizzeriaJson.PIZZERIA.TAMANO;

            //Creamos un FOR que vaya añadiendo atributos del JSON al DOM mediante nodos
            for(let i=0; i< tamanoPizzas.length; i++){
               let input2 = document.createElement("input")//<input></input>
               input2.setAttribute("type", "radio")//<input type="checkbox"></input>
               input2.setAttribute("name", "tamano")//<input type="checkbox" name="ingredientes"></input>
               input2.setAttribute("id", tamanoPizzas[i].TAMANO_BASE)//<input type="checkbox" name="ingredientes" id="objetoJson.ID[i]"></input>
               input2.setAttribute("value", tamanoPizzas[i].PRECIO_BASE)//<input type="checkbox" name="ingredientes" id="objetoJson.ID[i]" value="1"></input>
               let txt2 = document.createTextNode(tamanoPizzas[i].TAMANO_BASE)//objetoJson.ID[i]
               let salto2 = document.createElement("br")//<br>
               formulario.appendChild(input2) //<form> <input type="checkbox" name="ingredientes" id="objetoJson.ID[i]" value="1"></input> </form>
               formulario.appendChild(txt2)  //<input type="checkbox" name="ingredientes" id="objetoJson.ID[i]" value="1"> objetoJson.ID[i] </input>
               formulario.appendChild(salto2) //<input type="checkbox" name="ingredientes" id="objetoJson.ID[i]" value="1"> objetoJson.ID[i] </input> <br>
           }
            
        //CHECKBOX INGREDIENTES PIZZA
        
            //Creamos un titulo y lo añadimos al formulario
                let titulo2 = document.createElement("h3")
                let texto2 = document.createTextNode("¿Te gustaria añadir algún elemento más?")

                titulo2.appendChild(texto2)
                formulario.appendChild(titulo2)

            //Almacenamos el objeto JSON bbdd_pizzeria.json en una variable, para poder acceder a ella

            var ingredientesPizzas = pizzeriaJson.PIZZERIA.INGREDIENTES;

            //Creamos un FOR que vaya añadiendo atributos del JSON al DOM mediante nodos
            for(let i=0; i< ingredientesPizzas.length; i++){
                let input3 = document.createElement("input")
                input3.setAttribute("type", "checkbox")
                input3.setAttribute("name", "ingredientes")
                input3.setAttribute("id", ingredientesPizzas[i].INGREDIENTE)
                input3.setAttribute("value", ingredientesPizzas[i].PRECIO_INGREDIENTE)
                let txt3 = document.createTextNode(ingredientesPizzas[i].INGREDIENTE)
                let salto2 = document.createElement("br")
                formulario.appendChild(input3) 
                formulario.appendChild(txt3) 
                formulario.appendChild(salto2)
            }
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