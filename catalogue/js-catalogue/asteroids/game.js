var canvas = document.getElementById('game');
var context = canvas.getContext('2d');


var bgImg = new Image();
bgImg.src = 'img/fon.png';


// bgImg.onload = function() {
//     game();
// }


var asterPos=[];
var timer = 0;

var player = {x:300, y:300, animx:0, animy:0};
playerimg = new Image();
playerimg.src = 'img/ship01.png';

var shoot = []
shootimg = new Image();
shootimg.src = 'img/fire.png';

var expl=[];
explimg = new Image();
explimg.src = 'img/expl222.png';

var asteroids = new Image();
asteroids.src = 'img/astero.png';

canvas.addEventListener("mousemove", function(event) {
    player.x=event.offsetX-25;
    player.y=event.offsetY-13;
});


function game() {
    update();
    render();
    requestAnimFrame(game);
}


function update() {
    timer++;
    if (timer % 15 == 0) {
        asterPos.push({x:Math.random()*600, y:-50, dx:Math.random()*2-1, dy:Math.random()*2+2, del:0});
    };
    
    if (timer % 20 == 0) {
        shoot.push({x:player.x+10, y:player.y, dx:0, dy:-5.2});
        shoot.push({x:player.x+10, y:player.y, dx:0.5, dy:-5});
        shoot.push({x:player.x+10, y:player.y, dx:-0.5, dy:-5});
    }
    
    
    for (i in expl) {
        expl[i].animx=expl[i].animx + 0.5;
        if (expl[i].animx > 7) {expl[i].animy++; expl[i].animx = 0};
        if (expl[i].animy > 7) expl.splice(i, 1);
    }
    
    
    
    //физика
    for (i in asterPos) {
        
    asterPos[i].x = asterPos[i].x + asterPos[i].dx;
    asterPos[i].y = asterPos[i].y + asterPos[i].dy;
    
    if (asterPos[i].x >= 550 || asterPos[i].x < 0) asterPos[i].dx = -asterPos[i].dx;
    if (asterPos[i].y >= 600) asterPos.splice(i, 1);
        
        for (j in shoot) {
        
        if (Math.abs(asterPos[i].x + 25 - shoot[j].x - 15) < 50 && Math.abs(asterPos[i].y - shoot[j].y) < 25) {
            
            expl.push({x:asterPos[i].x - 25, y:asterPos[i].y - 25, animx:0, animy:0});
        
            asterPos[i].del = 1;
            shoot.splice(j, 1); break;
            }
            }
    if (asterPos[i].del==1) asterPos.splice(i, 1);
    }
    
    for (i in shoot) {
        shoot[i].x = shoot[i].x + shoot[i].dx;
        shoot[i].y = shoot[i].y + shoot[i].dy;
        
        if (shoot[i].y < -30) shoot.splice(i, 1);
    }
}


function render() {
    context.drawImage(bgImg, 0, 0, 600, 600);
    context.drawImage(playerimg, player.x, player.y);
    for (i in shoot) context.drawImage(shootimg, shoot[i].x, shoot[i].y, 30, 30);
    for (i in asterPos) context.drawImage(asteroids, asterPos[i].x, asterPos[i].y, 50, 50);
    
    for (i in expl) context.drawImage(explimg, 128*Math.floor(expl[i].animx), 128*Math.floor(expl[i].animy), 128, 128, expl[i].x, expl[i].y, 100, 100);
}

var requestAnimFrame = (function(){
    return window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback){
            window.setTimeout(callback, 1000 / 20);
        };
})();