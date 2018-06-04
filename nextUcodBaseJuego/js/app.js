//Animacion que cambia el color del titulo a azul
var contadorInicio=0;
var contadorLinea=0;
var contadorLinea1=0;
var contadorMovimientos=0;
var contadorPuntaje=0;
var contadorLlenado=0;
//Funcion para cambiar el color del titulo a azul
function cambioAzul(elemento) {
  $(elemento).animate(
    {
      color:"blue"
    },2000,'linear',function () {
      cambioAmarillo(elemento)
    }
  )
}
//Funcion para cambiar el color del titulo original
function cambioBlanco(elemento) {
  $(elemento).animate(
    {
      color:"white"
    },2000,'linear',function () {
      cambioAzul(elemento)
    }
  )
}
//Animacion para cambiar el color del titulo a amarrillo
function cambioAmarillo(elemento) {
  $(elemento).animate(
    {
      color:"yellow"
    },2000,'linear',function () {
      cambioAzul(elemento)
    }
  )
}
//Funcion llenar tablero
function llenadoTablero(elemento) {
  for (var i = 0; i < 7; i++) {
    var aleatorio= Math.floor(Math.random() * (5 - 1)) + 1;
    $(elemento).append("<img src='image/"+aleatorio+".png' width='103px'>").before();
    $("img").draggable();
  }
}
//Funcion para llenar nuevamente las lineas validas del juego
function llenadoLineas() {
    var columnaVacia=($(".panel-tablero div"));
    var faltantes=new Array();
    for (var i = 0; i < columnaVacia.length; i++){
      var elemento=columnaVacia[i];
      for (var j = 0; j <7; j++) {
          var aleatorio= Math.floor(Math.random() * (5 - 1)) + 1;
          faltantes[j]=$(columnaVacia[i]).find("img")[j];
           console.log($(faltantes[j]).hasClass("eliminado"));
           if($(faltantes[j]).hasClass("eliminado")){
              $(elemento).append("<img src='image/"+aleatorio+".png' width='103px'>");
                $("img").draggable();
              // setTimeout(buscadorLineas(),4000);
             }
          }
       }
}
//Funcion para la animacion de las lineas
function animacionLinea(elementos) {
  for (var i = 0; i < elementos.length; i++) {
    $(elementos[i]).addClass("eliminado");
    $(elementos[i]).fadeOut(300);
    $(elementos[i]).fadeIn(300);
    $(elementos[i]).fadeOut(300);
    $(elementos[i]).fadeIn(300);
    $(elementos[i]).fadeOut(300);
  }
}
//Funcion encargada de la busqueda de lineas validas
function buscadorLineas() {
  var columnas=($(".panel-tablero div"));
  var linea=new Array();
  var lineaFila=new Array();
   for (var i = 0; i < columnas.length; i++) {
     var col=$(columnas[i]).find("img[src*='image/']");
       for (var j = 0; j <col.length; j++) {
          var Fila=$(columnas[j]).find("img")[i];
          var Fila1=$(columnas[j+1]).find("img")[i];
            if($(Fila).attr("src")==$(Fila1).attr("src")){
                lineaFila[j]=Fila;
                 contadorLinea1++;
                }else if(contadorLinea1<2 && ($(Fila).attr("src") != $(Fila1).attr("src"))) {
                      lineaFila[j-1]=null;
                      contadorLinea1=0;
                }else if(contadorLinea1>=2 && ($(Fila).attr("src") != $(Fila1).attr("src"))){
                      lineaFila[j+1]=Fila;
                      animacionLinea(lineaFila);
                      contadorPuntaje+=10;
                      contadorLinea1=0;
                       //$(lineaFila).remove();
                      $("#score-text").text(contadorPuntaje);
               }
             if($(col[j]).attr("src") == $(col[j+1]).attr("src")) {
                 linea[j]=col[j];
                 contadorLinea++;
                 }else if(contadorLinea<2 && ($(col[j]).attr("src") != $(col[j+1]).attr("src"))){
                       linea[j-1]=null;
                       contadorLinea=0;
                 }else if(contadorLinea>=2 && ($(col[j]).attr("src") != $(columnas[j+1]).attr("src"))){
                       linea[j+1]=col[j];
                       animacionLinea(linea);
                       contadorPuntaje+=10;
                       $(linea).empty();
                       contadorLinea=0;
                       $("#score-text").text(contadorPuntaje);
                }
        }//Fin for principal
  }
                      setTimeout(function(){llenadoLineas();},3000);
                      //setTimeout(buscadorLineas(),4000);

}
//Funcion principal de inicio
$(function () {
//Metodo para invocar el efecto del titulo
cambioBlanco($(".main-titulo"));
//Metodo para el boton reiniciar
$(".btn-reinicio").on("click",function () {
  if (contadorInicio==0) {
//Llamado a la funcion Llenado de tablero
    llenadoTablero($(".col-1"));
    llenadoTablero($(".col-2"));
    llenadoTablero($(".col-3"));
    llenadoTablero($(".col-4"));
    llenadoTablero($(".col-5"));
    llenadoTablero($(".col-6"));
    llenadoTablero($(".col-7"));
    $(this).text("Reiniciar");
    contadorInicio++;
    }else {
     location.reload();
    }
  buscadorLineas();
  })


})
