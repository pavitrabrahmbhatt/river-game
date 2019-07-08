console.log("River Boat Game");

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");


const boat = {
	lives: 3,
	name: null,
	direction: ''
},

move: function(){

    	if(this.direction === 'left'){
    		if(this.y + 20 < 800){
    		    // move left along y axis
                this.y += 10;
    		}
    	}
    	else if(this.direction === "right"){
            if(this.y >= 20)
            // move right from y axis
    		this.y -= 10;

    	}else if(this.direction === "down"){
    	    //set to 200px so cant move above dark area
    	    if(this.x >= screenBorder + 20)
    	        this.x -= 10;

    	}else if(this.direction === "up"){
    	    //set to only move within dark grey area
    	    if(this.x <= canvas.height - screenBorder - 80) {
                this.x += 10;
            }
    	}
    }


