var hypnoticBall, database;
var position;


function setup(){
  database = firebase.database();
  console.log(database);
  createCanvas(500,500);

  hypnoticBall = createSprite(250,250,10,10);
  hypnoticBall.shapeColor = "red";



  var hypnoticBallPosition = database.ref('ball/position');
  hypnoticBallPosition.on("value", readPosition, showError);
}

function draw(){

  if(hypnoticBallPosition.x > 300 || hypnoticBallPosition.x < -300 || hypnoticBallPosition.y < -300 || hypnoticBallPosition.y > 300) {
    hypnoticBallPosition.x = 200
    hypnoticBallPosition.y = 200
  }

  background("white");
  
    if(keyDown(LEFT_ARROW)){
      writePosition(-3,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(3,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-3);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+3);
    }
    drawSprites();
  
}

function writePosition(x,y){
  database.ref('ball/position').set({
    'x': position.x + x ,
    'y': position.y + y
  })
}

function readPosition(data){
  position = data.val();
  console.log(position.x);
  hypnoticBall.x = position.x;
  hypnoticBall.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}
