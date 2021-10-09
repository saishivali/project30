const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var ground;
var leftWall;
var rightWall;
var jointLink;
var bridge
var jointPoint
var stones = [];
var zombie1;
var zombie2;
var zombie3;
var zombie4;
var background;
var breakButton;
function preload(){
 zombie1 = loadImage("./assets/zombie1.png")
 zombie2 = loadImage("./assets/zombie2.png")

 zombie3 = loadImage("./assets/zombie3.png")
 zombie4 = loadImage("./assets/zombie4.png")

 backgroundImage = loadImage("./assets/background.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);
  
  bridge = new Bridge(30, { x: 50, y: height / 2 - 140 });
  jointPoint = new Base(width - 250, height / 2 - 100, 40, 20);

  Matter.Composite.add(bridge.body, jointPoint);
  jointLink = new Link(bridge, jointPoint);

  zombie = createSprite(width/2,height-110);
  zombie.addAnimation("lefttoright",zombie1,zombie2,zombie1);
  zombie.addAnimation("righttoleft",zombie3,zombie4,zombie3);
  zombie.scale=0.1;
  zombie.velocityX=10;

  breakButton = createButton("");
  breakButton.position(width-200,height/2-50)
  breakButton.class("breakbutton");
  breakButton.mousePressed(handleButtonPress);

  for (var i = 0; i <= 8; i++) {
    var x = random(width / 2 - 200, width / 2 + 300);
    var y = random(-100, 100);
    var stone = new Stone(x, y, 80, 80);
    stones.push(stone);
  }
}

function draw() {
  background(backgroundImage);
  Engine.update(engine);
 
    
  

 bridge.show()
 for(var stone of stones){
   stone.show();
 }
 
drawSprites()
}

function handleButtonPress(){
  jointLink.detach();
  setTimeout(()=>{
    bridge.break();
  },500)
}
