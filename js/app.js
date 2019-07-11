

console.log("River Boat Game");

const canvas = document.getElementById('my-canvas');
console.log(canvas);
const ctx = canvas.getContext('2d');
console.log(ctx); 

$("#my-canvas").hide()
$("#submit").hide()
$("#name").hide()
$("#gameOver").hide()
$("#sailBoat").hide()
$("#gameWon").hide()
$("#instructions").hide()
$("#shark").hide()
$("#stone").hide()
$("#cone").hide()
$("#grass").hide()

//class for the main player
class Boat {
	constructor (boatName) {
		this.name = boatName;
		this.lives = 5;
		this.x = 400;
		this.y = 700; 
		this.r = 20;
		this.speed = 10;   	
	}
	move(direction) { //move player 
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
	    game.countLives();
	    game.checkCollision();
	    game.countLives();
	    game.isAlive();
	    game.checkWin();
	    ctx.font = "30px Arial";
	    ctx.fillStyle = 'black';
		ctx.fillText("Lives: " + game.player.lives, 10, 780); //print the lives	
	}
	draw() {
		let sailBoat = $("#sailBoat");
		ctx.drawImage(sailBoat[0], this.x, this.y, 50,50);
	}
}
//class for the obstacles
class Obstacle {
	constructor(column,row) {
		this.x = column  
		this.y = row 
		this.width = 50
		this.height = 50
		this.color = "black"
	}
  	draw1() {
 		let shark = $("#shark")
		ctx.drawImage(shark[0], this.x, this.y, 50,50);
  	}
  	draw2() {
 		let cone = $("#cone")
		ctx.drawImage(cone[0], this.x, this.y, 50,50);
  	}
  	draw3() {
 		let stone = $("#stone")
		ctx.drawImage(stone[0], this.x, this.y, 50,50);
  	}
  	draw4() {
 		let croc = $("#croc")
		ctx.drawImage(croc[0], this.x, this.y, 50,50);
  	}
  	draw5() {
 		let grass = $("#grass")
		ctx.drawImage(grass[0], this.x, this.y, 50,50);
  	}	
}
//game class
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
			this.endGame();
			return false;
		} else {
			return true;
		}
		ctx.font = "30px Arial";
		ctx.fillStyle = 'black';
		ctx.fillText("Lives: " + game.player.lives, 10, 780);
	},
	makeBoat: function(boatName) {
		const gameBoat = new Boat(boatName);
		this.player = gameBoat;
		console.log(this.player);
		$( "#nameTitle" ).text(this.player.name);
		$("#name").hide();
		$("#submit").hide();
		this.player.draw();
		animate();
	},
	clearCanvas() {
  		ctx.clearRect(0, 0, canvas.width, canvas.height);
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
			if (whatPart = 450) {
				this.obstacles.push(firstObstacle)
				firstObstacle.draw1()
			} else if (whatPart = 300) {
				this.obstacles.push(firstObstacle)
				firstObstacle.draw2()
			} else if (whatPart = 150) {
				this.obstacles.push(firstObstacle)
				firstObstacle.draw3()
			} else if (whatPart = 50) {
				this.obstacles.push(firstObstacle)
				firstObstacle.draw4()
			} else if (whatPart = 600) {
				this.obstacles.push(firstObstacle)
				firstObstacle.draw5()
			}	
		}
	},
	drawObstacles() {
		for (let i = 0; i < this.obstacles.length; i++){
	    	this.obstacles[i].draw5();
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
			if (whatPart = 450) {
				this.obstacles.push(newOb)
				newOb.draw1()
			} else if (whatPart = 300) {
				this.obstacles.push(newOb)
				newOb.draw2()
			} else if (whatPart = 150) {
				this.obstacles.push(newOb)
				newOb.draw3()
			} else if (whatPart = 50) {
				this.obstacles.push(newOb)
				newOb.draw4()
			} else if (whatPart = 600) {
				this.obstacles.push(newOb)
				newOb.draw5()
			}	
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
	     		this.countLives();
	     		this.isAlive();
	         	return true;

	    	} 
		} 
		return false;
	},
	endGame: function () {
			console.log("You have died");
			stopAnimation();
			game.clearCanvas();
			$("#gameOver").show();	
	},
	checkWin() {
		if (this.player.y < 10 ) {
			game.winGame();
		}
	},
	winGame() {
			stopAnimation();
			game.clearCanvas();
			$("#gameWon").show();	
	},
	restartGame() {
		$("#gameOver").hide()
		$("#gameWon").hide()
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
	game.drawObstacles();
	game.player.draw();
	game.countLives();
	game.isAlive();
	game.checkWin();
	// every 60 frames
	frame++;
	if (frame%40 === 0) {
		game.moreObstacles();
	}
	requestID =window.requestAnimationFrame(animate);
}

function stopAnimation() {
  cancelAnimationFrame(requestID);
  animationRunning = false;
}

$("#introImage").on('click', function() {
  	$("#introImage").hide();
  	$("#name").show();
  	$("#submit").show();
  	$("#my-canvas").show();
  	$("#instructions").show();
});

$("#submit").on('click', function() {
    let theValue = $("#name").val();
    game.makeBoat(theValue);
    game.makeObstacles();
    game.countLives();
	game.isAlive();
	$("#instructions").hide();
})

$(document).on('keydown', function(e) {
	game.player.move(e.key);
});

$("#gameOver").on('click', function() {
    game.restartGame();
})

$("#gameWon").on('click', function() {
    game.restartGame();
})



