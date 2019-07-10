console.log("River Boat Game");

const canvas = document.getElementById('my-canvas');
console.log(canvas) // cool now we have the canvas

// the "context" is what you actually draw on -- you basically always need it
const ctx = canvas.getContext('2d');
console.log(ctx); // cool, our rendering context is set up

//$("#gif").hide()


class Boat {
	constructor (boatName) {
		this.name = boatName;
		this.lives = 3;
		this.x = 400 
		this.y = 700 
		this.r = 20
		this.speed = 10
	   	
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
	    
	    game.checkCollision()
	    game.countLives()
	}
	
	draw() {
	  	ctx.beginPath();
	    ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
	    ctx.fillStyle = "cadetblue";
	    ctx.fill();
	}
}

class Obstacle {
	constructor() {
		this.x = Math.floor(Math.random() * 750) + 5   
		this.y = Math.floor(Math.random() * 600) + 5  
		this.width = 50
		this.height = 50
		this.color = "black"
	}
  	draw() {
	    ctx.beginPath();
	    ctx.rect(this.x, this.y, this.width, this.height)
	    ctx.fillStyle = "black";
	    ctx.fill();
  	}
}
  


const game = {

	player: null,
	obstacles: [],
	isAlive: false,
	numberOfObstacles: 15,

	countLives: function (){
		if (this.checkCollision() === true){
			this.player.lives--;
			console.log(this.player.lives);
		}
	},

	isAlive: function(){
		if (this.lives > 0) {
			this.isAlive = true
		} else {
			this.isAlive = false
			this.endGame()
		}
	},

	endGame: function () {
			console.log("You have died");
			//pop up screen that says ^^^
		
	},

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
	},

	makeObstacles: function () {
		for (let i = 0; i < this.numberOfObstacles; i++) {
			const firstObstacle = new Obstacle()
			this.obstacles.push(firstObstacle)
			firstObstacle.draw()
			
		}
	},

	drawObstacles() {
	    for (let i = 0; i < this.obstacles.length; i++){
	    	this.obstacles[i].draw();
	    }
	},

	checkCollision() { 
		for(let i = 0; i < this.obstacles.length; i++){
			
		    if ( 
		    	this.player.x + this.player.r > this.obstacles[i].x &&
	    		this.player.x - this.player.r < this.obstacles[i].x + this.obstacles[i].width &&
		    	this.player.y + this.player.r > this.obstacles[i].y &&
		    	this.player.y - this.player.r < this.obstacles[i].y + this.obstacles[i].height			
  			) { 
	     		console.log("collision");
	     		this.obstacles.splice(i,1);
	         	return true
	    	} 
		} 
		game.drawObstacles()
		return false
	},

	// restartGame() {

	// }
}


$("#introImage").on('click', function() {
  	$("#introImage").hide();
  	//$("#gif").show();
});


$("#submit").on('click', function() {
    let theValue = $("#name").val();
    game.makeBoat(theValue);
    game.makeObstacles();
})


$(document).on('keydown', function(e) {
	game.player.move(e.key)

});




function sayHello() {
	console.log("sayHello");
	return 5
	// asd;lfkja;sldkfja;lsdkfj;alsdkfj
	console.log("hello")
}
sayHello()
