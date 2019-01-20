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
    if (temp < 3){    //place the three ships at the beginning
        var typeOfShip;
        if (temp == 0){
            typeOfShip = carrier;
        } else if (temp == 1){
            typeOfShip = destroyer;
        } else if (temp == 2){
            typeOfShip = frigate;
        }
        if (key == 38){                             //up key
            if(typeOfShip.positionY > 0){
                typeOfShip.positionY = typeOfShip.positionY - 40;
                drawBoard();
            }
        } else if (key == 40) {                     //down key
            if(typeOfShip.positionY < 360){
                typeOfShip.positionY = typeOfShip.positionY + 40;
                drawBoard();
            }
        } else if (key == 37) {                     //left key
            if(typeOfShip.positionX > 0){
                typeOfShip.positionX = typeOfShip.positionX - 40;
                drawBoard();
            }
        } else if (key == 39) {                     //right key
            if(typeOfShip.positionX < 240 + temp*40){
                typeOfShip.positionX = typeOfShip.positionX + 40;
                drawBoard();
            }
        } else if (key == 13) {                    //enter key
            if (temp == 0){
                destroyer.enabled = true;
                counter("addOne");
                drawBoard();
            } else if (temp == 1){
                frigate.enabled = true;
                counter("addOne");
                drawBoard();
            } else if (temp == 2){
                counter("addOne");
            }
        }
    } else {
        if (key == 38){         //up key
            player.movePointer(0,-40);
            drawBoard();
        } else if (key == 40) {  //down key
            player.movePointer(0,40);
            drawBoard();
        } else if (key == 37) {  //left key
            player.movePointer(-40,0);
            drawBoard();
        } else if (key == 39) {  //right key
            player.movePointer(40,0);
            drawBoard();
        } else if (key == 13) {  //enter key
            //isOccupied(player.returnPositionX(),player.returnPositionY());
            drawBoard();
        }
    }
}

function drawBoard(){
    context.clearRect(0, 0, canvas.width, canvas.height);       //clean the canvas
    context.font="15px Georgia";
    context.fillText("Ships Battle v1.0",410,60);
    var temp = counter("read");
    //messages to the user
    if (temp == 0){
        context.fillText("Please position the carrier!",410,80);
    } else  if (temp == 1){
        context.fillText("Carrier in position!",410,80);
        context.fillText("Please position the destroyer!",410,100);
     } else if (temp == 2){
        context.fillText("Carrier in position!",410,80);
        context.fillText("Destroyer  in position!",410,100);
        context.fillText("Please position the frigate!",410,120);
     } else if (temp > 2){
        context.fillText("All ship are in position!",410,80);
     }
    for(i=0;i<10;i++){                                          //write the grid
        for(l=0;l<10;l++){
            context.rect(0+40*i, 0+40*l, 40,40);
        }
    }
     for(i=0;i<10;i++){                                         //write the enemy grid
        for(l=0;l<10;l++){
            context.rect(600+40*i, 0+40*l, 40,40);
        }
    }
    context.strokeStyle = "black";
    context.stroke();
    if(carrier.enabled){
        carrier.drawShip();
    }
    if(destroyer.enabled){
        destroyer.drawShip();
    }
    if(frigate.enabled){
        frigate.drawShip();
    }
    if(enemyCarrier.enabled){
        enemyCarrier.drawShip();
    }
    if(enemyDestroyer.enabled){
        enemyDestroyer.drawShip();
    }
    if(enemyFrigate.enabled){
        enemyFrigate.drawShip();
    }
    player.drawPointer();
}

function createShipsArray(rows, columns){
    var tempArray = [];
    //This creates the empy array for the ships
    for (var i = 0; i < rows; i++) {
        tempArray.push([0])
        for (var j = 0; j < columns; j++) {
            tempArray[i][j] = "N";
        }
    }
    return tempArray;
}
