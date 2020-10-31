"use strict";

// --------------- move and attack functions ---------------

function up(){
	if(player.getYPosition() > 0){
		player.movePointer(0,-1);
		drawBoard();
	}
}

function down(){
	if(player.getYPosition() < 9){
		player.movePointer(0,1);
		drawBoard();
	}
}

function left(){
	if(player.getXPosition() > 0){
		player.movePointer(-1,0);
		drawBoard();
	}
}

function right() {
	if(player.getXPosition() < 9){
		player.movePointer(1,0);
		drawBoard();
	}
}

function fire(){
	if(player.isTheGameStillActive()){
		player.attack(true);
		drawBoard();
	}
}

// --------------- keys listener ---------------

window.onkeyup = function(e) {
	let key = e.keyCode ? e.keyCode : e.which;
	if (key == 38){         //up key
		up();
	} else if (key == 40) {  //down key
		down();
	} else if (key == 37) {  //left key
		left();
	} else if (key == 39) {  //right key
		right();
	} else if (key == 13) {  //enter key
		fire();
	}
}

// --------------- DOM buttons listener ---------------

for(let i = 0; i< document.getElementsByTagName("button").length; i++){
	document.getElementsByTagName("button")[i].addEventListener("mouseup",function(e) {
		//mouseup is used instead of click to avoid trouble with enter
		if (i == 0){         //up key
			up();
		} else if (i == 4) {  //down key
			down();
		} else if (i == 1) {  //left key
			left();
		} else if (i == 3) {  //right key
			right();
		} else if (i == 2) {  //enter key
			fire();
		}
	});
}