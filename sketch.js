var trex, trexRunning, trexCollided, ground, groundImage, invisGround, cactus, cactus1, cactus2, cactus3, cactus4, cactus5, cactus6, rand, cloud, cloudImage, cactusGroup, cloudGroup, score, gameState, PLAY, END, restart1, gameOver1, Restart, GameOver, highScore, checkPoint, die, jump;
  

function preload(){
  trexRunning = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trexCollided = loadImage("trex_collided.png");
  groundImage = loadImage("ground2.png");
  
  cactus1 = loadImage("obstacle1.png");
  cactus2 = loadImage("obstacle2.png");
  cactus3 = loadImage("obstacle3.png");
  cactus4 = loadImage("obstacle4.png");
  cactus5 = loadImage("obstacle5.png");
  cactus6 = loadImage("obstacle6.png");

  cloudImage = loadImage("cloud.png");
  
  restart1 = loadImage("restart.png");
  gameOver1 = loadImage("gameOver.png");
  
  checkPoint = loadSound("checkPoint.mp3");
  die = loadSound("die.mp3");
  jump = loadSound("jump.mp3");
}
function setup() {
  createCanvas(600, 200);
  trex = createSprite(50, 180, 20, 50);
  trex.addAnimation("Running", trexRunning);
  trex.addAnimation("Collision", trexCollided);
  
  trex.setCollider("circle", 0, 0, 35  );

  Restart = createSprite(300, 120, 20, 20);
  Restart.scale = 0.7;
  Restart.visible = false;
  GameOver = createSprite(300, 70, 20, 20);
  GameOver.scale = 0.7;
  GameOver.visible = false;
  
  Restart.addImage(restart1);
  GameOver.addImage(gameOver1);
  
  trex.scale = 0.5;
  ground = createSprite(300, 180, 600, 50);
  ground.addImage("ground", groundImage);
  ground.x = ground.width/2;
  
  invisGround = createSprite(300, 185, 600, 10);
  invisGround.visible = false;
  PLAY = 1;
  END = 0;
  gameState = PLAY;
  cactusGroup = new Group ();
  cloudGroup = new Group ();
  score = 0;
  highScore = 0;
}

function draw() {
  background(255);

  trex.debug = false;
  
  if (gameState === PLAY){
    
  ground.velocityX =-6 -(score/100)
    
   if(score > 0 && score % 100 === 0) {
    checkPoint.play();
  }
        
        
    if (keyDown("space") && trex.y >= 156.75) {
     trex.velocityY = -12; 
      jump.play();
      }
    
    trex.velocityY = trex.velocityY + 0.8;
    
    score = score + Math.round(getFrameRate() / 60);
    
    if (ground.x < 0) {
    ground.x = ground.width/2;
      
  }
    
    obstacles ();
    clouds ();
    
    if (trex.isTouching(cactusGroup)){
      gameState = END 
      die.play();
    }
  } else if (gameState === END) {
    
    ground.velocityX = 0;
    trex.velocityY = 0;
    trex.changeAnimation("Collision", trexCollided);
    cloudGroup.setVelocityXEach(0);
    cactusGroup.setVelocityXEach(0);
    
    cloudGroup.setLifetimeEach (-1);
    cactusGroup.setLifetimeEach(-1);
    
    Restart.visible = true;
    GameOver.visible = true;
    
    if (mousePressedOver(Restart)){
      reset();
      
      
    }
  }
  
    text("High Score = " + highScore, 500, 50);
  
  if (score>highScore && gameState === END){
    
    highScore = score;
    
  }

  
  
  text ("Score: " + score, 500, 30);
   
    
   trex.collide(invisGround);
   
  drawSprites();
}


function obstacles () {
  if (frameCount % 80 === 0) {
  cactus = createSprite(550, 160, 20, 20);
    cactus.scale = 0.5;
   rand = Math.round(random(1,6));
  cactus.velocityX = -6 - (score/100);
    switch (rand) {
      case 1: cactus.addImage(cactus1);
      break;
      
      case 2: cactus.addImage(cactus2);
        break;
        
        case 3: cactus.addImage(cactus3);
         break;
         
         case 4: cactus.addImage(cactus4);
          break;
           
          case 5: cactus.addImage(cactus5);
           break;
            
           case 6: cactus.addImage(cactus6);
            break;
            
    }
  
    cactus.lifetime = 160;
  cactusGroup.add(cactus);
}
  
}

function clouds () {
  
  if (frameCount % 60 === 0) {
    var randY = Math.round(random(30, 80));
      cloud = createSprite(550, randY, 10, 10);
       cloud.addImage(cloudImage);
        cloud.velocityX = -5 - (score/100);
         cloud.scale = 0.7;
          
          cloud.depth = trex.depth ;
          trex.depth ++;
         cloud.lifetime = 130;
    
    
        cloudGroup.add(cloud);
  }
  
}
  
  
function reset (){
  
  gameState = PLAY;
  cactusGroup.destroyEach();
  cloudGroup.destroyEach();
  
  GameOver.visible = false;
  Restart.visible = false;
  
  trex.changeAnimation("Running", trexRunning)
  
  score = 0;
}