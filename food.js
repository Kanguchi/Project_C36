class food{
    constructor(){
        this.foodStock = 0;
        this.lastFed;
        this.image = loadImage("images/Milk.png");
    }
    
    updateFoodStock(foodStock){
        this.foodStock = foodStock;
    }
    getFoodStock(){
        return this.foodStock = this.foodStock-1;
    }
    deductFood(){
        if(this.foodStock > 0){
            this.foodStock = this.foodStock - 1;
        }
    }
    getFedTime(lastFed){
        this.lastFed = lastFed;
    }
    bedroom(){
        background(bedroom, 450, 450);
    }
    garden(){
        background(garden, 450, 450);
    }
    washroom(){
        background(washroom, 450, 450);
    }
    display(){
        background(bg);
  
        var x = 35, y = 60;

        imageMode(CENTER);
        image(this.image, 500, 750, 70, 70);

        if (this.foodStock != 0){
          for(var i = 0; i<this.foodStock; i++){
              if(i%4 == 0){
                  x=35;
                  y=y+50;
              }
              image(this.image, x, y, 50, 50);
              x=x+30;
          }
        }
    }
}