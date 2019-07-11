console.log("River Boat Game");

const canvas = document.getElementById('my-canvas');
console.log(canvas) // cool now we have the canvas

// the "context" is what you actually draw on -- you basically always need it
const ctx = canvas.getContext('2d');
console.log(ctx); // cool, our rendering context is set up

//$("#gif").hide()
$("#my-canvas").hide()
$("#submit").hide()
$("#name").hide()
$("#gameOver").hide()



class Boat {
	constructor (boatName) {
		this.name = boatName;
		this.lives = 5;
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
	    game.countLives()
	    game.checkCollision()
	    game.countLives()
	    game.isAlive()
	    ctx.font = "30px Arial";
	    ctx.fillStyle = 'black';
		ctx.fillText("Lives: " + game.player.lives, 10, 780);
		
	}
	
	draw() {
	  	ctx.beginPath();
	    ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
	    ctx.fillStyle = "cadetblue";
	    ctx.fill();
	}
}

class Obstacle {
	constructor(column,row) {
		this.x = column  
		this.y = row 
		this.width = 50
		this.height = 50
		this.color = "black"
	}
  	draw() {
 
	    ctx.beginPath();
	    ctx.rect(this.x, this.y, this.width, this.height)
	    ctx.fillStyle = "black";
	    ctx.fill();
	    ctx.globalCompositeOperation='source-over';
  	}
  	
}
  


const game = {

	player: null,
	obstacles: [],
	isAlive: false,
	numberOfObstacles: 30,

	countLives: function (){
		if (this.checkCollision() === true){

			this.player.lives--;
			console.log(this.player.lives);

		}
		ctx.font = "30px Arial";
		ctx.fillStyle = 'black';
		ctx.fillText("Lives: " + game.player.lives, 10, 780);
		
	},

	isAlive: function(){
		if (this.player.lives <= 0) {
			this.endGame()
			return false
		} else {
			return true
		}
		ctx.font = "30px Arial";
		ctx.fillStyle = 'black';
		ctx.fillText("Lives: " + game.player.lives, 10, 780);
	},

	endGame: function () {
			console.log("You have died");
			stopAnimation()
			$("#gameOver").show()
		
	},

	makeBoat: function(boatName) {
		const gameBoat = new Boat(boatName)
		this.player = gameBoat
		console.log(this.player);
		$( "#nameTitle" ).text(this.player.name);
		$("#name").hide()
		$("#submit").hide()	
		
		this.player.draw()
		animate()
	},

	clearCanvas() {
  		ctx.clearRect(0, 0, canvas.width, canvas.height)
	},

	makeObstacles: function () {
		for (let i = 0; i < this.numberOfObstacles; i++) {
			let column = Math.floor(Math.random() * 750) + 5 
			let row = Math.floor(Math.random() * 5) + 1
			let whatPart = 0
			if (row === 1) {
				whatPart = 450 
			} else if (row === 2) {
				whatPart = 300
			} else if (row === 3) {
				whatPart = 150
			} else if (row === 4) {
				whatPart = 50
			} else if (row === 5) {
				whatPart = 600
			}
			const firstObstacle = new Obstacle(column,whatPart)
			this.obstacles.push(firstObstacle)
			firstObstacle.draw()
			
		}
	},

	
	drawObstacles() {
		for (let i = 0; i < this.obstacles.length; i++){
	    	this.obstacles[i].draw()
		}
	},
	moveObstacles() {
	 
		for (let i = 0; i < game.obstacles.length; i++){
	    	game.obstacles[i].x++;
		}

	},
	
	moreObstacles() {
		for (let i = 0; i < 2; i++) {
			let row = Math.floor(Math.random() * 5) + 1
			let whatPart = 0
			if (row === 1) {
				whatPart = 450 
			} else if (row === 2) {
				whatPart = 300
			} else if (row === 3) {
				whatPart = 150
			} else if (row === 4) {
				whatPart = 50
			} else if (row === 5) {
				whatPart = 600
			}
			let col = 60
			const newOb = new Obstacle(col,whatPart)
			this.obstacles.push(newOb)
			newOb.draw()
			console.log("hi");
			
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
	     		this.countLives()
	     		this.isAlive()
	         	return true

	    	} 
		} 
		// this.drawObstacles()
		return false
	},

	restartGame() {
		$("#gameOver").hide()
		game.player.lives = 5
		game.player.x = 400 
		game.player.y = 700 
    	game.makeObstacles();
    	game.countLives()
		game.isAlive()
		animate()
	}
}



let requestID;
let animationRunning = false;
let frame = 0
function animate() {

	animationRunning = true; 
	

	game.clearCanvas();
	game.moveObstacles();
	game.drawObstacles()
	game.player.draw();
	game.countLives()
	game.isAlive()

	

	// every 60 frames
	frame++
	if (frame%40 === 0) {
		game.moreObstacles()
	}


	requestID =window.requestAnimationFrame(animate)
}

function stopAnimation() {
  cancelAnimationFrame(requestID)
  animationRunning = false;
}


$("#introImage").on('click', function() {
  	$("#introImage").hide();
  	$("#name").show()
  	$("#submit").show()
  	$("#my-canvas").show()
  	

  	//$("#gif").show();
});


$("#submit").on('click', function() {
    let theValue = $("#name").val();
    game.makeBoat(theValue);
    game.makeObstacles();
    game.countLives()
	game.isAlive()

})


$(document).on('keydown', function(e) {
	game.player.move(e.key)
});

$("#gameOver").on('click', function() {
    game.restartGame()

})




