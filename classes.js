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
		this.enemyLastAttackX = undefined;
		this.enemyLastAttackY = undefined;
		this.enemyRecursionCounter = 0;
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
	 * @param {number} iterationNumber used to not exceed the max number of iterations
	 * @returns {array} coordinates for the next method
	 */
	generateCoordinates(iterationNumber = 0){

		let positionX = 0;
		let positionY = 0;

		/**
		 * @returns 1, 0 or -1
		 */
		function intBetweenMinusOneAndOne(){
			return Math.floor(Math.random() * 3) - 1;  
		}

		if(this.enemyLastAttackX == undefined && this.enemyLastAttackY == undefined){
			positionX = Math.floor(Math.random() * (10));
			positionY = Math.floor(Math.random() * (10));
		} else {
			//if the computer hits a player's ship, the next attack will be nearby
			positionX = this.enemyLastAttackX + intBetweenMinusOneAndOne();
			positionY = this.enemyLastAttackY + intBetweenMinusOneAndOne();
			
			if(positionX < 0 || positionX > 9 || positionY < 0 || positionY > 9){
				//if the numbers are out of the allowed range
				//the function is called another time
				return this.generateCoordinates();
			}
		}

		let contentPosition = playerArray[positionX][positionY];

		if(contentPosition == "M" || contentPosition == "D"){
			//the computer cannot use an already selected spot
			if(iterationNumber < 100){
				iterationNumber = iterationNumber + 1;
				return this.generateCoordinates(iterationNumber);
			} else {
				this.enemyLastAttackX = undefined;
				this.enemyLastAttackY = undefined;
				return this.generateCoordinates();
			}
		} else {
			return [positionX,positionY];
		}
	}

	/**
	 * manages the values on playerArray
	 * with the coordinates provided by the method above
	 */
	enemyAttack() {

		const coordinates = this.generateCoordinates();
		const positionX = coordinates[0];
		const positionY = coordinates[1];

		let contentPosition = playerArray[positionX][positionY];
		if(contentPosition == "S"){
			playerArray[positionX][positionY] = "D";
			//memorize last attack position only if we hit a ship
			this.enemyLastAttackX = positionX;
			this.enemyLastAttackY = positionY;
		} else if(contentPosition == "W"){
			playerArray[positionX][positionY] = "M";
		}

		//isTheGameStillActive is used to show a message
		// to the user in case the computer wins
		this.isTheGameStillActive();
	}

	/**
	 * manages the values on enemyArray
	 * with the coordinates provided by the user
	 */
	playerAttack(){
		let contentPosition = "";
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
	}
	
	/** 
	 * @param {boolean} isPlayer true if player is using this method
	 */
	attack(isPlayer){
		if (this.isTheGameStillActive()){
			if(isPlayer){
				this.playerAttack();
			} else {
				this.enemyAttack();
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
