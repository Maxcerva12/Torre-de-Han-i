// Constante que define la altura de las fichas
const altura = "60px";
// Declaración de variables
var cuerpo;
var movimientos = 0;

// Creación de tres torres con diferentes contenidos
var torre1 = new Torre(true);
var torre2 = new Torre(false);
var torre3 = new Torre(false);

// Variables de seguimiento para el movimiento de fichas
var fichaSeleccionada;
var origen;
var destino;


// Función para seleccionar el nivel de dificultad
function seleccionarNivel(nivel) {
  // Asignar un número específico de movimientos según el nivel
  if (nivel === "facil") {
    movimientos = 25;
  } else if (nivel === "medio") {
    movimientos = 20;
  } else if (nivel === "dificil") {
    movimientos = 15;
  }

  // Ocultar los botones de nivel y mostrar las torres
  document.getElementById("botones").style.display = "none";
  torre1.varilla.style.display = "block";
  torre2.varilla.style.display = "block";
  torre3.varilla.style.display = "block";

  // Actualizar el contador de movimientos
  actualizarContador();

  // Ocultar el título de selección de nivel
  document.getElementById("titulo").style.display = "none";
  document.getElementById("titulo2").style.display = "block";
  document.getElementById("sugerencia").style.display = "block"

  torre1.pata.style.display = "block"
  torre2.pata.style.display = "block"
  torre3.pata.style.display = "block"
}

// Función para crear un elemento div
function crearDiv() {
  var varilla = document.createElement("div");
  return varilla;
}

// Funciones para resaltar las torres al pasar el ratón por encima
function Over1() {
  Over(torre1);
}

function Over2() {
  Over(torre2);
}

function Over3() {
  Over(torre3);
}

function Over(Torre) {
  Torre.varilla.style.backgroundColor = "#0A1931";
}

// Funciones para quitar el resaltado al quitar el ratón
function Out1() {
  Out(torre1);
}

function Out2() {
  Out(torre2);
}

function Out3() {
  Out(torre3);
}

function Out(Torre) {
  Torre.varilla.style.backgroundColor = "black";
}

// Funciones para manejar el clic en cada torre
function Click1() {
  torre1.elegida = !torre1.elegida;
  Click(torre1);
}

function Click2() {
  torre2.elegida = !torre2.elegida;
  Click(torre2);
}

function Click3() {
  torre3.elegida = !torre3.elegida;
  Click(torre3);
}

// Función común para manejar el clic en cualquier torre
function Click(Torre) {
  if (Torre.elegida) {
    seleccionarOrigenDestino(Torre);
    Torre.varilla.style.cursor = "grabbing"
  } else {
    Torre.varilla.style.borderColor = "black";
    reiniciarOrigenDestino();
  }
}

// esta funcion es la que va a responder de llenar de vacio de blanco las torres vacias el cual tiene una Array que es donde se va a guardar todas las fichas que vayan a componer la torre.
function rellenarContenido() {
  var contenido = new Array();
  for (var i = 0; i < 5; i++) {
    contenido[i] = new Relleno();
  }
  return contenido;
}

// Función para crear un array de fichas de diferentes tamaños
function rellenarFichas() {
  var contenido = new Array();
  contenido[0] = new Relleno();
  contenido[1] = new FichaS();
  contenido[2] = new FichaM();
  contenido[3] = new FichaL();
  contenido[4] = new FichaXL();
  return contenido;
}

// Definición de clases para diferentes tamaños de fichas y relleno
function FichaS() {
  this.varilla = crearDiv();
  this.varilla.style.width = "200%";
  this.varilla.style.height = altura;
  this.varilla.style.backgroundColor = "#ef2f2e";
  this.varilla.style.marginLeft = "-15px";
  this.varilla.style.marginRight = "auto";
  this.varilla.style.borderRadius = "0.90pc";
  this.valor = 0;
}

function FichaM() {
  this.varilla = crearDiv();
  this.varilla.style.width = "400%";
  this.varilla.style.height = altura;
  this.varilla.style.backgroundColor = "#ece93c";
  this.varilla.style.marginLeft = "-45px";
  this.varilla.style.marginRight = "auto";
  this.varilla.style.borderRadius = "1.01pc";
  this.valor = 1;
}

