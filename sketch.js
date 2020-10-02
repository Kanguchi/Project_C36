//Create variables here
var dog, happyDog, dogImg, hdogImg;
var bg;
var foodS, foodStock;
var database;
 
function preload(){
  dogImg = loadImage("images/dogImg.png");
  hdogImg = loadImage("images/dogImg1.png");
  bg = loadImage("livingRoom.png");
}

function setup() {
  database = firebase.database();
  createCanvas(900, 900);
  
  dog = createSprite(450, 600, 20, 80);
  dog.addImage(dogImg);
  dog.scale = 0.6;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

}


function draw() {  
  background(bg);
  
  if (keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(hdogImg);
  }
  drawSprites();

  textSize(30);
  strokeWeight(7);
  stroke("black");
  fill("snow");
  text("Food Remaining : " + foodS, 350, 250);
  stroke("grey");
  text("Press the 'up' arrow key to feed the Dog", 200, 50);

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if (x <= 0){
    x = 0;
  }else {
    x = x-1;
  }
  database.ref('/').update({
    Food: x
  })
  }




