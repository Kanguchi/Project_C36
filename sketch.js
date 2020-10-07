//Create variables here
var dog, dogImg, hdogImg;
var bg;
var foodS, foodStock;
var database;
var feed, addFood;
var fedTime, lastFed;
var foodObj;
 
function preload(){
  dogImg = loadImage("dogImg.png");
  hdogImg = loadImage("dogImg1.png");
  bg = loadImage("livingRoom.png");
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

}


function draw() {  
  background(bg);
  
  foodObj.display();

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed = data.val();
  });

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




