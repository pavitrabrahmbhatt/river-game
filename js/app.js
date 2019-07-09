console.log("River Boat Game");

$("#gif").hide()

$("#introImage").on('click', function() {
  $("#introImage").hide();
  $("#gif").show();
});





class Boat {
	constructor (boatName) {
		this.name = boatName;
		this.lives = 3;
	}
	
}






const game = {
	lives: 3,
	name: null,
	direction: '',
	x: 400,
    y: 40,
    isAlive: false,


	// start: function () {

	// }

	makeBoat: function(boatName) {
		const gameBoat = new Boat(boatName)
		this.player = gameBoat
		console.log(this.player);
		$( "#nameTitle" ).text(this.player.name);
		$("#name").hide()
		$("#submit").hide()
		
	},

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




// game.makeBoat()


// if(key === 39){
// 		boat.direction = "right";

// 	} else if (key === 37){
// 		vamp.direction = "left";

// 	}





$("#submit").on('click', function() {
    let theValue = $("#name").val();
    game.makeBoat(theValue);
})

