var canvas = document.getElementById("canvas"); //получили элемент canvas
var ctx = canvas.getContext("2d"); //используем элемент canvas в контексте 2D
var width = canvas.width; // ширина холста
var height = canvas.height;// высота холста

var blockSize = 10; //размер блока 
var widthInBlocks = width/blockSize; // количество блоков зависит от заданой ширины и высоты
var heightInBlocks = height/blockSize;

var score = 0; //счёт

var drawBorder = function() {   // функция отрисовки границы
    ctx.fillStyle = "Gray";
    ctx.fillRect(0,0,width,blockSize);
    ctx.fillRect(0,height-blockSize,width,blockSize);
    ctx.fillRect(0,0,blockSize,height);
    ctx.fillRect(width-blockSize,0,blockSize,height);
};
var drawScore = function() {   // функция отрисовки счёта
    ctx.font = "20px Courier";
    ctx.fillStyle = "Black";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Счёт: " + score,blockSize,blockSize);
};
var gameOver = function() {   // функция отрисовки Конец игры. и остановка интервала
    clearInterval(intervalId);
    ctx.font = "60px Courier";
    ctx.fillStyle = "Black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Конец игры",width/2,height/2);
};

var Block = function(col, row) {
    this.col = col;
    this.row = row;
};
