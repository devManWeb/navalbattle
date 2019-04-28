"use strict";

class Ship{
    constructor(positionX, positionY, length, orientation, user, enabled,definitivePosition) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.length = length;
        this.orientation = orientation;
		this.user = user;
        this.enabled = enabled;
        this.definitivePosition = false;
    }
	placeShip(){
		var array;
		if(this.user == "enemy"){
			array = enemyArray;
		}else if(this.user == "player"){
			array = playerArray;
		}
		if (this.orientation == "orizontal") {
			for(var i=0;i<length;i++) {
				array[this.positionX + i][this.positionY] = "S";
			}
		} else if (this.orientation == "vertical") {
			for(var i=0;i<length;i++) {
				array[this.positionX][this.positionY + i] = "S";
			}
		}
	}
}

class Game{
    constructor(positionX, positionY){
        this.positionX = positionX;
        this.positionY = positionY;
    }
    movePointer(newX,newY) {
        this.positionX = this.positionX + newX;
        this.positionY = this.positionY + newY;
    }
    getXPosition(){
        return this.positionX;
    }
    getYPosition(){
        return this.positionY;
    }
    drawPointer(){
        context.beginPath();
        context.rect(600 + (this.positionX *40), 0 +  (this.positionY *40), 40 ,40);
        context.fillStyle = "#00ff00";
        context.fill();
    }
	attack(){
		if (this.checkResult()){
		    if(
		        (enemyArray[this.positionY][this.positionX] != "M") &&
		        (enemyArray[this.positionY][this.positionX] != "D")
		    ){      //prevents an attack on the same spot
		        if(enemyArray[this.positionY][this.positionX] == "S"){
		            enemyArray[this.positionY][this.positionX] = "D";
		        } else {
		            enemyArray[this.positionY][this.positionX] = "M";
		        }
		        enemyAttack();
		    }
        }
	}
	checkResult(){ 
		/*
		*check the content of the enemy array and the player array
		* to see if there are still available ships
		*/
		
		function checkArray(array){
			for(let i = 0; i<10;i++){
				for(let l = 0; l<10;l++){		
					if(array[	i][l] == "S"){
						return true;
					}
				}
			}
			return false;
		}
		if(checkArray(enemyArray) == false){
			alert("You won!");
		} else if(checkArray(playerArray) == false){
			alert("You lost");
		}
		return checkArray(enemyArray) && checkArray(playerArray);		
	}
}