function FichaL() {
  this.varilla = crearDiv();
  this.varilla.style.width = "600%";
  this.varilla.style.height = altura;
  this.varilla.style.backgroundColor = "#6ebe43";
  this.varilla.style.marginLeft = "-75px";
  this.varilla.style.marginRight = "auto";
   this.varilla.style.borderRadius = "1.01pc";
  this.valor = 2;
}

function FichaXL() {
  this.varilla = crearDiv();
  this.varilla.style.width = "800%";
  this.varilla.style.height = altura;
  this.varilla.style.backgroundColor = "#2d56a6";
  this.varilla.style.marginLeft = "-110px";
  this.varilla.style.marginRight = "auto";
   this.varilla.style.borderRadius = "1.01pc";
  this.valor = 3;
}

//Esta clase va a representar a todos esos bloques vacios que van a llenar las torres sin fichas
function Relleno() {
  this.varilla = crearDiv();
  this.varilla.style.width = "100%";
  this.varilla.style.height = altura;
}

function crearPata() {
  var pata = crearDiv();

  pata.style.width = "22px"; 
  pata.style.height = "279px";
  pata.style.backgroundColor = "black";
  pata.style.transform = "rotate(90deg)";
  pata.style.marginTop = "44px";
  pata.style.marginLeft = "15%";
  pata.style.marginRight = "15%";
  pata.style.position = "absolute";
  pata.style.bottom = "4px";
  pata.style.float = "left";
  pata.style.borderRadius = "5px";
  
  return pata;
}

// Clase Torre, que representa una torre con su contenido aqui se define la estructura de una torre, incluyendo su contenido, funciones para manipular las fichas, y más)
function Torre(cajaInicial) {
  // Crear un nuevo elemento div y asignarlo a la propiedad "varilla"
  this.varilla = crearDiv();
  this.pata = crearPata();
  // Establecer estilos iniciales para la torre
  this.varilla.style.width = "2%";
  this.varilla.style.height = "300px";
  this.varilla.style.marginLeft = "15%";
  this.varilla.style.marginRight = "15%";
  this.varilla.style.borderWidth = "2%";
  this.varilla.style.border = "solid black";
  this.varilla.style.float = "left";
  this.varilla.style.backgroundColor = "black";
  this.varilla.style.borderRadius = "4px 4px 0 0";
  // Inicializar la propiedad "contenido" de la torre
  this.contenido;
  // Rellenar la torre con fichas iniciales o rellenos según la condición
  if (cajaInicial) {
    this.contenido = rellenarFichas();
  } else {
    this.contenido = rellenarContenido();
  }
  // Agregar las fichas o rellenos al elemento div de la torre
  for (var i = 0; i < this.contenido.length; i++) {
    this.varilla.appendChild(this.contenido[i].varilla);
  }

  // Función para verificar si la torre tiene fichas
  this.tieneFichas = function() {
    var rellenos = 0;
    for (var i = 0; i < this.contenido.length; i++) {
      if (this.contenido[i] instanceof Relleno) {
        rellenos++;
      }
    }
    // Si todos los elementos son rellenos, la torre no tiene fichas
    if (rellenos == this.contenido.length) {
      return false;
    } else {
      return true;
    }
  };

  // Función para obtener la ficha superior de la torre
  this.obtenerFichaSuperior = function() {
    for (var i = 0; i < this.contenido.length; i++) {
      if (!(this.contenido[i] instanceof Relleno)) {
        return this.contenido[i];
      }
    }
  };

  // Función para quitar la ficha superior de la torre
  this.quitarFichaSuperior = function() {
    for (var i = 0; i < this.contenido.length; i++) {
      if (!(this.contenido[i] instanceof Relleno)) {
        // Almacenar la ficha que se va a quitar
        fichaSeleccionada = this.contenido[i];
        // Reemplazar la ficha con un relleno
        this.contenido[i] = new Relleno();
        break;
      }
    }
  };

  // Función para insertar la ficha superior en la torre
  this.insertarFichaSuperior = function() {
    for (var i = this.contenido.length - 1; i >= 0; i--) {
      if (this.contenido[i] instanceof Relleno) {
        // Insertar la ficha seleccionada en el primer relleno encontrado
        this.contenido[i] = fichaSeleccionada;
        break;
      }
    }
  };

  // Función para redibujar la torre actualizando su contenido visualmente
  this.redibujarVarilla = function() {
    // Eliminar todos los elementos hijos de la torre
    while (this.varilla.hasChildNodes()) {
      this.varilla.removeChild(this.varilla.lastChild);
    }
    // Agregar nuevamente las fichas o rellenos al elemento div
    for (var i = 0; i < this.contenido.length; i++) {
      this.varilla.appendChild(this.contenido[i].varilla);
    }
  };
}

