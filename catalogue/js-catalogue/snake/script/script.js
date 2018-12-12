//Размеры игрового поля
const FIELD_SIZE_X = 30;
const FIELD_SIZE_Y = 30;

//Массив змейки
let snake = [];

//Скорость змейки
let snakeSpeed = 300;

//Таймер змейки
let snakeTimer;

//Направление движения
let moveDirection = 'right';

//Таймер еды
let foodTimer;

//Очки
let score = 0;

//Загрузка игры
function gameLoad() {
    gameFieldGen();
    document.getElementById('game-start').addEventListener('click', function startGame(){
        snakeTimer = setInterval(move, snakeSpeed);
        removeEventListener('click', startGame);
    })

    addEventListener('keydown', changeMoveDirection);
}

function changeMoveDirection(e) {
    // console.log(e);
    switch(e.keyCode) {
        case 38:
        moveDirection = 'up';
        break;
        case 40:
        moveDirection = 'down';
        break;
        case 37:
        moveDirection = 'left';
        break;
        case 39:
        moveDirection = 'right';
        break;
    }
}

//Перезапуск

// let reStart = document.getElementById('new-game');
// reStart.addEventListener('click', function reStartGame(){
    
//     reStart.removeEventListener('click', reStartGame);
// })

//Генерация игрового поля
function gameFieldGen() {
    let gameFieldTable = document.createElement('table');
    gameFieldTable.id = "game-field-table";

    for (let i = 0; i <= FIELD_SIZE_Y; i++) {
        let row = document.createElement('tr');
        row.setAttribute('class', 'game-table-row row-' + i);

        for (let j = 0; j <= FIELD_SIZE_X; j++) {
            let cell = document.createElement('td');
            cell.setAttribute('class', 'game-table-cell cell-' + j + '-' + i);
            gameFieldTable.appendChild(cell);
        }
        gameFieldTable.appendChild(row);
    }

    let gameField = document.getElementById('game-field');
    gameField.appendChild(gameFieldTable);

    snakeGen();
    // move();
}
//Генерация змеи
function snakeGen() { 
    let startCoordX = Math.round(FIELD_SIZE_X / 2); //отцентровываем стартовую позицию змеи, округляем полученное значение на всякий случай
    let startCoordY = Math.round(FIELD_SIZE_Y / 2);

    let snakeHead = document.getElementsByClassName('cell-' + startCoordX + '-' + startCoordY)[0]; //получаем координаты головы
    let prevSnakeHeadAttr = snakeHead.getAttribute('class'); //сохраняем предыдущие классы ячейки
    snakeHead.setAttribute('class', prevSnakeHeadAttr + ' snake-unit');

    let snakeTail = document.getElementsByClassName('cell-' + (startCoordX - 1) + '-' + startCoordY)[0];
    let prevSnakeTailAttr = snakeTail.getAttribute('class');
    snakeTail.setAttribute('class', prevSnakeTailAttr + ' snake-unit');

    snake.push(snakeTail);
    snake.push(snakeHead);
}

//Движение змеи
function move() {
    let snakeHeadClasses = snake[snake.length - 1].getAttribute('class').split(' ');

    let newUnit;
    let snakeCoords = snakeHeadClasses[1].split('-');
    let CoordX = parseInt(snakeCoords[1]);
    let CoordY = parseInt(snakeCoords[2]);
    console.log('Координаты по X: ', CoordX);
    console.log('По Y: ', CoordY);

    //Появление с противоположной стороны карты по Х
    if (moveDirection == 'right' && CoordX == 30) {
        CoordX = -1;
    }
    else if (moveDirection == 'left' && CoordX == 0) {
        CoordX = 31;
    }

    //Появление с противоположной стороны карты по У
    if (moveDirection == 'up' && CoordY == 0) {
        CoordY = 31;
    }
    else if (moveDirection == 'down' && CoordY == 30) {
        CoordY = -1;
    }

    //Смена направления движения
    if (moveDirection == 'down') {
        newUnit = document.getElementsByClassName('cell-' + CoordX + '-' + (CoordY + 1))[0];
    }
    else if (moveDirection == 'up') {
        newUnit = document.getElementsByClassName('cell-' + CoordX + '-' + (CoordY - 1))[0];
    }
    else if (moveDirection == 'left') {
        newUnit = document.getElementsByClassName('cell-' + (CoordX - 1) + '-' + CoordY)[0];
    }
    else if (moveDirection == 'right') {
        newUnit = document.getElementsByClassName('cell-' + (CoordX + 1) + '-' + CoordY)[0];
    }


    newUnit.setAttribute('class', newUnit.getAttribute('class') + ' snake-unit');
    snake.push(newUnit);


    let remove = snake.splice(0, 1)[0];    //Зачищаем хвост
    let tempClasses = remove.getAttribute("class").split(" ");
    remove.setAttribute("class", tempClasses[0] + " " + tempClasses[1]);
    scoreWrite();
}

//Запись очков
function scoreWrite() {
    let scoreDisp = document.getElementById('score');
    scoreDisp.innerHTML = score;
}

window.onload = gameLoad;