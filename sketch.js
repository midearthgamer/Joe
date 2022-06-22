var hypnoticBall, database;
var position;

var c1,c2,c3

function setup(){
  database = firebase.database();
  console.log(database);
  createCanvas(600,600);

  hypnoticBall = createSprite(250,250,10,10);
  hypnoticBall.shapeColor = "blue";

  background(128,128,128);

  var hypnoticBallPosition = database.ref('ball/position');
  hypnoticBallPosition.on("value", readPosition, showError);
}

function draw(){
    
    background(c1,c2,c3)
  
    if(keyDown(LEFT_ARROW)){
      writePosition(-5,0);
    }
    if(keyDown(RIGHT_ARROW)){
      writePosition(5,0);
    }
    if(keyDown(UP_ARROW)){
      writePosition(0,-5);
    }
    if(keyDown(DOWN_ARROW)){
      writePosition(0,+5);
    }
    drawSprites();

    if(hypnoticBall.y >= 600 || hypnoticBall.y <= 0 || hypnoticBall.x >= 600 || hypnoticBall.x <= 0) {
      c1 = random(63,191)
      c2 = random(63,191)
      c3 = random(63,191)
      database.ref('ball/position').set({
        'x': 300,
        'y': 300
      })
    }
}

function writePosition(x,y){
  database.ref('ball/position').set({
    'x': position.x + x ,
    'y': position.y + y
  })
}

function readPosition(data){
  position = data.val();
  console.log(position.y);
  console.log(position.x);
  hypnoticBall.x = position.x;
  hypnoticBall.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}