function seleccionarOrigenDestino(Torre) {
  // Si no hay una torre de origen seleccionada y la torre actual tiene fichas, se marca la torre como origen.
  if (origen == undefined) {
      if (Torre.tieneFichas()) {
          Torre.varilla.style.borderColor = "red"; // Cambia el borde de la torre a rojo para indicar que está seleccionada.
          origen = Torre; // Marca la torre como origen.
          origen.elegida = true; // Marca la torre como elegida.
      }
  } else if (origen != undefined && destino == undefined) {
      // Si ya hay una torre de origen seleccionada pero no hay una torre de destino, se marca la torre actual como destino.
      destino = Torre; // Marca la torre como destino.
      destino.elegida = true; // Marca la torre como elegida como destino.

      // Verifica si se puede mover una ficha de la torre de origen a la torre de destino y realiza la acción correspondiente.
      if (origen != destino) {
          if (!destino.tieneFichas() || (origen.obtenerFichaSuperior().valor < destino.obtenerFichaSuperior().valor)) {
              origen.quitarFichaSuperior(); // Quita la ficha superior de la torre de origen.
              origen.redibujarVarilla(); // Actualiza visualmente la torre de origen.
              destino.insertarFichaSuperior(); // Inserta la ficha superior en la torre de destino.
              destino.redibujarVarilla(); // Actualiza visualmente la torre de destino.
              movimientos--; // Reduce el contador de movimientos.
              actualizarContador(); // Actualiza visualmente el contador de movimientos.
          }
      }
  }

  // Si hay torres de origen y destino seleccionadas, se reinician esas selecciones.
  if (destino != undefined && origen != undefined) {
      reiniciarOrigenDestino();
  }

  // Si se cumple la condición de victoria, se ejecuta la función victoria().
  if (comprobarVictoria()) {
      victoria();
  }
}

function comprobarVictoria() {
  // Verifica si la torre3 tiene la configuración específica de fichas para ganar el juego.
  if (torre3.contenido[0] instanceof Relleno && 
      torre3.contenido[1] instanceof FichaS && 
      torre3.contenido[2] instanceof FichaM && 
      torre3.contenido[3] instanceof FichaL && 
      torre3.contenido[4] instanceof FichaXL) {
      return true; // Devuelve true si la condición de victoria se cumple.
  } else {
      return false; // Devuelve false si la condición de victoria no se cumple.
  }
}


