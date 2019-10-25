/*
Create by Learn Web Developement
Youtube channel : https://www.youtube.com/channel/UC8n8ftV94ZU_DJLOLtrpORA
*/

const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// create the unit
const box = 32;

// load images

const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food3.jpg";

// load audio files

let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/verygood.m4a";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";

// create the snake

let snake = [];

snake[0] = {
    x : 3 * box,
    y : 5 * box
};

// create the food

let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}

// create the score var

let score = 100;

//control the snake

let d;

document.addEventListener("keydown",direction);

function direction(event){
    let key = event.keyCode;
    if( key == 65 && d != "RIGHT"){
        left.play();
        d = "LEFT";
    }else if(key == 87 && d != "DOWN"){
        d = "UP";
        up.play();
    }else if(key == 68 && d != "LEFT"){
        d = "RIGHT";
        right.play();
    }else if(key == 83 && d != "UP"){
        d = "DOWN";
        down.play();
    }


    else if(key == 67 && d != "DR"){
        d = "DR";
        down.play();
    }
    else if(key == 90 && d != "DL"){
        d = "DL";
        down.play();
    }
    else if(key == 69 && d != "UR"){
        d = "UR";
        down.play();
    }
    else if(key == 81 && d != "UL"){
        d = "UL";
        down.play();
    }
}

// check collision function檢查蛇的頭跟尾有無碰撞
function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

// draw everything to the canvas

function draw(){
    
    ctx.drawImage(ground,0,0);
    
    for( let i = 0; i < snake.length ; i++){
        ctx.fillStyle = ( i == 0 )? "green" : "white";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    
    ctx.drawImage(foodImg, food.x, food.y);
    
    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    // which direction
    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;

    if(d == "UL"){
        snakeX-= box;
        snakeY-= box;
    }
    if(d == "UR"){
        snakeX+= box;
        snakeY-= box;
    }
    if(d == "DL"){
        snakeX-= box;
        snakeY+= box;
    }
    if(d == "DR"){
        snakeX+= box;
        snakeY+= box;
    }
    


    
    // if the snake eats the food
    if(snakeX == food.x && snakeY == food.y){
        score = score - 5;
        eat.play();
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
        // we don't remove the tail
    }else{
        // remove the tail
        snake.pop();
    }
    
    // add new Head
    
    let newHead = {
        x : snakeX,
        y : snakeY
    }
    
    // game over 
    
    if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
        clearInterval(game);
        dead.play();
    } else if(score == 0){
        clearInterval(game);
        dead.play();
    } 
    
    snake.unshift(newHead);
    
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score,2*box,1.6*box);
}

// call draw function every 100 ms

let game = setInterval(draw,200);


















