var player, marioImage;
var firePlant, fireImage, fireGroup;
var piranhaPlantLow, piranhaPlantHigh, piranhaPlantImage, piranhaGroupLow, piranhaGroupHigh;
var coin, coinImage, coinGroup;
var backgroundSprite, backgroundImage;
var heart1, heart2, heart3, heartImage, hearts;
var score;
var play, end, gameState;

var count;
var tubePosition, tubeDistance;

var marioFont;

var gameOverSprite, gameOverImage;
var resetSprite, resetImage;

function preload() {
  marioImage = loadImage("images/mario.png");

  fireImage = loadImage("images/fire-plant.png");

  piranhaPlantImage = loadImage("images/piranha-plant.png");

  coinImage = loadImage("images/mario-coin.png");

  heartImage = loadImage("images/heart.png");

  backgroundImage = loadImage("images/mario-background-long.png");

  gameOverImage = loadImage("images/game-over.png");
  resetImage = loadImage("images/reset-button.png");

  marioFont = loadFont("fonts/SuperMario256.ttf");
}

function setup() {
  createCanvas(800, 500);

  backgroundSprite = createSprite(width/2, height/2, width, height);
  backgroundSprite.scale = 1.6;
  backgroundSprite.addImage(backgroundImage);

  player = createSprite(105, 300, 20, 20);
  player.scale = 0.3;
  player.addImage(marioImage);

  heart1 = createSprite(50, 50);
  heart1.scale = 0.05;
  heart1.addImage(heartImage);

  heart2 = createSprite(100, 50);
  heart2.scale = 0.05;
  heart2.addImage(heartImage);
  
  heart3 = createSprite(150, 50);
  heart3.scale = 0.05;
  heart3.addImage(heartImage);

  //For testing usage:
  // piranhaPlantLow = createSprite(width/2, height/2, width, height);
  // piranhaPlantLow.addImage(piranhaPlantImage);

  hearts = 3;

  coinGroup = createGroup();

  fireGroup = createGroup();

  piranhaGroupLow = createGroup();

  piranhaGroupHigh = createGroup();

  score = 0;

  count = 0;

  tubePosition = 1;
  tubeDistance = 404;

  play = 0;
  end = 1;

  gameState = 0;
}

function draw() {
  background(255);

  playerLife();

  //console.log(camera.position.x);
  //console.log(tubePosition);

  if(gameState == 0) {    
    //if-else conditions to move mario up and down
    if(keyDown(DOWN_ARROW) && player.y <= height-110) {
      player.y+=10;
    }
    else if(keyDown(UP_ARROW) && player.y >= 140) {
      player.y-=10;
    }

    //PROBLEM!
    // if(player.y >= 140 && player.y <= height-110){
    //   console.log(player.y);
    //   if(keyDown(DOWN_ARROW)) {
    //     player.y+=10;
    //   }
    //   else if(keyDown(UP_ARROW)) {
    //     player.y-=10;
    //   }
    // }
    
    if(camera.position.x < width/2) {
      camera.position.x = backgroundSPrite.width/2;
    }

    //Spawn coins and plants
    spawnCoins();
    //spawnPowers();
    spawnPiranhas();
    //spawnPiranhasHigh();

    //Check collision between mario and enemy and deduct heart
    
    //Increase score with detection of coin

    drawSprites();
  }
  else if(gameState == 1) {
    player.visible = false;

    camera.position.x = camera.position.x;
    player.x = player.x;

    count = 0;

    gameOverSprite = createSprite(camera.position.x, camera.position.y, 400, 300);
    gameOverSprite.addImage(gameOverImage);

    resetSprite = createSprite(camera.position.x, camera.position.y+50, 10, 10);
    reset.scale = 0.1;
    resetSprite.addImage(resetImage);

    gameOverSprite.visible = true;
    resetSprite.visible = true;

    if(mousePressedOver(resetSprite)) {
      reset();
    }
  }

  //display score - text
  textSize(28);
  fill(0);
  textFont(marioFont);
  text("Score" + " : " + score, 600+count, 65);
}

