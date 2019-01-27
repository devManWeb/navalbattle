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
