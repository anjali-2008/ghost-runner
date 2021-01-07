var tower,towerImage
var ghost,ghostImage
var door,doorImage,doorGroup
var climber,climberImage,climberGroup
var InvisibleBlock,InvisibleBlockGroup
var sound

var gameState="play"

function preload(){
  towerImage=loadImage("tower.png");
  ghostImage=loadImage("ghost-standing.png");
  doorImage=loadImage("door.png");
  climberImage=loadImage("climber.png");
  sound=loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  sound.loop();
  tower=createSprite(300,300);
  tower.addImage(towerImage);
  tower.velocityY=+2;
  
  ghost=createSprite(200,200);
  ghost.addImage(ghostImage);
  ghost.scale=0.3
  
  doorGroup=createGroup();
  climberGroup=createGroup();
  InvisibleBlockGroup=createGroup();
  
  
  
}
function draw(){
 background("white");
  
  if(gameState==="play"){
     
     
  if(tower.y>400){
    tower.y=300
  }
  
  if(keyDown("left_arrow")){
    ghost.x=ghost.x-5
  }
  
  if(keyDown("right_arrow")){
    ghost.x=ghost.x+5
  }
  
  if (keyDown("space")){
    ghost.velocityY=-5
  }
  
  if (climberGroup.isTouching(ghost)){
    ghost.velocityY=0;
}
  
  if (InvisibleBlockGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState="end";
    
  }
  
  ghost.velocityY= ghost.velocityY+1;
  spawndoors()
  drawSprites();  
  }
  if(gameState==="end"){
    background("black")
    strokeWeight(5);
    stroke("red");
    fill("yellow");
    textSize(40);
    text("gameOver",200,250);
  }
}

function spawndoors(){
  if(frameCount%200===0){
    door=createSprite(200,-50);
    door.addImage(doorImage);
    door.x=Math.round(random(120,400));
    door.velocityY=2;
    door.lifetime=800;
    doorGroup.add(door);
    ghost.depth=door.depth;
    ghost.depth=ghost.depth+1;
    
    climber=createSprite(200,10);
    climber.addImage(climberImage);
    climber.x=door.x;
    climber.velocityY=2;
    climber.lifetime=800;
    climberGroup.add(climber);
    
    InvisibleBlock=createSprite(200,15,climber.width,2);
    InvisibleBlock.x=door.x;
    InvisibleBlock.velocityY=2;
    InvisibleBlock.debug=true;
    InvisibleBlockGroup.add(InvisibleBlock);
}
}
  

