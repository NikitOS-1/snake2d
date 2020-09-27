const { func } = require("prop-types");

let canvas = document.getElementById("canvas"); //  получили элемент canvas
let ctx = canvas.getContext("2d"); //   используем элемент canvas в контексте 2D
let width = canvas.width; //    ширина холста
let height = canvas.height;//   высота холста

let blockSize = 10; //  размер блока 
let widthInBlocks = width / blockSize; //   количество блоков зависит от заданой ширины и высоты
let heightInBlocks = height / blockSize;

let score = 0; //   счёт

let drawBorder = function () {   // функция отрисовки границы
    ctx.fillStyle = "Gray";
    ctx.fillRect(0, 0, width, blockSize);
    ctx.fillRect(0, height - blockSize, width, blockSize);
    ctx.fillRect(0, 0, blockSize, height);
    ctx.fillRect(width - blockSize, 0, blockSize, height);
};
let drawScore = function () {   //  функция отрисовки счёта
    ctx.font = "20px Courier";
    ctx.fillStyle = "Black";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Счёт: " + score, blockSize, blockSize);
};
let gameOver = function () {   //   функция отрисовки Конец игры. и остановка интервала
    clearInterval(intervalId);
    ctx.font = "60px Courier";
    ctx.fillStyle = "Black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Конец игры", width / 2, height / 2);
};
let circle = function (x, y, radius, fillCircle) { //   функция отрисовки круга
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    fillCircle ? ctx.fill() : ctx.stroke();
};

let Block = function (col, row) {  //   конструктор Block
    this.col = col;
    this.row = row;
};
Block.prototype.drawSquare = function (color) { //  отрисовка квадрата в заданых координатах блока сетка
    let x = this.col * blockSize;
    let y = this.row * blockSize;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, blockSize, blockSize);
};
Block.prototype.drawCircle = function (color) {  // отрисовка круга в заданых координатах блока(яблоко)
    let centerX = this.col * blockSize + blockSize / 2;
    let centery = this.row * blockSize + blockSize / 2;
    ctx.fillStyle = color;
    circle(centerX, centery, blockSize / 2, true);
};
Block.prototype.equal = function (otherBlock) { //  проверка не находятся ли 2 ячейки в одном месте
    return this.col === otherBlock.col && this.row === otherBlock.row
}

let Snake = function () {  //               сегмент тела змейки
    this.segments = [
        new Block(7, 5),
        new Block(6, 5),
        new Block(5, 5)
    ];
    this.direction = "right"; //    текущее направление ячейки 
    this.nextDirection = "right"; //    следующее направление 
};
Snake.prototype.draw = function () {  //    отрисовка змейки 
    for (i = 0; i < this.segments.length; i++) {
        this.segments[i].drawSquare("Blue");
    };
};
Snake.prototype.move = function () { //     перемешение
    let head = this.segments[0]; // голова змейки
    let newHead; // новая голова 

    this.direction = this.nextDirection; // направление соответствует текущему выбору

    if (this.direction === 'right') { //    вправо //   текущий выбор 
        newHead = new Block(head.col + 1, head.row);
    } else if (this.direction === 'down') { //  вниз
        newHead = new Block(head.col, head.row + 1);
    } else if (this.direction === 'left') { //  влево
        newHead = new Block(head.col - 1, head.row);
    } else if (this.direction === 'up') {   //  вверх
        newHead = new Block(head.col, head.row - 1);
    };

    if (this.checkCollision(newHead)) { //  проверка не врезалась ли змейка в тену или в себя
        gameOver();
        return;
    }

    this.segments.unshift(newHead); //  добавить новую голову 

    if (newHead.equal(apple.position)) { // съели ли яблоко
        score++;
        apple.move();
    } else {
        this.segments.pop(); // убрать сегмент хвоста
    };
};
Snake.prototype.checkCollision = function (head) { //    проверка на столкновение с собой или стеной
    let leftCollision = (head.col === 0);
    let topCollision = (head.row === 0);
    let rightCollision = (head.col === widthInBlocks - 1);
    let bottomCollision = (head.row === heightInBlocks - 1);

    let wallCollision = leftCollision || topCollision || rightCollision || bottomCollision;
    let selfCollision = false;

    for (i = 0; i < this.segments.length; i++) {
        if (head.equal(this.segments[i])) {
            selfCollision = true;
        };
    };

    return wallCollision || selfCollision;
};