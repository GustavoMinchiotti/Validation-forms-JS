export function valida(input) {   // esta fun recibe a input..

  const tipoDeInput = input.dataset.tipo; // la var recibe por este método el valor dado por nos de tipo de input ejemplo "nacimiento"

  // 
  if (validadores[tipoDeInput]) {
    validadores[tipoDeInput](input); // verifico dentro de esta fun de validadores si existe ese tipo de input
  }

  if (input.validity.valid) { //? ---  https://app.aluracursos.com/course/javascript-web-validacion-formularios-html5/task/77542
    input.parentElement.classList.remove("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = ""; // que si esta bien inserte una clase vacía en lugar de la clase de error
  } else {
    input.parentElement.classList.add("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML =
      mostrarMensajeDeError(tipoDeInput, input);
  }
}

// este array es para iterar los tipos de error en la fun mostrarMensajeDeError 
const tipoDeErrores = [ //* https://developer.mozilla.org/en-US/docs/Web/API/ValidityState   -- documentación
  "valueMissing",// valueMissing: es el mensaje de error de campo vacío al cual le asigno la string con mensaje
  "typeMismatch",// el campo esta lleno pero el tipo no es valido ---  https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/typeMismatch
  "patternMismatch",// el tipo de dato no corresponde al patrón requerido
  "customError",
];

const mensajesDeError = {   // objeto con objetos dentro: el padre alberga a los distintos mensajes de error...
  nombre: {
    valueMissing: "El campo nombre no puede estar vacío", // valueMissing: es el mensaje de error de campo vacío al cual le asigno la string con mensaje
  },
  email: {
    valueMissing: "El campo correo no puede estar vacío",
    typeMismatch: "El correo no es válido", // el campo esta lleno pero el tipo no es valido 
  },
  password: {
    valueMissing: "El campo contraseña no puede estar vacío",
    patternMismatch: // el tipo de dato no corresponde al patrón requerido
      "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales.",
  },
  nacimiento: {
    valueMissing: "Este campo no puede estar vacío",
    customError: "Debes tener al menos 18 años de edad", // entiendo que es un error que no conforma los if de una función creada por mi
  },
  numero: {
    valueMissing: "Este campo no puede estar vacío",
    patternMismatch: "El formato requerido es XXXXXXXXXX 10 números",
  },
  direccion: {
    valueMissing: "Este campo no puede estar vacío",
    patternMismatch: "La dirección debe contener entre 10 a 40 caracteres.",
  },
  ciudad: {
    valueMissing: "Este campo no puede estar vacío",
    patternMismatch: "La ciudad debe contener entre 10 a 40 caracteres.",
  },
  estado: {
    valueMissing: "Este campo no puede estar vacío",
    patternMismatch: "El estado debe contener entre 10 a 40 caracteres.",
  },
};

const validadores = {
  nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input) {  // ve que tipo de data set es y luego verifica el contenido
  let mensaje = "";
  tipoDeErrores.forEach((error) => {  // acá itero el array de tipos de errores 
    if (input.validity[error]) {
      console.log(tipoDeInput, error);
      console.log(input.validity[error]);
      console.log(mensajesDeError[tipoDeInput][error]);
      mensaje = mensajesDeError[tipoDeInput][error];
    }
  });
  return mensaje;
}

function validarNacimiento(input) {
  const fechaCliente = new Date(input.value);
  let mensaje = ""; // crea mensaje vacío.. si no se cumple el if el valor cambia al mensaje "debes tener..."
  if (!mayorDeEdad(fechaCliente)) {
    mensaje = "Debes tener al menos 18 años de edad";
  }

  input.setCustomValidity(mensaje); //El método SetCustomValidity define el mensaje de validación personalizado para el elemento seleccionado.
}

//? En esta función a la fecha que obtiene le suma 18 años, si resulta que la diferencia es mayor a 0 SI tiene mas de 18.
function mayorDeEdad(fecha) {
  const fechaActual = new Date();
  const diferenciaFechas = new Date(
    fecha.getUTCFullYear() + 18,
    fecha.getUTCMonth(),
    fecha.getUTCDate()
  );
  return diferenciaFechas <= fechaActual;
}