function victoria() {
  // Crea elementos de texto para el título, subtitulo y consejo.
  var textoTitulo = document.createTextNode("¡Felicidades has Ganado🎉👍🏾!");
  var textoSubtitulo = document.createTextNode("Movimientos Restantes: " + movimientos);
  var textoConsejo = document.createTextNode("Para comenzar una nueva partida, haga clic en el botón que se encuentra debajo 👇🏾🎮.");

  // Verifica y elimina los elementos de las torres y el contador si son nodos hijos del cuerpo.
  if (torre1.varilla.parentNode === cuerpo) {
      cuerpo.removeChild(torre1.varilla);
  }
  if (torre2.varilla.parentNode === cuerpo) {
      cuerpo.removeChild(torre2.varilla);
  }
  if (torre3.varilla.parentNode === cuerpo) {
      cuerpo.removeChild(torre3.varilla);
  }
  var contador = document.getElementById("contador");
  if (contador && contador.parentNode === cuerpo) {
      cuerpo.removeChild(contador);
  }

  // Crea elementos HTML para el título, subtitulo y consejo.
  var Titulo = document.createElement("h1");
  Titulo.style.color = "red";
  Titulo.appendChild(textoTitulo);

  var subtitulo = document.createElement("h2");
  subtitulo.appendChild(textoSubtitulo);

  var consejo = document.createElement("h3");
  consejo.appendChild(textoConsejo);

  torre1.pata.style.display = "none"
  torre2.pata.style.display = "none"
  torre3.pata.style.display = "none"
  document.getElementById("sugerencia").style.display = "none"

  // Oculta las torres y el contador.
  torre1.varilla.style.display = "none";
  torre2.varilla.style.display = "none";
  torre3.varilla.style.display = "none";
  if (contador) {
      contador.style.display = "none";
  }

  // Crea un botón para recargar la página.
  var botonRecargar = document.createElement("button");
  botonRecargar.innerText = "Volver a Jugar";
  botonRecargar.style.cursor = "pointer";
  botonRecargar.style.backgroundColor = "#00ffff";
  botonRecargar.style.color = "#000000";
  botonRecargar.style.border = "outset";
  botonRecargar.style.borderRadius = "25px";
  botonRecargar.style.padding = "10px 20px";
  botonRecargar.style.textTransform = "uppercase";
  botonRecargar.style.fontSize = "16px";

  // Agrega los elementos al cuerpo del documento.
  cuerpo.appendChild(Titulo);
  cuerpo.appendChild(subtitulo);
  cuerpo.appendChild(consejo);
  cuerpo.appendChild(botonRecargar);

  // Agrega un evento al botón para recargar la página cuando se hace clic.
  botonRecargar.addEventListener("click", function() {
      location.reload(); // Recarga la página.
  });
}

function reiniciarOrigenDestino() {
  // Restablece el borde y el estado elegido de la torre de origen, si existe.
  if (origen != undefined) {
      origen.varilla.style.borderColor = "black";
      origen.elegida = false;
  }
  // Restablece el borde y el estado elegido de la torre de destino, si existe.
  if (destino != undefined) {
      destino.varilla.style.borderColor = "black";
      destino.elegida = false;
  }

  // Reinicia las variables de origen y destino.
  origen = undefined;
  destino = undefined;

  // Restablece el estado elegido de todas las torres.
  torre1.elegida = false;
  torre2.elegida = false;
  torre3.elegida = false;
}


function actualizarContador() {
  // Obtiene el elemento de párrafo con el ID "contador".
  var parrafo = document.getElementById("contador");
  // Actualiza el contenido del párrafo con el número de movimientos restantes.
  parrafo.innerHTML = "Movimientos: " + movimientos;
  // Verifica si no hay movimientos restantes y no se ha alcanzado la victoria.
  if (movimientos <= 0 && !comprobarVictoria()) {
      // Llama a la función finDelJuego.
      finDelJuego();
  }
}



