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
		drawBoard();
	} else if (key == 40) {  //down key

		drawBoard();
	} else if (key == 37) {  //left key

		drawBoard();
	} else if (key == 39) {  //right key

		drawBoard();
	} else if (key == 13) {  //enter key

		drawBoard();
	}
}

function drawBoard(){
    context.clearRect(0, 0, canvas.width, canvas.height);       //clean the canvas
    context.font="15px Georgia";
    context.fillText("Ships Battle v1.0",410,60);

    for(i=0;i<10;i++){											//colors the Enemy grid
		for(l=0;l<10;l++){
			if(enemyArray[i][l] == "S"){
				context.beginPath();
				context.rect(600 + (i*40), 0 + (l*40), 40 ,40);
				context.fillStyle = "grey";
				context.fill();
			}else if(enemyArray[i][l] == "D"){
				context.beginPath();
				context.rect(600 + (i*40), 0 + (l*40), 40 ,40);
				context.fillStyle = "red";
				context.fill();
			} else {
				context.beginPath();
				context.rect(600 + (i*40), 0 + (l*40), 40 ,40);
				context.fillStyle = "lightblue";
				context.fill();
			}
		}
    }

    for(i=0;i<10;i++){											//colors the player grid
		for(l=0;l<10;l++){
			if(playerArray[i][l] == "S"){
				context.beginPath();
				context.rect(i*40,l*40, 40 ,40);
				context.fillStyle = "grey";
				context.fill();
			}else if(playerArray[i][l] == "D"){
				context.beginPath();
				context.rect(i*40,l*40, 40 ,40);
				context.fillStyle = "red";
				context.fill();
			} else {
				context.beginPath();
				context.rect(i*40,l*40, 40 ,40);
				context.fillStyle = "lightblue";
				context.fill();
			}
		}
    }

	for(i=0;i<10;i++){                                          //write the grid
        for(l=0;l<10;l++){
            context.rect(40*i, 40*l, 40,40);
        }
    }
     for(i=0;i<10;i++){                                         //write the enemy grid
        for(l=0;l<10;l++){
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
	* S - part of ship
	* D - damaged/destroyed ship
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
	var newX = Math.floor(Math.random() * (10 - length));
	var newY = Math.floor(Math.random() * (10 - length));
    console.log(newX);
    console.log(newY);
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

		for(i=0;i<length;i++) {
			if(tempArray[newX + i][newY] != "W"){
				getRandomShip(length);
				break;
			} else {
				tempArray[newX + i][newY] = "S";
			}
		}

	} else if (orientation == "vertical") {

		for(i=0;i<length;i++) {
			if(tempArray[newX][newY + i] != "W"){
				getRandomShip(length);
				break;
			} else {
				tempArray[newX][newY + i] = "S";
			}
		}
	}

	return new Ship(newX,newY,length,orientation,user,true);
}
