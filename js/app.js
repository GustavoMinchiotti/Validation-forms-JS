import { valida } from "./validaciones.js";

const inputs = document.querySelectorAll("input"); //señala todos los inputs del documento y da un ARRAY al que luego iteramos

inputs.forEach((input) => { // itero con esta sentencia
  input.addEventListener("blur", (input) => {   //? el blur hace que cuando salgo del campo active la función
    valida(input.target); // al salir de foco llama a esta fun y me lleva al archivo validaciones a la fun valida.
  });
});
