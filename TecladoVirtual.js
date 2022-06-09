const keys = [
    [
        ["1", "!"],
        ["2", "@"],
        ["3", "#"],
        ["4", "$"],
        ["5", "%"],
        ["6", "&"],
        ["7", "/"],
        ["8", "("],
        ["9", ")"],
        ["0", "="],
        ["'", "?"],
        ["¡", "¿"],
    ], //Primera fila
    [
        ["q", "Q"],
        ["w", "W"],
        ["e", "E"],
        ["r", "R"],
        ["t", "T"],
        ["y", "Y"],
        ["u", "U"],
        ["i", "I"],
        ["o", "O"],
        ["p", "P"],
        ["`", "^"],
        ["+", "*"],

    ],
    [
        ["MAYUS", "MAYUS"],
        ["a", "A"],
        ["s", "S"],
        ["d", "D"],
        ["f", "F"],
        ["g", "G"],
        ["h", "H"],
        ["j", "J"],
        ["k", "K"],
        ["l", "L"],
        ["ñ", "Ñ"],
        ["¨", "{"],
        ["~", "}"],

    ],
    [
        ["SHIFT", "SHIFT"],
        ["<", ">"],
        ["z", "Z"],
        ["x", "X"],
        ["c", "C"],
        ["v", "V"],
        ["b", "B"],
        ["n", "N"],
        ["m", "M"],
        [",", ";"],
        [".", ":"],
        ["_", "_"],
    ],
    [["SPACE", "SPACE"]],// Ultima fila

];

let mayus = false;
let shift = false;
let current = null;

renderKeyboard();
// Funcion para renderizar el teclado en la aplicacion
function renderKeyboard() {
    const keyboardContainer = document.querySelector('.keyboard-container');
    let espacioVacio = `<div class="key-empty"></div>`;

    const layers = keys.map((layer) => {
        return layer.map((key) => {

            if (key[0] === 'SHIFT') {
                return `<button class="key key-shift ${shift ? "activated": " "}">${key[0]}</button>`;
            }

            if (key[0] === 'MAYUS') {
                return `<button class="key key-mayus ${mayus ? "activated" : " "}">${key[0]}</button>`;
            }

            if (key[0] === 'SPACE') {
                return `<button class="key key-space">${key[0]}</button>`;
            }

            return `<button class="key key-normal">${shift ? key[1] : mayus && key[0].toLowerCase().charCodeAt(0) >= 97 &&  key[0].toLowerCase().charCodeAt(0) <= 122
                    ? key[1]: key[0]
                }
                </button>`;

        });
    });
    // Agregando espacio vacio al final
    layers[0].push(espacioVacio);
    // Agregando espacio al inicio
    layers[1].unshift(espacioVacio);

    // Generas un array bajando nivel al arreglo que devuelve un arrays
    const htmlLayers = layers.map((layer) =>{
        return layer.join("");
    });

    keyboardContainer.innerHTML ='';

    // forEach para recorrer el array y mostrar los valores generando dinamicamnte un div o una capa en HTML
    htmlLayers.forEach(layer => {
        keyboardContainer.innerHTML +=`<div class='layer'>${layer}</div>`;
    });

    // Generando la escuha de evento click en los botones
    document.querySelectorAll('.key').forEach(key => {
        key.addEventListener('click', (e) => {   
            // console.log('Hiciste click en una tecla');
            // Validando si current tiene algun valor
            if(current){
                // Validando el contenido de la tecla SHIFT
                if(key.textContent==='SHIFT'){
                    // Cambiando el estado de la tecla shift 
                    shift = !shift;
                    // Invocando renderKeyboar()
                    // renderKeyboard();
                // Validando el contenido de la tecla MAYUS
                }else if (key.textContent === 'MAYUS'){
                    mayus = !mayus;
                     // Invocando renderKeyboar()
                    //  renderKeyboard();
                    //  Validando espacio vacio en input
                }else if (key.textContent === 'SPACE'){
                    // Concatenando espacio vacio en input es caso haya espacio vacio agregado
                    current.value += " " ;
                }else {
                    // Concatenando contenido de input
                    current.value += key.textContent.trim() ;
                    // Validando si tecla shift esta activa
                    if(shift){

                        shift = false;
                        // renderKeyboard();
                        // current.focus();
                    }
                }

                // Invocando renderKeyboar()
                renderKeyboard();
                current.focus();
            }
         });
    });

} 
// Iterando los input y accediendo a ellos
document.querySelectorAll('input').forEach((input)=>{
    // Escuchando los input el evento focusin cuando tenga algo escrito
    input.addEventListener('focusin', (e)=>{
        current = e.target ;
    });

});