function iniciar() {
  // Obtener el cuerpo del documento HTML.
  cuerpo = document.getElementsByTagName("body")[0];

  document.getElementById("titulo2").style.display = "none";
  document.getElementById("sugerencia").style.display = "none"

  torre1.varilla.classList.add("torre");
  torre2.varilla.classList.add("torre");
  torre3.varilla.classList.add("torre");

  // Ocultar las varillas de las torres al inicio.
  torre1.varilla.style.display = "none";
  torre2.varilla.style.display = "none";
  torre3.varilla.style.display = "none";

  // Configurar el estilo del cuerpo.
  cuerpo.style.textAlign = "center";
  cuerpo.style.backgroundColor = "#FFEECC"

  // Agregar las varillas de las torres al cuerpo del documento.
  cuerpo.appendChild(torre1.varilla);
  cuerpo.appendChild(torre2.varilla);
  cuerpo.appendChild(torre3.varilla);

  cuerpo.appendChild(torre1.pata);
  cuerpo.appendChild(torre2.pata);
  cuerpo.appendChild(torre3.pata);
  torre1.pata.classList.add('pata1')
  torre2.pata.classList.add('pata2')
  torre3.pata.classList.add('pata3')
  torre1.pata.style.display = "none"
  torre2.pata.style.display = "none"
  torre3.pata.style.display = "none"


  // Configurar eventos de mouse y clic para las varillas de las torres.
  torre1.varilla.addEventListener("mouseover", Over1, false);
  torre2.varilla.addEventListener("mouseover", Over2, false);
  torre3.varilla.addEventListener("mouseover", Over3, false);
  torre1.varilla.addEventListener("mouseout", Out1, false);
  torre2.varilla.addEventListener("mouseout", Out2, false);
  torre3.varilla.addEventListener("mouseout", Out3, false);
  torre1.varilla.addEventListener("click", Click1, false);
  torre2.varilla.addEventListener("click", Click2, false);
  torre3.varilla.addEventListener("click", Click3, false);

  // Crear un elemento de párrafo para mostrar el contador de movimientos.
  var texto = document.createTextNode("Movimientos: " + movimientos);
  var parrafo = document.createElement("P");
  parrafo.style.clear = "both";
  parrafo.style.paddingTop = "3em";
  parrafo.setAttribute("id", "contador");
  parrafo.appendChild(texto);

  // Agregar el párrafo al cuerpo del documento.
  cuerpo.appendChild(parrafo);

  // Configurar estilo para los botones de nivel.
  var botonesNivel = document.getElementsByClassName("boton-nivel");
  for (var i = 0; i < botonesNivel.length; i++) {
  botonesNivel[i].style.display = "block";
  botonesNivel[i].style.margin = "10px auto";
  botonesNivel[i].style.padding = "10px 20px";
  botonesNivel[i].style.backgroundColor = "#FFD6A5";
  botonesNivel[i].style.color = "#000000";
  botonesNivel[i].style.border = "outset";
  botonesNivel[i].style.borderRadius = "25px";
  botonesNivel[i].style.textTransform = "uppercase";
  botonesNivel[i].style.fontSize = "16px";
  }

  // Configurar estilo para el contenedor de botones.
  var contenedorDiv = document.getElementById("botones");
  // contenedorDiv.style.backgroundColor = "#151515";
  contenedorDiv.style.padding = "10px";
  contenedorDiv.style.display = "flex"
  contenedorDiv.style.flexDirection = "row"
  contenedorDiv.style.justifyContent = "center"
  contenedorDiv.style.alignItems = "center"
  contenedorDiv.style.border = "12px solid #C8AE7D"
  contenedorDiv.style.boxSizing = "border-box"
  contenedorDiv.style.marginBottom = "20px"
}

function finDelJuego() {
  // Crear un párrafo de error.
  var textoError = document.createTextNode("Perdistes☠️ ¡Oops! Has agotado tus movimientos. 😔");
  var parrafoError = document.createElement("p");
  parrafoError.style.color = "red";
  parrafoError.appendChild(textoError);

  // Crear un botón para recargar el juego.
  var botonRecargar = document.createElement("button");
  botonRecargar.innerText = "Volver a Jugar";
  botonRecargar.style.cursor = "pointer";
  botonRecargar.style.backgroundColor = "#00ffff";
  botonRecargar.style.color = "#000000";
  botonRecargar.style.border = "outset";
  botonRecargar.style.borderRadius = "25px";
  botonRecargar.style.padding = "10px 20px";
  botonRecargar.style.textTransform = "uppercase";
  botonRecargar.style.fontSize = "16px";

  // Agregar el párrafo de error y el botón al cuerpo del documento.
  cuerpo.appendChild(parrafoError);
  cuerpo.appendChild(botonRecargar);

  // Configurar un evento clic para el botón de recarga.
  botonRecargar.addEventListener("click", function() {
      location.reload(); 
  });

  // Deshabilitar los eventos de clic en las varillas de las torres.
  torre1.varilla.removeEventListener("click", Click1, false);
  torre2.varilla.removeEventListener("click", Click2, false);
  torre3.varilla.removeEventListener("click", Click3, false);

  // Deshabilitar la interacción con las varillas de las torres.
  torre1.varilla.style.pointerEvents = "none";
  torre2.varilla.style.pointerEvents = "none";
  torre3.varilla.style.pointerEvents = "none";
}

// Configurar la función 'iniciar' para que se ejecute cuando se carga la página.
window.addEventListener("load", iniciar, false);