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
    returnPositionX(){
        return (this.positionX);
    }
    returnPositionY(){
        return (this.positionY);
    }
    drawPointer(){
        context.beginPath();
        context.rect(this.positionX, this.positionY, 40 ,40);
        context.fillStyle = "blue";
        context.fill();
    }
	attack(){

	}
}
