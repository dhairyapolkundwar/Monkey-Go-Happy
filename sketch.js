
var monkey , monkey_running
var banana, bananaImage,BananaGroup;
var obstacle, obstacleImage, obstacleGroup
var score = 0;
var Ground, GroundImage;
var GameState = GameOver;
var Play = 1;
var GameOver = 0;

function preload(){
  
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
   GroundImage = loadImage("Ground.png")
}



function setup() {
  createCanvas(400, 400);
  Ground = createSprite(200, 350, 400, 20);
  Ground.addImage(GroundImage);
  
  monkey = createSprite(40, 265, 20, 20)
  monkey.addAnimation("running",monkey_running)
  monkey.scale = 0.12
  
  BananaGroup = new Group();
  obstacleGroup = new Group();
  
 
}
  GameState = Play

function draw() {
  background("aqua")
  textSize(24)
  text("Score: "+score, 150, 30)
  
  if(GameState===Play){
    
    if(keyDown("space")){
      monkey.y = monkey.y - 9;
    }
    
    monkey.velocityY = monkey.velocityY + 0.2;
    CollideAct();
    Score();
  }
  
  if(GameState === GameOver){
    BananaGroup.setLifetimeEach(-1)
    obstacleGroup.setLifetimeEach(-1)
    BananaGroup.destroyEach();
    obstacleGroup.destroyEach();
    
    textSize(32)
    text("Game Over", 120, 150)
    textSize(16)
    text("Score: "+score, 165, 170)
    text("Press R To Restart", 130, 185)
    
  }
  food();
  obstacles();
  monkey.collide(Ground);
  
  if(keyDown("R")&&GameState===GameOver){
    GameState = Play;
    score = 0;
    frameCount = 0;
  }
  
  
  drawSprites();
}

function food(){
  if(frameCount%60===0&&GameState===Play){
    banana = createSprite(400, Math.round(random(120, 160), 20, 20))
    banana.addImage(bananaImage);
    banana.velocityX = -(5 + score/8);
    banana.scale = 0.12
    
    BananaGroup.add(banana);
  }
  
}

function obstacles(){
  if(frameCount%180===0&&GameState===Play){
    obstacle = createSprite(400, 280, 40, 40);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -(7 + score/10);
    obstacle.scale = 0.18
    
    obstacleGroup.add(obstacle)
  }
  
  
  
}

function Score(){
  if(monkey.isTouching(BananaGroup)){
     score = score + Math.round(random(1, 4))
     BananaGroup.destroyEach();
  }
}

function CollideAct(){
  if(monkey.isTouching(obstacleGroup) && GameState===Play){
    GameState = GameOver;
    
  }
}