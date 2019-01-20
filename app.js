let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let playerArray= createShipsArray(10,10);
let enemyArray= createShipsArray(10,10);
/* Simple explanation of those arrays
* N = no ship in that position
* A = active ship in that position
* D = damaged/destroyed ship in that position
*/

let carrier = new Ship(0, 0, 4, "orizontal", true,false);
let destroyer = new Ship(0, 0, 3, "orizontal", false,false);
let frigate = new Ship(0, 0, 2, "orizontal", false,false);

let enemyCarrier = new Ship(0,0, 4, "orizontal", true);
enemyCarrier.initialPositionEnemyShip();
let enemyDestroyer = new Ship(0,0, 3, "orizontal", true);
enemyDestroyer.initialPositionEnemyShip();
let enemyFrigate = new Ship(0,0, 2, "orizontal", true);
enemyFrigate.initialPositionEnemyShip();

let player = new Game(600,0);
let opponent = new Game(0,0);

drawBoard();