function playerLife() {
  if(player.isTouching(coinGroup)) {
    coinGroup.destroyEach();
    score+=1;
  }
  if(player.isTouching(piranhaGroupLow)) {
    piranhaGroupLow.destroyEach();
    hearts-=1;
  }
  if(player.isTouching(piranhaGroupHigh)) {
    piranhaGroupHigh.destroyEach();
    hearts-=1;
  }

  if(hearts == 3) {
    heart1.visible = true;
    heart2.visible = true;
    heart3.visible = true;
  } 

  if(hearts == 2) {
    heart1.visible = true;
    heart2.visible = true;
    heart3.visible = false;
  }

  if(hearts == 1) {
    heart1.visible = true;
    heart2.visible = false;
    heart3.visible = false;
  }

  if(hearts == 0) {
    heart1.visible = false;
    heart2.visible = false;
    heart3.visible = false;

    gameState = 1;
  }

  switch(score) {
    case 0: camera.position.x+=4, 
    player.x+=4, 
    heart1.x+=4, 
    heart2.x+=4,
    heart3.x+=4,
    count+=4;
      break;
    case 5: camera.position.x+=5,
    player.x+=5,
    heart1.x+=5,
    heart2.x+=5,
    heart3.x+=5,
    count+=5;
      break;
    case 10: camera.position.x+=6,
    player.x+=6,
    heart1.x+=6,
    heart2.x+=6,
    heart3.x+=6,
    count+=6;
      break;
    case 15: camera.position.x+=7,
    player.x+=7,
    heart1.x+=7,
    heart2.x+=7,
    heart3.x+=7,
    count+=7;
      break
    case 20: camera.position.x+=8,
    player.x+=8,
    heart1.x+=8,
    heart2.x+=8,
    heart3.x+=8,
    count+=8;
      break;
    case 25: camera.position.x+=9,
    player.x+=9,
    heart1.x+=9,
    heart2.x+=9,
    heart3.x+=9,
    count+=9;
      break;
     default: break;
  }
}

function spawnCoins() {
  if(frameCount % 190 == 0) {
    //var randomCoinY = random(100, 520);
    coin = createSprite(camera.position.x + 400, random(140, 390));
    coin.scale = 0.11;
    coin.addImage(coinImage);

    coin.lifetime = 400;

    coinGroup.add(coin);
  }
}

// function spawnPiranhasLow() {
//   if(frameCount < 2) {
//     if(frameCount % 1 == 0) {
//       console.log("Piranha Plant");
//       piranhaPlantLow = createSprite(camera.position.x + 90, camera.position.y+100);
//       piranhaPlantLow.addImage(piranhaPlantImage);
//       piranhaPlantLow.scale = 0.1;

//       //come back and adjust
//       piranhaPlantLow.lifetime = 225;

//       piranhaGroupLow.add(piranhaPlantLow);
//     }
//   }
//   else if(frameCount % 150 == 0) {
//       console.log("Piranha Plant Stage 2");
//       piranhaPlantLow = createSprite(camera.position.x + 430, camera.position.y+100);
//       piranhaPlantLow.addImage(piranhaPlantImage);
//       piranhaPlantLow.scale = 0.1;

//       //come back and adjust
//       piranhaPlantLow.lifetime = 225;

//       piranhaGroupLow.add(piranhaPlantLow);
//   }
// }

// function spawnPiranhasLow() {
//   if(tubePosition == 1) {
//     if(frameCount % 1 == 0) {
//       tubePosition+=1;
//       console.log("Piranha Plant");
//       piranhaPlantLow = createSprite(camera.position.x + 90, camera.position.y+100);
//       piranhaPlantLow.addImage(piranhaPlantImage);
//       piranhaPlantLow.scale = 0.1;

//       //come back and adjust
//       piranhaPlantLow.lifetime = 225;

