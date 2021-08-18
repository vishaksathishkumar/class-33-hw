const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;
var bg = "sprites/bg2.jpg"
var score=0;

var gameState = "onSling";

function preload() {
    time();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);
    bird2 = new Bird(150,50);
    bird3 = new Bird(100,50);
    bird4 = new Bird(50,50);
    birds=[bird4,bird3,bird2,bird];

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:50});
}

function draw(){
    if(backgroundImg){
  background(backgroundImg);
    }

    noStroke();
    textSize(35);
    fill("white");
    text("score : "+score,width-300,50);
    
    Engine.update(engine);
    //strokeWeight(4);
    if(birds.length===0){
        birds.push(bird4,bird3,bird2,bird);
        Matter.Body.setPosition(bird.body,{x:200,y:50});
        Matter.Body.setPosition(bird2.body,{x:150,y:50});
        Matter.Body.setPosition(bird3.body,{x:100,y:50});
        Matter.Body.setPosition(bird4.body,{x:50,y:50});
    }
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    bird2.display();
    bird3.display();
    bird4.display();
    platform.display();
    //log6.display();
    slingshot.display(); 
    pig1.score();
    pig3.score();
    


}

function mouseDragged(){
    if (gameState!=="launched"){
        Matter.Body.setPosition(birds[birds.length-1].body, {x: mouseX , y: mouseY});
    }
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
    birds.pop()
}

function keyPressed(){
    if(keyCode === 32&&gameState==="launched"){
        gameState="onSling";
        //Matter.Body.rotate(birds[birds.length-1].body,90);
        Matter.Body.setPosition(birds[birds.length-1].body,{x:200,y:50});
    slingshot.attach(birds[birds.length-1].body);
 }
}


    


async function time(){

    var date = await fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata")
    var period = await date.json()
   
    var hour = period.datetime;
    var hr = hour.slice(11,13);
    if(hr>=6&&hr<=17){
     bg="sprites/bg.png";
    }
    else{
     bg="sprites/bg2.jpg";
    }
    backgroundImg = loadImage(bg);


}