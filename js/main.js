const btnAgregar = document.getElementById("btnAgregar");
const txtNombre = document.getElementById("Name");
const txtNumber = document.getElementById("Number");
const alertValidaciones = document.getElementById("alertValidaciones");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");

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

// Evento al presionar el boton Agregar
btnAgregar.addEventListener("click", function(event){
    // Inicializamos el evento sin las alertas de error
    txtNombre.style.border = "";
    txtNumber.style.border = "";
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";

// Validación de el nombre del producto
    if (txtNombre.value.length < 3){
        // Si no se valida el nombre creamos la alerta de error
        txtNombre.style.border = "solid red medium";
        alertValidacionesTexto.innerHTML = `El <strong>Nombre</strong> no es correcto.<br/>`;
        alertValidaciones.style.display = "block";
    }

// Validación de la cantidad
    if (!validarCantidad()){
        txtNumber.style.border = "solid red medium";
        alertValidacionesTexto.innerHTML += `La <strong>Cantidad</strong> no es correcta.`;
        alertValidaciones.style.display = "block";
    }
});

// Evento blur, sucede cuando un elemento pierde el foco
txtNombre.addEventListener("blur", function(event){
    txtNombre.value = txtNombre.value.trim();
});

txtNumber.addEventListener("blur", function(event){
    txtNumber.value = txtNumber.value.trim()
});