var counter = (function () {
    var temp = 0;
    return function (value) {
        if (value == "addOne"){
            return temp += 1;
        }else if (value == "read"){
            return temp;
        }
    }
})();

window.onkeyup = function(e) {
    var key = e.keyCode ? e.keyCode : e.which;
    var temp = counter("read");
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
        player.attack();
		drawBoard();
	}
}

function drawBoard(){
    context.clearRect(0, 0, canvas.width, canvas.height);       //clean the canvas

    for(let i=0;i<10;i++){											//colors the Enemy grid
		for(let l=0;l<10;l++){
			if(enemyArray[l][i] == "D"){
				context.beginPath();
				context.rect(600 + (i*40), 0 + (l*40), 40 ,40);
				context.fillStyle = "red";
				context.fill();
            }else if(enemyArray[l][i] == "M"){  //miss hit
                context.beginPath();
                context.rect(600 + (i*40), 0 + (l*40), 40 ,40);
                context.fillStyle = "blue";
                context.fill();
			} else {     //the enemy grid is initally covered
				context.beginPath();
				context.rect(600 + (i*40), 0 + (l*40), 40 ,40);
				context.fillStyle = "#999999";
				context.fill();
			}
		}
    }

    for(let i=0;i<10;i++){											//colors the player grid
		for(let l=0;l<10;l++){
			if(playerArray[l][i] == "S"){
				context.beginPath();
				context.rect(i*40,l*40, 40 ,40);
				context.fillStyle = "#666666";
				context.fill();
			}else if(playerArray[l][i] == "D"){
				context.beginPath();
				context.rect(i*40,l*40, 40 ,40);
				context.fillStyle = "red";
				context.fill();
			}else if(playerArray[l][i] == "M"){
                    context.beginPath();
                    context.rect(i*40,l*40, 40 ,40);
                    context.fillStyle = "blue";
                    context.fill();
                }else {
				context.beginPath();
				context.rect(i*40,l*40, 40 ,40);
				context.fillStyle = "lightblue";
				context.fill();
			}
		}
    }

	for(let i=0;i<10;i++){                                          //write the grid
        for(let l=0;l<10;l++){
            context.rect(40*i, 40*l, 40,40);
        }
    }
     for(let i=0;i<10;i++){                                         //write the enemy grid
        for(let l=0;l<10;l++){
            context.rect(600+40*i, 0+40*l, 40,40);
        }
    }
    context.strokeStyle = "black";
    context.stroke();
	 
	player.drawPointer();
}

function createShipsArray(rows, columns){
    var tempArray = [];
	/*
	* This creates the empy array for the ships
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

function getRandomShip(length,user){
	var newX = Math.floor(Math.random() * (11 - length));
	var newY = Math.floor(Math.random() * (11 - length));
	var orientation;
	if ((Math.floor(Math.random() * 2)) == 0) {
		orientation = "orizontal";
	} else {
		orientation = "vertical";
	}
	var tempArray = [];
	if(user == "player"){
		tempArray = playerArray;
	}else if(user == "enemy"){
		tempArray = enemyArray;
	}
	if (orientation == "orizontal") {

		for(let i=0;i<length;i++) {
			if(tempArray[newX + i][newY] != "W"){
                //controls if there are ships in that position
                break;
				getRandomShip(length);
			} else {
				tempArray[newX + i][newY] = "S";
			}
		}

	} else if (orientation == "vertical") {

		for(let i=0;i<length;i++) {
            if(tempArray[newX][newY + i] != "W"){
                break;
				getRandomShip(length);
			} else {
				tempArray[newX][newY + i] = "S";
			}
		}
	}

	return new Ship(newX,newY,length,orientation,user,true);
}

function enemyAttack(){
    positionX = Math.floor(Math.random() * (10));
    positionY = Math.floor(Math.random() * (10));
    if(
        (playerArray[positionY][positionX] == "M") &&
        (playerArray[positionY][positionX] == "D")
    ){  //prevents an attack on the same spot
        enemyAttack();
    } else if(playerArray[positionY][positionX] == "S"){
        playerArray[positionY][positionX] = "D";
    } else {
        playerArray[positionY][positionX] = "M";
    }
}
