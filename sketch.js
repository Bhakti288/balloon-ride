const Engine = Matter.Engine;
const World = Matter.World;
const Bodies= Matter.Bodies;

var engine,world, body1,body2;
var database,height,balloon,background;

function preload(){
  balloon = loadImage(balloon.png);
  background = loadImage(background.png);
}



function setup() {
  createCanvas(500,500);
  engine=Engine.create();
  world = (engine.world);
  var options={
    isStatic:true
  }
  body1= Bodies.circle(200,100,50,options);
  World.add(world,body1);

  var balloonPosition=database.ref('balloon/height');
  balloonPosition.on("value",readHeight,showerror);
  
  console.log(body1)
  console.log(body1.position.x);
  console.log(body1.position.y);
  
}

function draw() {
  background(background); 
  text("Use arrows to move th balloon") ;
  Engine.update(engine);
  ellipseMode(RADIUS);
  rectMode(CENTER);
  ellipse(body1.position.x,body1.position.y,50);
  rect(body2.position.x,body2.position.y,400,20);


  balloon = createSprite(250,250,60,200);
  balloon.addImage(balloon);
  if(keyDown(LEFT_ARROW)){
    balloon.x=balloon.x -10
    updateHeight(0,-10);
    balloon.addImage("hotAirBalloon",balloonimage2);
    balloon.scale=balloon.scale -0.01;
  }
 else if(keyDown(RIGHT_ARROW)){
    balloon.x=balloon.x +10
    updateHeight(0,-10);
    balloon.addImage("hotAirBalloon",balloonimage2);
    balloon.scale=balloon.scale -0.01;
  }
  else if(keyDown(UP_ARROW)){
    balloon.y=balloon.y -10
    updateHeight(0,-10);
    balloon.addImage("hotAirBalloon",balloonimage2);
    balloon.scale=balloon.scale -0.01;
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.y=balloon.y +10
    updateHeight(0,-10);
    balloon.addImage("hotAirBalloon",balloonimage2);
    balloon.scale=balloon.scale +0.01;
  }
  
}

function updateHeight(x,y){
  database.ref('balloon/height').set({
    'x':height.x+x,
    'y':height.y+y
  })
}

function readHeight(data){
height = data.val();
balloon.x = height.x;
balloon.y = height.y;
}

function showerror(){
  console.log("Error in writing to the database");
}
