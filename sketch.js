//Create variables here
var dog, happyDog, dogImg, hdogImg;
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
  
  dog = createSprite(600, 720, 20, 80);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  foodObj1 = new food();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  feed = createButton("Feed the Dog");
  feed.position(700, 95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);

}


function draw() {  
  background(bg);
  
  foodObj1.display();

  drawSprites();

  textSize(30);
  strokeWeight(7);
  stroke("black");
  fill("snow");
  text("Food Remaining : " + foodS, 350, 250);
  
  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed = data.val();
  });

  fill(255, 255, 254);
  textSize(15);
  if(lastFed>=12){
    text("Last Fed : "+ lastFed%12 + "PM", 370, 30);
  }else if(lastFed==0){
    text("Last Fed : 12 AM", 370, 30);
  }else{
    text("Last Fed : "+lastFed, 370, 30);
  }


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

function feedDog(){
  writeStock(foodS);
  dog.addImage(hdogImg);
  foodObj1.updateFoodStock(foodObj1.getFoodStock()-1);
  database.ref('/').update({
    Food: foodObj1.getFoodStock(),
    FeedTime: hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}