//       piranhaGroupLow.add(piranhaPlantLow);
//     }
//   }
//   else if(tubePosition == 2) {
//     if(frameCount % 100 == 0) {
//       tubePosition+=1;
//       console.log("Piranha Plant");
//       piranhaPlantLow = createSprite(camera.position.x + 10, camera.position.y+70);
//       piranhaPlantLow.addImage(piranhaPlantImage);
//       piranhaPlantLow.scale = 0.1;

//       //come back and adjust
//       piranhaPlantLow.lifetime = 225;

//       piranhaGroupLow.add(piranhaPlantLow);
//     }
//   }
//   else if(tubePosition == 3) {
//     if(frameCount % 200 == 0) {
//       tubePosition=2;
//       console.log("Piranha Plant");
//       piranhaPlantLow = createSprite(camera.position.x + 210, camera.position.y+100);
//       piranhaPlantLow.addImage(piranhaPlantImage);
//       piranhaPlantLow.scale = 0.1;

//       //come back and adjust
//       piranhaPlantLow.lifetime = 225;

//       piranhaGroupLow.add(piranhaPlantLow);
//     }
//   }
// }

function spawnPiranhas() {
  if(tubePosition == 1){
    if(camera.position.x == tubeDistance) {
      tubePosition+=1;
      tubeDistance=580;
      console.log("Piranha Plant");
      piranhaPlantLow = createSprite(camera.position.x + 90, camera.position.y+100);
      piranhaPlantLow.addImage(piranhaPlantImage);
      piranhaPlantLow.scale = 0.1;

      //come back and adjust
      piranhaPlantLow.lifetime = 225;

      piranhaGroupLow.add(piranhaPlantLow);
    }
  }
  if(tubePosition == 2) {
    if(camera.position.x == tubeDistance) {
      tubePosition=3;
      tubeDistance = 1000;
      
      piranhaPlantHigh = createSprite(camera.position.x + 225, camera.position.y+65);
      piranhaPlantHigh.addImage(piranhaPlantImage);
      piranhaPlantHigh.scale = 0.1;

      //come back and adjust
      piranhaPlantHigh.lifetime = 225;

      piranhaGroupHigh.add(piranhaPlantHigh);
    }
  }
  else if(tubePosition == 3) {
    if(camera.position.x == tubeDistance) {
      tubePosition=2;
      
      piranhaPlantLow = createSprite(camera.position.x + 450, camera.position.y+100);
      piranhaPlantLow.addImage(piranhaPlantImage);
      piranhaPlantLow.scale = 0.1;

      //come back and adjust
      piranhaPlantLow.lifetime = 225;

      piranhaGroupLow.add(piranhaPlantLow);
    }
  }
}
function spawnPiranhasHigh() {
  if(frameCount % 190 == 0) {
    piranhaPlantHigh = createSprite(camera.position.x + 470, camera.position+70);
    piranhaPlantHigh.scale = 0.15;
    piranhaPlantHigh.addImage(piranhaPlantImage);

    //come back and adjust
    piranhaPlantHigh.lifetime = 250;

    piranhaGroupHigh.add(piranhaPlantHigh);
  }
}

function spawnPowers() {
  if(frameCount%300 == 0) {
    var randomPlantY = random(100, 520);
    firePlant = createSprite(500, randomPlantY);
    firePlant.scale = 0.045;
    firePlant.addImage(fireImage);
    //TODO: add game camera for firePlant

    firePlant.lifetime = 120;

    fireGroup.add(firePlant)
  }
}

function reset() {
  //reset everything in game
  gameState = 0;

  gameOverSprite.visible = false;
  resetSprite.visible = false;  

  score = 0;
  count = 0;

  tubePosition = 0;
  tubeDistance = 404;
}


//Problems:
//decreasing size of piranha plant
//game camera stops moving when coin collected

//Extras:
//Fire shots
//Switch out Mario outfit