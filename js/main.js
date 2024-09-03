const btnAgregar = document.getElementById("btnAgregar");
const txtNombre = document.getElementById("Name");
const txtNumber = document.getElementById("Number");
const alertValidaciones = document.getElementById("alertValidaciones");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
const tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);
const contadorProductos = document.getElementById("contadorProductos");
const precioTotal = document.getElementById("precioTotal");
const productosTotal = document.getElementById("productosTotal");

let isValid = true;
let contador = 0;
let precio = 0;
let costoTotal = 0;
let totalEnProductos = 0;


// Función validar cantidad
function validarCantidad(){
    // Validamos que no este vacio
    if(txtNumber.value.length == 0){
        return false;
    }
    // Validamos que sea número
    if (isNaN(txtNumber.value)){
        return false;
    }
    // Validamos que sea mayor a 0
    if(Number(txtNumber.value) <= 0){
        return false;
    }
    
    return true;
}

// Función para devolver un precio al azar
function getPrecio(){
    return Math.round(Math.random()*10000)/100;
}

// Evento al presionar el boton Agregar
btnAgregar.addEventListener("click", function(event){
    
    // Inicializamos el evento sin las alertas de error
    txtNombre.style.border = "";
    txtNumber.style.border = "";
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";
    isValid = true;

// Validación de el nombre del producto
    if (txtNombre.value.length < 3){
        // Si no se valida el nombre creamos la alerta de error
        txtNombre.style.border = "solid red medium";
        alertValidacionesTexto.innerHTML = `El <strong>Nombre</strong> no es correcto.<br/>`;
        alertValidaciones.style.display = "block";
        isValid = false;
    }

// Validación de la cantidad
    if (!validarCantidad()){
        txtNumber.style.border = "solid red medium";
        alertValidacionesTexto.innerHTML += `La <strong>Cantidad</strong> no es correcta.`;
        alertValidaciones.style.display = "block";
        isValid = false;
    }

// Validamos que los dos datos son validos
    if(isValid){
        contador++;
        precio = getPrecio();
        let row = `<tr>
                    <td>${contador}</td>
                    <td>${txtNombre.value}</td>
                    <td>${txtNumber.value}</td>
                    <td>${precio}</td>
                </tr>`;
        cuerpoTabla.insertAdjacentHTML("beforeend", row);
        costoTotal += precio * Number(txtNumber.value);
        totalEnProductos += Number(txtNumber.value);
        contadorProductos.innerText = contador;
        precioTotal.innerText = "$" + costoTotal;
        productosTotal.innerText = totalEnProductos;
        
        // Local storage para guardar la información en el navegador
        localStorage.setItem("contador", contador);
        localStorage.setItem("totalEnProductos", totalEnProductos);
        localStorage.setItem("costoTotal", costoTotal);

        txtNombre.value = "";
        txtNumber.value = "";
        txtNombre.focus();
    }

});

// Evento blur, sucede cuando un elemento pierde el foco
txtNombre.addEventListener("blur", function(event){
    txtNombre.value = txtNombre.value.trim();
});

txtNumber.addEventListener("blur", function(event){
    txtNumber.value = txtNumber.value.trim()
});

// Evento cuando carga la pagina
window.addEventListener("load", function(event){
    // Comprobamos si no son nulos los resultados, si no lo son los cargamos a los componentes correspondientes
    if (this.localStorage.getItem("contador") != null){
        contador = Number(this.localStorage.getItem("contador"));
    }
    if (this.localStorage.getItem("totalEnProductos") != null){
        totalEnProductos = Number(this.localStorage.getItem("totalEnProductos"));
    }
    if (this.localStorage.getItem("costoTotal") != null){
        costoTotal = Number(this.localStorage.getItem("costoTotal"));
    }

    contadorProductos.innerText = contador;
    precioTotal.innerText = "$" + costoTotal;
    productosTotal.innerText = totalEnProductos;

});