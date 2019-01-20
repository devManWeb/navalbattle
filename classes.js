class Ship{
    constructor(positionX, positionY, length, orientation, enabled,definitivePosition) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.length = length;
        this.orientation = orientation;
        this.enabled = enabled;
        this.definitivePosition = false;
    }
    drawShip(){
        context.beginPath();
        context.rect(this.positionX, this.positionY, 40*this.length ,40);
        context.fillStyle = "grey";
        context.fill();
    }
    isInThatPosition(suppliedX,suppliedY){
        if((this.positionX == suppliedX) && (this.positionY == suppliedY)){
            return true;
        } else {
            return false;
        }
    }
    getRandomPosition() {
        //This method is only used by the opponent's ships at the start of the game
        if (this.length == 4) {
            return (Math.floor(Math.random() * 6))* 40;
        } else if (this.length == 3) {
            return (Math.floor(Math.random() * 7))* 40;
        } else if (this.length == 2) {
            return (Math.floor(Math.random() * 8))* 40;
        }
    }
    initialPositionEnemyShip(){
            this.positionX = 600 + this.getRandomPosition();
            this.positionY = this.getRandomPosition();
            var tempX = this.positionX - 600;
            tempX = tempX /40;
            var tempY = this.positionY;
            tempY = tempY /40;
            console.log(tempX,tempY);
            for(var i=0;i<this.length;i++){
                enemyArray[tempY][tempX+i] = "O";
            }
            //this is to fix also for the y axis
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
}
