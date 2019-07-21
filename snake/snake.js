const cvs = document.getElementById('snake');
const ctx = cvs.getContext("2d");



const box = 32;

var game;

// import food img for snake
var play = new Image();
play.src = "img/play.png";

var pause = new Image();
play.src = "img/pause.png";

var khana = new Image();
khana.src = "img/food.png";

// import sound
var dead = new Audio();
var up = new Audio();
var down = new Audio();
var left = new Audio();
var right = new Audio();
var eat = new Audio();

dead.src   =  "sound/dead.mp3";
up.src     =  "sound/up.mp3";
down.src   =  "sound/down.mp3";
left.src   =  "sound/left.mp3";
right.src  =  "sound/right.mp3";
eat.src    =  "sound/eat.mp3";

// create snake in form of array

var snake = [];

snake[0] = {

	x  :  10  * box,
	y  :  11 * box
}


// create random food

var food = {

	x : Math.floor(Math.random()*18+3)  * box,
	y : Math.floor(Math.random()* 18+3) * box
}

// create score
var score = 0;

var dir ;

document.addEventListener("keydown" , direction);

function direction(event){
      var key = event.keyCode;
      if(key == 37 && dir != "RIGHT"){
      	left.play();
      	dir = "LEFT";

      } else if(key == 38 && dir != "DOWN"){
      	up.play();
      	dir = "UP";

      }else if(key == 39 && dir != "LEFT"){
      	right.play();
      	dir = "RIGHT";
      	
      }else if(key == 40 && dir != "UP"){
      	down.play();
      	dir = "DOWN";
      	
      }

}


function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
    
}

// FUNCTION TO DRAW SNAKE ON CANVAS


function drawSnake(){


// fill the convase with linear gradient color

var grd = ctx.createLinearGradient(0,0,200,0);
grd.addColorStop(0,"black");
grd.addColorStop(1,"black");
// Fill with gradient
ctx.fillStyle = grd;
ctx.fillRect(0,0,672,672);

// draw a danger boundary

ctx.strokeStyle = "red";
ctx.fillStyle = "red"
ctx.strokeRect(0 , 2.5*box , 21*box , 0.5*box);
ctx.fillRect(0 , 2.5*box , 21*box , 0.5*box);

// this loop draw first block of snake

	  for( var i = 0; i<snake.length ; i++){
	  	  ctx.fillStyle = ( i == 0 )? "blue" : "pink";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
	  }

// draw food image for snake on canvas

    ctx.drawImage(khana, food.x, food.y);
    
    // old head position of snake

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
         
    // set in  which direction, snake will move

    if( dir == "LEFT") snakeX -= box;
    if( dir == "UP") snakeY -= box;
    if( dir == "RIGHT") snakeX += box;
    if( dir == "DOWN") snakeY += box;
    
    // if the snake eats the food run the following logic
    
    if(snakeX == food.x && snakeY == food.y){
        score++;                              //increase score
        
        eat.play();                           // play eating sound 
        
        food = {                               // again generate random food
            x : Math.floor(Math.random()*20+1) * box,
            y : Math.floor(Math.random()*18+3) * box
       
     
        }
     document.getElementById("myscore").innerHTML = score;


             // if snake eat , we don't remove the tail
     
     console.log("your score is" +" " + score);
    }else{
        // else remove the tail ie pop from snake array
        snake.pop();
    }
    
    // add new Head every thime when snake moves forward
    
    let newHead = {
        x : snakeX,
        y : snakeY
    }
    
    // game over  when snake collides with any boundary ie left or right or up or down
    
    if(snakeX < 0 || snakeX > 20 * box || snakeY < 3*box || snakeY > 20*box || collision(newHead,snake)){
        clearInterval(game);
        dead.play();
    }
    
    snake.unshift(newHead);
     
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText("score",0,32);
    ctx.fillText(score,102,38);


   //  var altScore = function(score_val){
   // document.getElementById("score").innerHTML = String(score_val);
// $(document).keydown(function(event){
//    var key = event.keyCode;
//    if(key == 32)
//     pause();
//   else if (key == 80)
//    play();
//  else if (key == 82){
//    init();
//   play();
//    }

// })

document.addEventListener("keydown", pause);

 function pause(event){
  var key = event.keyCode;
  if(key == 32){
  clearInterval(game);
  allowPressKeys = false;
 }
 }
document.addEventListener("keydown" , play);
// function resume(event){
//   var key = event.keyCode;
//   if(key == 13)
//     play
// }

function play(event){
       var key = event.keyCode;
       if(key == 13 ){
         clearInterval(game);
         game = setInterval(drawSnake , 150 )
         allowPressKeys = true;
        
       }

}

// document.addEventListener("keydown", resume);
// function resume(event){
//    var key = event.keyCode;
//    if(key = 82){
    
//   // play();
//   // create snake in form of array

// var snake = [];

// snake[0] = {

//   x  :  10  * box,
//   y  :  11 * box
// }


// // create random food

// var food = {

//   x : Math.floor(Math.random()*18+3)  * box,
//   y : Math.floor(Math.random()* 18+3) * box
// }

// // create score
// var score = 0;

//    }

// }
 




}
// function update(score){

// 	ctx.fillText(score,102,38)
// }
// var speed = document.getElementById("speed").value;
game = setInterval(drawSnake,150);









// function gameControl(event){
//   var key = event.keyCode;

// if (key == 32){
// event.preventDefault();


// }
// }

// function wallControl(){



// }
// var snake_speed;
// var setSnakeSpeed = function(speed_value){
// snake_speed = speed_value;
// }

// window.onload = function(){
// var speed_setting = document.getElementsByName("speed");
// setSnakeSpeed(150);
// }
// // speed
// for(var i = 0; i < speed_setting.length; i++){
// speed_setting[i].addEventListener("click", function(){
// for(var i = 0; i < speed_setting.length; i++){
// if(speed_setting[i].checked){
// setSnakeSpeed(speed_setting[i].value);
// }
// }
// });
// }
// function timeCntrol(){








//  function refresh(){
//   dir = "RIGHT";
//   play();
//   // create snake in form of array

// var snake = [];

// snake[0] = {

//   x  :  10  * box,
//   y  :  11 * box
// }


// // create random food

// var food = {

//   x : Math.floor(Math.random()*18+3)  * box,
//   y : Math.floor(Math.random()* 18+3) * box
// }

// // create score
// var score = 0;

//  }
// refresh();











