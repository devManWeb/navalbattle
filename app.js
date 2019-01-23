let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let playerArray= createShipsArray(10,10);
let enemyArray= createShipsArray(10,10);

let enemyCarrier = getRandomShip(4,"enemy");
enemyCarrier.placeShip();
let enemyDestroyer = getRandomShip(3,"enemy");
enemyDestroyer.placeShip();
let enemyFrigate = getRandomShip(2,"enemy");;
enemyFrigate.placeShip();

let playerCarrier = getRandomShip(4,"player");
playerCarrier.placeShip();
let playerDestroyer = getRandomShip(3,"player");
playerDestroyer.placeShip();
let playerFrigate = getRandomShip(2,"player");
playerFrigate.placeShip();


let player = new Game();

drawBoard();
