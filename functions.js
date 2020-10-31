"use strict";

/** draws the updated grid with ship info */
function drawBoard(){

	context.clearRect(0, 0, canvas.width, canvas.height);
	
    for(let x=0; x<10; x++){
		for(let y=0; y<10; y++){

			// --------------- colors the Enemy grid ---------------

			context.beginPath();
			
			if(enemyArray[x][y] == "D"){	
				context.fillStyle = "red";
            } else if(enemyArray[x][y] == "M"){  //miss hit
                context.fillStyle = "blue";
			} else {     
				//the enemy grid is initially covered
				context.fillStyle = "#999999";	
			}

			context.rect(600 + (x*40), 0 + (y*40), 40 ,40);
			context.fill();
	
			// --------------- colors the player grid ---------------

			context.beginPath();
			
			if(playerArray[x][y] == "S"){
				context.fillStyle = "#666666";
			} else if(playerArray[x][y] == "D"){
				context.fillStyle = "red";
			} else if(playerArray[x][y] == "M"){
				context.fillStyle = "blue";
			} else {
				context.fillStyle = "lightblue";
			}

			context.rect(x*40,y*40, 40 ,40);
			context.fill();
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
    let tempArray = [];
	/*
	* description for the array
	* W - water
	* S - part of ship,
	* D - damaged/destroyed ship
	* M - missed attack
	*/
    for (let i = 0; i < rows; i++) {
        tempArray.push([0])
        for (let j = 0; j < columns; j++) {
            tempArray[i][j] = "W";
        }
    }
    return tempArray;
}

/**
 * creates and places the desired ship
 * this function uses the recursion until I can position the ship correctly
 * @param {number} desired ship length 
 * @param {string} user name
 * @returns {object} new Ship istance or calls the function again
 */
function getRandomShip(length,user){
	
	//random new start coordinates
	let newX = Math.floor(Math.random() * (11 - length));
	let newY = Math.floor(Math.random() * (11 - length));
	
	//random orientation
	let orientation = "";
	Math.floor(Math.random() * 2) == 0 ? orientation = "orizontal" : orientation = "vertical";

	//choose the array to use
	let tempArray = [];
	user == "player" ? tempArray = playerArray : tempArray = enemyArray;

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

		// --------------- Is there something there? ---------------

		for(let i=0; i<length; i++) {
			if(tempArray[newX + i][newY] != "W"){
				return getRandomShip(length,user);
			}
		}

		// --------------- I place the ship on the array ---------------

		for(let i=0; i<length; i++) {
			tempArray[newX + i][newY] = "S";
		}

	} else if (orientation == "vertical") {

		for(let i=0;i<10;i++){
			if((newY - 1) >= 0){
				if(tempArray[i][newY - 1] == "S"){
					return getRandomShip(length,user);
				}
			}
			if((newY + 1) < 10){
				if(tempArray[i][newY + 1] == "S"){
					return getRandomShip(length,user);			
				}
			}
		}

		for(let i=0;i<length;i++) {
			if(tempArray[newX][newY + i] != "W"){
				return getRandomShip(length,user);
			}
		}

		for(let i=0;i<length;i++) {
			tempArray[newX][newY + i] = "S";
		}
	}

	return new Ship(newX,newY,length,orientation,user,true);
}

function startGame(){
	drawBoard();
}
