"use strict";

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

// --------------- grid creation ---------------
const playerArray = createShipsArray(10,10);
const enemyArray = createShipsArray(10,10);

// --------------- enemy ship placement ---------------
const enemyCarrier = getRandomShip(4,"enemy");
enemyCarrier.placeShip();
const enemyDestroyer = getRandomShip(3,"enemy");
enemyDestroyer.placeShip();
const enemyFrigate = getRandomShip(2,"enemy");;
enemyFrigate.placeShip();

// --------------- player ship placement ---------------
const playerCarrier = getRandomShip(4,"player");
playerCarrier.placeShip();
const playerDestroyer = getRandomShip(3,"player");
playerDestroyer.placeShip();
const playerFrigate = getRandomShip(2,"player");
playerFrigate.placeShip();

// --------------- start of the game ---------------
const player = new Game(0,0);
startGame();