let canvas = document.getElementById("canvas"); //получили элемент canvas
let ctx = canvas.getContext("2d"); //используем элемент canvas в контексте 2D
let width = canvas.width; // ширина холста
let height = canvas.height;// высота холста

let blockSize = 10; //размер блока 
let widthInBlocks = width/blockSize; // количество блоков зависит от заданой ширины и высоты
let heightInBlocks = height/blockSize;

let score = 0; //счёт

let drawBorder = function() {   // функция отрисовки границы
    ctx.fillStyle = "Gray";
    ctx.fillRect(0,0,width,blockSize);
    ctx.fillRect(0,height-blockSize,width,blockSize);
    ctx.fillRect(0,0,blockSize,height);
    ctx.fillRect(width-blockSize,0,blockSize,height);
};
let drawScore = function() {   // функция отрисовки счёта
    ctx.font = "20px Courier";
    ctx.fillStyle = "Black";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Счёт: " + score,blockSize,blockSize);
};
let gameOver = function() {   // функция отрисовки Конец игры. и остановка интервала
    clearInterval(intervalId);
    ctx.font = "60px Courier";
    ctx.fillStyle = "Black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Конец игры",width/2,height/2);
};

let Block = function(col, row) { //констуктор Block
    this.col = col;
    this.row = row;
};



//let drawBorder = function() {   // функция отрисовки границы
ctx.fillStyle = "Gray";
ctx.fillRect(0,0,width,blockSize);
ctx.fillRect(0,height-blockSize,width,blockSize);
ctx.fillRect(0,0,blockSize,height);
ctx.fillRect(width-blockSize,0,blockSize,height);
};
let drawScore = function() {   // функция отрисовки счёта
ctx.font = "20px Courier";
ctx.fillStyle = "Black";
ctx.textAlign = "left";
ctx.textBaseline = "top";
ctx.fillText("Счёт: " + score,blockSize,blockSize);
};
let gameOver = function() {   // функция отрисовки Конец игры. и остановка интервала
clearInterval(intervalId);
ctx.font = "60px Courier";
ctx.fillStyle = "Black";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.fillText("Конец игры",width/2,height/2);
};

let Block = function(col, row) { //констуктор Block
this.col = col;
this.row = row;
};