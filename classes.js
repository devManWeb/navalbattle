"use strict";

class Ship{

    constructor(positionX, positionY, length, orientation, user, enabled) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.length = length;
        this.orientation = orientation;
		this.user = user;
        this.enabled = enabled;
	}
	
	/** writes the ship on the object grid array */
	placeShip(){
		let array = [];
		if(this.user == "enemy"){
			array = enemyArray;
		}else if(this.user == "player"){
			array = playerArray;
		}
		if (this.orientation == "orizontal") {
			for(let i=0;i<length;i++) {
				array[this.positionX + i][this.positionY] = "S";
			}
		} else if (this.orientation == "vertical") {
			for(let i=0;i<length;i++) {
				array[this.positionX][this.positionY + i] = "S";
			}
		}
	}
}

class Game{

    constructor(){
        this.positionX = 0;
        this.positionY = 0;
	}
	
	/**
	 * moves the player pointer
	 * @param {number} newX position
	 * @param {number} newY position
	 */
    movePointer(newX,newY) {
		this.positionX = this.positionX + newX;
		this.positionY = this.positionY + newY;
	}
	
	/**
	 * @returns {number} pointer x position
	 */
    getXPosition(){
        return this.positionX;
	}

	/**
	 * @returns {number} pointer y position
	 */
    getYPosition(){
        return this.positionY;
	}
	
	/**takes care of designing the attack marker*/
    drawPointer(){
        context.beginPath();
        context.rect(600 + (this.positionX *40), 0 +  (this.positionY *40), 40 ,40);
        context.fillStyle = "#00ff00";
        context.fill();
	}
	
	/** 
	 * manages the enemy attack
	 * @param {boolean} isPlayer true if player is using this method
	 */
	attack(isPlayer){

		if (this.isTheGameStillActive()){
		
			let contentPosition = "";

			if (isPlayer){

				contentPosition = enemyArray[this.positionX][this.positionY];

				if(contentPosition != "M" && contentPosition != "D"){      
					//prevents an attack on the same spot
					if(contentPosition == "S"){
						enemyArray[this.positionX][this.positionY] = "D";
					} else {
						enemyArray[this.positionX][this.positionY] = "M";
					}
					//in the end, the enemy has to attack
					this.attack(false);
				}

			} else {
				
				/** function called to do the enemy attack */
				function doEnemyAttack(){

					let positionX = Math.floor(Math.random() * (10));
					let positionY = Math.floor(Math.random() * (10));
	
					contentPosition = playerArray[positionX][positionY];
	
					if(contentPosition == "S"){
						playerArray[positionX][positionY] = "D";
					} else if(contentPosition == "W"){
						playerArray[positionX][positionY] = "M";
					} else {
						/*
						* prevents an attack on the same spot
						* by calling the internal function one more time
						*/
						doEnemyAttack();
					}

				}

				doEnemyAttack();
			}

		}
	}

	/**
	* check the content of the enemy array and the player array
	* to see if there are still available ships
	* @returns {boolean} result
	*/
	isTheGameStillActive(){ 
		
		/**
		 * Are there still ships in the selected array?
		 * @param {array} selected array
		 * @returns {boolean} result
		 */
		function noMoreShips(array){
			for(let i = 0; i<10;i++){
				for(let l = 0; l<10;l++){		
					if(array[i][l] == "S"){
						return false;
					}
				}
			}
			return true;
		}

		if(noMoreShips(enemyArray)){
			alert("You won!");
			return false;
		} else if(noMoreShips(playerArray)){
			alert("You lost");
			return false;
		} else {
			return true;
		}	
	}

}
