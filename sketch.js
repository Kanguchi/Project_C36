//Create variables here
var dog, dogImg, hdogImg;
var bg;
var foodS, foodStock;
var database;
var feed, addFood;
var fedTime, lastFed;
var foodObj;
var gameState, readState;
var bedroom, garden, washroom;
 
function preload(){
  dogImg = loadImage("images/dogImg.png");
  hdogImg = loadImage("images/dogImg1.png");
  bg = loadImage("images/livingRoom.png");
  bedroom = loadImage("images/BedRoom.png");
  garden = loadImage("images/Garden.png");
  washroom = loadImage("images/WashRoom.png");

}

function setup() {
  database = firebase.database();
  createCanvas(900, 900);
  
  foodObj = new food();

  dog = createSprite(600, 720, 20, 80);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  feed = createButton("Feed the Dog");
  feed.position(750, 95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(850, 95);
  addFood.mousePressed(addFoods);

  readState = database.ref('gameState');
  readState.on("value", function(data){
    gameState = data.val();
  });

}


function draw() {  
  
  foodObj.display();

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed = data.val();
  });

  if (gameState !== "Hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  } else {
    feed.show();
    addFood.show();
    dog.addImage(dogImg);
  }
  currentTime = hour();
  if (currentTime === (lastFed + 1)){
    update("Playing");
    foodObj.garden();
  } else if(currentTime === (lastFed + 2)){
      update("sleeping");
      foodObj.bedroom();
  } else if (currentTime > (lastFed +2) && currentTime <= (lastFed + 4)){
      update("Bathing");
      foodObj.washroom();
  } else {
      update("Hungry");
      foodObj.display();
  }

  fill(255, 255, 254);
  textSize(25);
  stroke(10);
  strokeWeight(5);
  if(lastFed>=12){
    text("Last Fed : "+ lastFed%12 + "PM", 390, 30);
  }else if(lastFed==0){
    text("Last Fed : 12 AM", 390, 30);
  }else{
    text("Last Fed : "+lastFed, 390, 30);
  }

  drawSprites();


}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){

  dog.addImage(hdogImg);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function update(state){
  database.ref('/').update({
    gameState: state
  });
}



