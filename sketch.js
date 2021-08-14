var dog, happyDog;
var database;
var foodS, foodStack;

function preload() {
  //load images here

  happyDog = loadImage('images/dogImg1.png');
  Dog = loadImage('images/dogImg.png');
}

function setup() {
  createCanvas(500, 500);

  database = firebase.database();

  dog = createSprite(250, 250);
  dog.addImage(Dog);
  dog.scale = 0.2;

  foodStack = database.ref('Food');
  foodStack.on('value', readStack);
}


function draw() {
  background(46, 139, 87);

  if (keyWentDown(UP_ARROW)) {
    writeStack(foodS);
    dog.addImage(happyDog);
  }

  drawSprites();

  fill('white');
  textSize(20);
  text('Press UP ARROW key to feed', 100, 50);
  text('Food: ' + foodS, 100, 100);


}

function readStack(data) {
  foodS = data.val();
}


function writeStack(x) {
  if (x <= 0) {
    x = 0;
  } else {
    x = x - 1;
  }


  database.ref('/').update({
    Food: x,
  });

  
}