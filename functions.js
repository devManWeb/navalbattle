"use strict";

const counter = (function () {
	//counter closure
    let storedValue = 0;
    return function (value) {
        if (value == "addOne"){
            return storedValue += 1;
        } else if (value == "read"){
            return storedValue;
        }
    }
})();

// --------------- keys listener ---------------

window.onkeyup = function(e) {
	//listener for the keys
    let key = e.keyCode ? e.keyCode : e.which;
	if (key == 38){         //up key
        if(player.getYPosition() > 0){
            player.movePointer(0,-1);
		    drawBoard();
        }
	} else if (key == 40) {  //down key
        if(player.getYPosition() < 9){
            player.movePointer(0,1);
            drawBoard();
        }
	} else if (key == 37) {  //left key
        if(player.getXPosition() > 0){
            player.movePointer(-1,0);
		    drawBoard();
        }
	} else if (key == 39) {  //right key
        if(player.getXPosition() < 9){
            player.movePointer(1,0);
		    drawBoard();
        }
	} else if (key == 13) {  //enter key
        player.attack(true);
		drawBoard();
	}
}

// --------------- DOM buttons listener ---------------

document.getElementById("up-button").addEventListener("click",function(e) {
	if(player.getYPosition() > 0){
		player.movePointer(0,-1);
		drawBoard();
	}
});

document.getElementById("down-button").addEventListener("click",function(e) {
	if(player.getYPosition() < 9){
		player.movePointer(0,1);
		drawBoard();
	}
});

document.getElementById("left-button").addEventListener("click",function(e) {
	if(player.getXPosition() > 0){
		player.movePointer(-1,0);
		drawBoard();
	}
});

document.getElementById("right-button").addEventListener("click",function(e) {
	if(player.getXPosition() < 9){
		player.movePointer(1,0);
		drawBoard();
	}
});

document.getElementById("fire-button").addEventListener("click",function(e) {
	player.attack(true);
	drawBoard();
});

/** draws the updated grid with ship info */
function drawBoard(){

	context.clearRect(0, 0, canvas.width, canvas.height);
	
    for(let x=0; x<10; x++){
		for(let y=0; y<10; y++){

			// --------------- colors the Enemy grid ---------------

			if(enemyArray[x][y] == "D"){
				context.beginPath();
				context.rect(600 + (x*40), 0 + (y*40), 40 ,40);
				context.fillStyle = "red";
				context.fill();
            } else if(enemyArray[x][y] == "M"){  //miss hit
                context.beginPath();
                context.rect(600 + (x*40), 0 + (y*40), 40 ,40);
                context.fillStyle = "blue";
                context.fill();
			} else {     //the enemy grid is initally covered
				context.beginPath();
				context.rect(600 + (x*40), 0 + (y*40), 40 ,40);
				context.fillStyle = "#999999";
				context.fill();
			}
	
			// --------------- colors the player grid ---------------

			if(playerArray[x][y] == "S"){
				context.beginPath();
				context.rect(x*40,y*40, 40 ,40);
				context.fillStyle = "#666666";
				context.fill();
			} else if(playerArray[x][y] == "D"){
				context.beginPath();
				context.rect(x*40,y*40, 40 ,40);
				context.fillStyle = "red";
				context.fill();
			} else if(playerArray[x][y] == "M"){
				context.beginPath();
				context.rect(x*40,y*40, 40 ,40);
				context.fillStyle = "blue";
				context.fill();
			} else {
				context.beginPath();
				context.rect(x*40,y*40, 40 ,40);
				context.fillStyle = "lightblue";
				context.fill();
			}

		}
	}
	
	// --------------- paints the player and enemy grids ---------------

	for(let i=0;i<10;i++){
        for(let l=0;l<10;l++){
            context.rect(40*i, 40*l, 40,40);
        }
    }
     for(let i=0;i<10;i++){
        for(let l=0;l<10;l++){
            context.rect(600+40*i, 0+40*l, 40,40);
        }
    }
    context.strokeStyle = "black";
    context.stroke();
	 
	player.drawPointer();
}

/**
 * creates the empty array for the ships
 * @param {number} rows 
 * @param {number} columns 
 * @returns {array} tempArray
 */
function createShipsArray(rows, columns){
    var tempArray = [];
	/*
	* description for the array
	* W - water
	* S - part of ship,
	* D - damaged/destroyed ship
	* M - missed attack
	*/
    for (var i = 0; i < rows; i++) {
        tempArray.push([0])
        for (var j = 0; j < columns; j++) {
            tempArray[i][j] = "W";
        }
    }
    return tempArray;
}

/**
 * creates and places the desired ship
 * @param {number} desired ship length 
 * @param {string} user name
 * @returns {object} new Ship istance or calls the function again
 */
//FIXME:sometimes we get more than 3 ships
function getRandomShip(length,user){
	
	//random new start coordinates
	let newX = Math.floor(Math.random() * (11 - length));
	let newY = Math.floor(Math.random() * (11 - length));
	
	//random orientation
	let orientation = "";
	if ((Math.floor(Math.random() * 2)) == 0) {
		orientation = "orizontal";
	} else {
		orientation = "vertical";
	}

	//choose the array to use
	let tempArray = [];
	if(user == "player"){
		tempArray = playerArray;
	}else if(user == "enemy"){
		tempArray = enemyArray;
	}

	if (orientation == "orizontal") {
		
		// --------------- are there ships nearby? ---------------

		for(let i=0; i<10; i++){
			if((newX - 1) >= 0){
				if(tempArray[newX - 1][i] == "S"){
					return getRandomShip(length,user);
				}
			}
			if((newX + 1) < 10){
				if(tempArray[newX + 1][i] == "S"){
					return getRandomShip(length,user);			
				}
			}
		}

		// --------------- are there ships in that position? ---------------

		for(let i=0; i<length; i++) {

			if(tempArray[newX + i][newY] != "W"){
				return getRandomShip(length,user);
			} else {
				tempArray[newX + i][newY] = "S";
			}
		}

	} else if (orientation == "vertical") {

		for(let i=0;i<10;i++){
			if((newY - 1) >= 0){
				if(tempArray[i][newY - 1] == "S"){
					return getRandomShip(length,user);
				}
			}
			if((newY + 1) < 10){
				if(tempArray[i][newY - 1] == "S"){
					return getRandomShip(length,user);			
				}
			}
		}

		for(let i=0;i<length;i++) {
            if(tempArray[newX][newY + i] != "W"){
				return getRandomShip(length,user);
			} else {
				tempArray[newX][newY + i] = "S";
			}
		}
	}

	return new Ship(newX,newY,length,orientation,user,true);
}

function startGame(){
	drawBoard();
}
