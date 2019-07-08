console.log("River Boat Game");






const boat = {
	lives: 3,
	name: null,
	direction: '',
	x: 400,
    y: 40,
    isAlive: false,


// start: function () {

// }


move: function() {

    	if(this.direction === "left"){
    		if(this.x - 350 > 0){
    		    //move left on x axis
                this.x -= 10;
    		}
    	}

    	else if(this.direction === "right"){
            if(this.x + 350 < 800){
            // move right on x axis
    		this.x += 10;
    	    }
    	}




    	
    }

}
















