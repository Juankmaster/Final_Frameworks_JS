var contadorInicio=0;
var contadorLinea=0;
var contadorLinea1=0;
var contadorMovimientos=0;
var contadorPuntaje=0;
var contadorLlenado=0;
var minutos="01:";
var timer=60;
var timer1=0;
var timerStop;
var lineaFila=new Array();
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
//Funcion temporizador
function tiempoJuego() {
  timer--;
  if (timer<0 && timer1==0) {
    timer1++;
    timer=60;
    minutos="00:"
  }  else if(timer<0 && timer1==1){
    timer=0;
    clearInterval(timerStop);
    $(".panel-tablero").hide("fold",1000);
    $(".time").hide("explode",1000);
    $(".score").css("width","1400px");
    $(".moves").css("width","1400px");
    $(".buttons").css("padding-left","700px");
    $(".panel-score").find(".final-juego").append("<h1 class='final-titulo'>GAME OVER</h1>");
    }
    $("#timer").text(minutos+timer);
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
//Funcion aleatoria para generar los elementos del tablero
function aleatorio() {
	return Math.floor(Math.random() * (5 - 1)) + 1;
}
//Funcion para llenar nuevamente las lineas validas del juego
function llenadoTablero() {
    var columnaVacia=($(".panel-tablero div"));
    var totalElementos = 7;
    columnaVacia.each(function () {
      var elementos = $(this).children().length;
      var faltantes = totalElementos - elementos;
        for (var j = 0; j < faltantes; j++) {
           var elementoAleatorio=aleatorio();
           if(j === 0 && elementos < 1){
             $(this).append("<img src='image/"+elementoAleatorio+".png' width='103px'>");
           }else {
             $(this).find('img:eq(0)').before("<img src='image/"+elementoAleatorio+".png' width='103px'>");
           }
       }
     });
      setTimeout(buscadorLineas(),2000);
}
//Funcion para la animacion y eliminacion de las lineas
function animacionLinea(elementos) {
  for (var i = 0; i < elementos.length; i++) {
    $(elementos[i]).addClass("eliminado");
      $('img.eliminado').effect('pulsate', 600);
      $('img.eliminado').animate({
          opacity: '0'
        }, {
          duration: 400
        })
        .animate({
          opacity: '0'
        }, {
          duration: 600,
          complete: function () {
            eliminarElemento()
          },
          queue: true
        });
  }
}
//Funcion que elimina los elementos en linea
function eliminarElemento() {
  $('img.eliminado').remove();
  setTimeout(function(){llenadoTablero();},1000);
	}
//Funcion encargada de la busqueda de lineas validas
function buscadorLineas() {
   var columnas=($(".panel-tablero div"));
   var linea=[];
   for (var i = 0; i < columnas.length; i++) {
     var col=$(columnas[i]).children("img");
       for (var j = 0; j <col.length; j++) {
          var Fila=$(columnas[j]).find("img")[i];
          var Fila1=$(columnas[j+1]).find("img")[i];
            if($(Fila).attr("src")==$(Fila1).attr("src")){
                 lineaFila[j]=Fila;
                 contadorLinea1++;
                }else if(contadorLinea1<2 && ($(Fila).attr("src") != $(Fila1).attr("src"))) {
                        lineaFila=[];
                        contadorLinea1=0;
                }else if(contadorLinea1>=2 && ($(Fila).attr("src") != $(Fila1).attr("src"))){
                        lineaFila[j+1]=Fila;
                        animacionLinea(lineaFila);
                        lineaFila=[];
                        contadorPuntaje+=10;
                        contadorLinea1=0;
                        $("#score-text").text(contadorPuntaje);
                    }
               if($(col[j]).attr("src") == $(col[j+1]).attr("src")) {
                   linea[j]=col[j];
                   contadorLinea++;
                   }else if(contadorLinea<2 && ($(col[j]).attr("src") != $(col[j+1]).attr("src"))){
                         linea=[];
                         contadorLinea=0;
                   }else if(contadorLinea>=2 && ($(col[j]).attr("src") != $(columnas[j+1]).attr("src"))){
                         linea[j+1]=col[j];
                         animacionLinea(linea);
                         contadorPuntaje+=10;
                         contadorLinea=0;
                         $("#score-text").text(contadorPuntaje);
                  }
          }
    }
}
//Funcion principal de inicio
$(function () {
//Metodo para invocar el efecto del titulo
  cambioBlanco($(".main-titulo"));
  $(".panel-tablero").droppable();
  $(".col-1").sortable();
  $(".col-2").sortable();
  $(".col-3").sortable();
  $(".col-4").sortable();
  $(".col-5").sortable();
  $(".col-6").sortable();
  $(".col-7").sortable();
//Metodo para el boton reiniciar
$(".btn-reinicio").on("click",function () {
  if (contadorInicio==0) {
//Llamado a la funcion Llenado de tablero
    llenadoTablero();
    $(this).text("Reiniciar");
      contadorInicio++;
    }else {
      location.reload();
    }
      timerStop=setInterval(tiempoJuego, 1000);
  });
  //Funcion para los movimientos del jugador
  $(".panel-tablero").on("mouseup",function () {
     setTimeout(function(){llenadoTablero();},2000);
     contadorMovimientos++;
     $("#movimientos-text").text(contadorMovimientos);
  })
})
