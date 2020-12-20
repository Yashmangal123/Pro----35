//Create variables here
var dog,happyDog;
var database;
var foodS,foodStock;

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  HappydogImg = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500,500);

  database = firebase.database();
  console.log(firebase);
  
  dog = createSprite(250,350);
  dog.addImage(dogImg);
  dog.scale = 0.3;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
}

function draw() {  
  background(46,139,87);

  if(keyWentDown("UP_ARROW")){
    writeStock(foodS);
    dog.addImage(HappydogImg);
  }else{
    dog.addImage(dogImg);
  }

  drawSprites();
  //add styles here
 
  if(foodS != 0){
    fill("white")
  text("Note: After You press the Up arrow the dog will again come to rest after drinking milk",30,70);
  textSize(20);
    text("Note: Press Up Arrow Key to Feed Drago milk",50,50);
    textSize(30);
    text("MILK REMAINING: " + foodS,100,200);
  }

    if(foodS == 0){
      fill("White");
      textSize(20);
      text("Press Space Key to Refill milk",100,50);
      textSize(80);
      text("Game Over",60,200);
    }

    if(keyWentDown("Space") && foodS == 0){
      foodS = foodS+20
    }
}

function readStock(data){
   foodS = data.val();
}

function writeStock(x){

  if(x<=0){
    x = 0;
  }else{
    x = x-1;
  }

  //if(x == 0){
    //x = x+20;
    
  //}

  database.ref('/').update({
    'Food' : x
  })
}



