if (Meteor.isClient) {

	var fichasActvas = [];
	var fichasValidas = [];
	var jugadores = [];

	function jugador(posicion, puntos, nombre){
		this.pos=posicion;
		this.puntos=puntos;
		this.nombre=nombre;
	}

	function ficha(num, coordx, coordy, rot, token) {
	    this.num = num;
	    this.coordx = coordx;
	    this.coordy = coordy;
	    this.rot = rot;
	    this.token=token;
	}
Template.meterJugadores.events({
	'submit form': function(event){
	    event.preventDefault();
	    var pos = event.target.pos.value;
	    var puntos = event.target.puntos.value;
	    var nombre = event.target.nombre.value;

	    jugadores[pos] = new jugador(pos,puntos,nombre);
	}
});
Template.meterfichaActiva.events({
	'submit form': function(event){
	    event.preventDefault();
	    var num = event.target.num.value;
	    var coordx = event.target.coordx.value;
	    var coordy = event.target.coordy.value;
	    var rot = event.target.rot.value;
	    var token= event.target.token.value;
	    var ficha= new ficha(num,coordx,coordy,rot,token);
	    fichasActivas.push(ficha);
	}

});

Template.meterfichaValida.events({
	'submit form': function(event){
	    event.preventDefault();
	    var num = event.target.num.value;
	    var coordx = event.target.coordx.value;
	    var coordy = event.target.coordy.value;
	    var rot = event.target.rot.value;
	    var token= event.target.token.value;
	    var ficha= new ficha(num,coordx,coordy,rot,token);
	    fichasValidas.push(ficha);
	}

});

Template.puntosAjugadores.events({
	'submit form': function(event){
		event.preventDefault();
		var j1= event.target.jugador1.value;
		var j2= event.target.jugador2.value;
		var j3= event.target.jugador3.value;
		var j4= event.target.jugador4.value;
		if (j1){
			jugadores[0].puntos = jugadores[0].puntos +j1;
		}
		if (j2){
			jugadores[1].puntos = jugadores[1].puntos +j2;
		}
		if (j3){
			jugadores[2].puntos = jugadores[2].puntos +j3;
		}
		if (j4){
			jugadores[3].puntos = jugadores[3].puntos +j4;
		}

	}
})



}

if (Meteor.isServer) {
  Meteor.startup(function () {

  });
}
