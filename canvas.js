let canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 500;

let keys = [];

let player = {
    x: 200,
    y: 200,
    width: 32,
    height: 52,
    frameX: 0,
    frameY: 0,
    speed: 9,
    moving: false
};

let playerSprite = new Image(),
    background = new Image();
playerSprite.src = 'tuxedoMask.png';
background.src = 'castlevaniaBackground.jpg';

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH){
    context.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

window.addEventListener('keydown', function(event){
    keys[event.keyCode] = true;
});

window.addEventListener('keyup', function(event){
    delete keys[event.keyCode];
    player.moving = false;
});

function movePlayer(){
    if(keys[38] && player.y > 10){
        player.y -= player.speed;
        player.frameY = 3;
        player.moving = true;
    }
    if(keys[40] && player.y < 443){
        player.y += player.speed;
        player.frameY = 0;
        player.moving = true;
    }
    if(keys[39] && player.x < 765){
        player.x += player.speed;
        player.frameY = 2;
        player.moving = true;
    }
    if(keys[37] && player.x > 2){
        player.x -= player.speed;
        player.frameY = 1;
        player.moving = true;
    }
}

function handlePlayerFrame(){
    if (player.frameX < 3 && player.moving) player.frameX++;
    else player.frameX = 0;
}

let fpsInterval, now, then, elapsed;

function startAnimating(fps){
    fpsInterval = 1000/fps;
    then = Date.now();
    animate();
}

function animate(){
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;
    if(elapsed > fpsInterval){
        then = now - (elapsed % fpsInterval);
        //Cleans canvas before efery render
        context.clearRect(0, 0, canvas.width, canvas.height);
        //Draws a background image in the canvas
        context.drawImage(background, 0, 0, canvas.width, canvas.height);
        //Draws our player sprite in the canvas
        drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.x, player.y, player.width, player.height);
        movePlayer();
        handlePlayerFrame();
    }
}

startAnimating(20);