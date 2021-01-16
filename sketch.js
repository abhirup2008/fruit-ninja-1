var PLAY = 1;
var END = 0;
var gamestate = 1;
var alien_image1,alien_image2,fruit_image1,fruit_image2,fruit_image3,fruit_image4,over,sword_image,over_sound,sword_sound,background,fruitGroup,enemyGroup,gameOver;
var score = 0;

function preload(){
  alien_image1 = loadImage("alien1.png");
  alien_image2 = loadImage("alien2.png");
  fruit_image1 = loadImage("fruit1.png");
  fruit_image2 = loadImage("fruit2.png");
  fruit_image3 = loadImage("fruit3.png");
  fruit_image4 = loadImage("fruit4.png");
  sword_image = loadImage("sword.png");
  over = loadImage("gameover.png");
  over_sound = loadSound("gameover.mp3");
  sword_sound = loadSound("knifeSwooshSound.mp3");

}
function setup(){
  createCanvas(600,500);
  //background = createSprite(300,250,600,500)
  sword = createSprite(250,300);
  sword.addImage(sword_image);
  sword.scale = 0.6;
  gameOver = createSprite(250,250);
  enemyGroup = createGroup();
  fruitGroup = createGroup();
}  

function draw (){
  background(250);
  //background.velocityY = -50;
  sword.y = World.mouseY;
  sword.x = World.mouseX;
  if (gamestate === PLAY){
  if (fruitGroup.isTouching(sword)){
    sword_sound.play();
    score = score+1
  }
  if (enemyGroup.isTouching(sword)){
    over_sound.play();
    gamestate = END;
  }
    gameOver.visible = false;
  }
  if (gamestate === END){
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
    fruitGroup.setVelocityXEach(0);
    enemyGroup.setVelocityXEach(0);
    gameOver.visible = true;
    gameOver.addImage(over);
  }
  
  createFruit();
  enemy();
  drawSprites();
  text ("score = "+score,400,10);
}
function createFruit(){
  if (frameCount % 60 === 0){
    fruit = createSprite(400,200);
    f = Math.round(random(1,4));
    switch (f) {
      case 1: fruit.addImage(fruit_image1);
              break;
      case 2: fruit.addImage(fruit_image2);
              break;
      case 3: fruit.addImage(fruit_image3);
              break;
      case 4: fruit.addImage(fruit_image4);
              break;
    }
    fruit.velocityY =       Math.round(random(30,50));
    position = Math.round(random(1,2));
    if(position == 1){
      fruit.x = 400;
      fruit.velocityX = -7+(score/4);
    }else {
      fruit.x = 0;
      fruit.velocityX = 7+(score/4);
    }

    fruit.scale = 0.2;
    fruitGroup.add(fruit);
  }
}

function enemy(){
  if (frameCount % 200 === 0){
    alien = createSprite(400,200);
    e = Math.round(random(1,2));
    switch (e) {
      case 1: alien.addImage(alien_image1);
              break;
      case 2: alien.addImage(alien_image2);
              break;
    }
    alien.velocityY =       Math.round(random(30,50));
    position =  Math.round(random(1,2));
    if (position == 1){
      alien.x = 400;
      alien.velocityX = -8+(score/10);
    }else{
      alien.x = 0;
      alien.velocityX = 8+(score/10);
    }
    alien.scale = 0.7;
    enemyGroup.add(alien);
  }
}