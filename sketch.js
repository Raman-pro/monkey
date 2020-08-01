//Global Variables
var gameState = 1;
var survivalTime = 0;
var points = 0;
// play = 1,over=0
var monkey,ma,bi,oi,bg,ma4,background1,ji,jumpButton,bjump=false;
var ground;
var bananas = [];
var obstacles = [];
var monkey_anim=[];
var pointCheck=true;
var pce=false;
var is=false
var button;
for (var i=1; i<=10;i++){
    i===10?monkey_anim.push("Monkey_10.png"):monkey_anim.push("Monkey_0"+i+".png")
}
function preload() {
    ma=loadAnimation(...monkey_anim)
    bi=loadImage("banana.png")
    oi=loadImage("stone.png")
    bg=loadImage("jungle.jpg")
    ma4=loadImage("Monkey_04.png")
    ji=loadImage("jump.png")
}


function setup() {
    createCanvas(400, 400);
    background1=createSprite(200,200,800,800)
    background1.addImage(bg)
    monkey = createSprite(60, 348, 20, 20);
    ground = createSprite(200, 356, 800, 8);
    jumpButton = createSprite(350,100,20,20);
    jumpButton.addImage(ji)
    jumpButton.scale=0.37
    ground.visible=false
    monkey.addAnimation("monkey",ma)
    monkey.scale = 0.1;
    background1.x = background1.width / 2
    // monkey.setCollider("rectangle", 0, 0, monkey.width - 10, monkey.height - 10);
}
function draw() {
    background(230);
    monkey.collide(ground)
    if (gameState) {
       if(mousePressedOver(jumpButton)){
           htmlJump()
       }
        background1.velocityX = -2.6 - (survivalTime / 100);

        monkey.velocityY += 0.55;
        if(!is){
            if (keyDown("space")&& monkey.y > 315.2) {
                monkey.velocityY = -12;
            }
            if (monkey.y < 314) {
                monkey.addAnimation("monkey",ma)
            } else {
                monkey.addImage(ma4)
            }
        }

        if (background1.x < 0) {
            background1.x = background1.width / 2;
        }
        if(points%25===0 && points>0 && pointCheck && monkey.scale<0.12) {
            monkey.scale += 0.03;
            console.log("a")
            is=true;
        }
        if(is){
            if (keyDown("space") && monkey.y > 310) {
                monkey.velocityY = -12;
            }
            if (monkey.y < 310) {
                monkey.addAnimation("monkey",ma)
            } else {
                monkey.addImage(ma4)
            }
        }
        if(points%25===0){
            console.log("b")
            pointCheck=false
        }else {
            pointCheck = true
            console.log("c")
        }
        console.log(monkey.scale)
        obstacles.forEach(function (obstacle) {
            if(monkey.isTouching(obstacle)) {
                if(monkey.scale>0.1) {
                    obstacle.destroy();
                    monkey.scale = 0.1;
                    is=false
                    console.log("not out")
                }else{
                    gameState = 0;
                    obstacle.destroy();
                    console.log("out")
                }
            }
            // monkey.collide(obstacle);
        })
        survivalTime += (0.3);
        spawnObstacle();
        spawnBanana();
        bananas.forEach(function (banana) {
            if (monkey.isTouching(banana)) {
                points += 5;
                banana.destroy();
            }
        })
    } else {
        points=0
        background1.velocityX = 0;
        obstacles.forEach(function (obstacle) {
            obstacle.velocityX = 0;
        })
        bananas.forEach(function (banana) {
            banana.velocityX = 0;
        })
        monkey.velocityY = 0;
        // monkey.setFrame(0);
        monkey.velocityX = 0;
        textSize(35)
        text("press r to restart", 38, 160)
        if (keyDown("r")) {
            gameState = 1;
            survivalTime = 0;
            obstacles.forEach(function (obstacle) {
                obstacle.destroy();
            })
            bananas.forEach(function (banana) {
                banana.destroy();
            })
        }
    }
    // console.log(monkey.y)
    createEdgeSprites();
    drawSprites();
    textSize(26)
    text("Survival Time = " + Math.round(survivalTime) + "\npoints = " + points, 17, 25)
}

function spawnObstacle() {
    if (World.frameCount % 450 === 0) {
        var obstacle = createSprite(405, 340, 20, 20)
        obstacle.addImage(oi);
        obstacle.scale = 0.12
        obstacle.velocityX = -4 - (survivalTime / 100);
        obstacle.lifetime = 405 / obstacle.velocityX;
        obstacles.push(obstacle)
    }
}

function spawnBanana() {
    if (World.frameCount % 80 === 0) {
        var rn = Math.round(random(140, 180));
        var banana = createSprite(405, rn, 20, 20)
        banana.addImage(bi);
        banana.scale = 0.08
        banana.velocityX = -4 - (survivalTime / 50);
        banana.lifetime = rn / banana.velocityX;
        bananas.push(banana)
    }
}
function htmlJump(){
    if(!is){
        if (monkey.y > 315.2) {
            monkey.velocityY = -12;
        }
        if (monkey.y < 314) {
            monkey.addAnimation("monkey",ma)
        } else {
            monkey.addImage(ma4)
        }
    }
    if(is){
        if ( monkey.y > 310) {
            monkey.velocityY = -12;
        }
        if (monkey.y < 310) {
            monkey.addAnimation("monkey",ma)
        } else {
            monkey.addImage(ma4)
        }
    }
}
function s(){
    return true;
}