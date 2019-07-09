console.log("River Boat Game");

const canvas = document.getElementById('my-canvas');
console.log(canvas) // cool now we have the canvas

// the "context" is what you actually draw on -- you basically always need it
const ctx = canvas.getContext('2d');
console.log(ctx); // cool, our rendering context is set up

$("#gif").hide()


class Boat {
	constructor (boatName) {
		this.name = boatName;
		this.lives = 3;
		this.x = 400 
		this.y = 700 
		this.r = 20
		this.speed = 10
	    this.isAlive = false	
	}

	move(direction) {

	    if(direction=="ArrowDown") {
	      this.y += this.speed;
	    }
	    if(direction=="ArrowUp") {
	      this.y -= this.speed;
	    }
	    if(direction=="ArrowLeft") {
	      this.x -= this.speed;
	    }
	    if(direction=="ArrowRight") {
	      this.x += this.speed;
	    }
	    game.clearCanvas();
	    this.draw();
	}

	draw() {
	  	ctx.beginPath();
	    ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
	    ctx.fillStyle = "cadetblue";
	    ctx.fill();
	}

}

const game = {

	player: null,

	makeBoat: function(boatName) {
		const gameBoat = new Boat(boatName)
		this.player = gameBoat
		console.log(this.player);
		$( "#nameTitle" ).text(this.player.name);
		$("#name").hide()
		$("#submit").hide()	
		this.player.draw()
	},

	clearCanvas() {
  		ctx.clearRect(0, 0, canvas.width, canvas.height)
	}
}


console.log(game.player);




$("#introImage").on('click', function() {
  	$("#introImage").hide();
  	$("#gif").show();
});


$("#submit").on('click', function() {
    let theValue = $("#name").val();
    game.makeBoat(theValue);
})


$(document).on('keydown', function(e) {
	game.player.move(e.key)
});







