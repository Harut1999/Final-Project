const canvas=document.getElementById('canvas')
const ctx=canvas.getContext("2d")
canvas.width= window.innerWidth;
canvas.height=window.innerHeight;
let start=false
let gameover=false;

// background music

const bgMusic=function(){
var audio = new Audio('bgmusic.mp3');
audio.play();
}

const mYscore=function () {
    var x = document.getElementById("myScore");
    x.style.display = "inline";
     var y=document.getElementById("score");
	  y.style.display = "inline";
    }

// Violeta start button
const myFunction = function () {
    document.getElementById("foo").style.display = "none";
    start=true;
    var re = document.getElementById("restart");
    re.style.display = "inline";
}
// ends here
const bg = {
    x: (canvas.width - 900) / 2,
    y: 0
}
const bg2 = {
    x: (canvas.width - 900) / 2,
    y: canvas.height
}
//Violeta

const bgImage = new Image();
bgImage.src = "https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569__340.jpg";

const bgImage2 = new Image();
bgImage2.src = "https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569__340.jpg";

const drawBack = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bgImage, 0, 0, bgImage.width, bgImage.height, bg.x, bg.y, 900, canvas.height);
    ctx.drawImage(bgImage2, 0, 0, bgImage2.width, bgImage2.height, bg2.x, bg2.y, 900, canvas.height);
}
const updateBack = function () {
    bg.y -= level("bg");
    bg2.y -= level("bg");
    if (bg2.y <= 0) {
        bg.y = 0;
        bg2.y = canvas.height;
    }
}

//Harut-stones
const rand = function(num) {
  return Math.floor(Math.random()*num) + 1;
};
let score=0;
let countRow=1;
let hearts=3;
let onload= false;
const asteroidImg=new Image();
asteroidImg.src="asteroid.png";

const badGuyImg=new Image();
badGuyImg.src="BadGuyImage.png"

const heartImg=new Image();
heartImg.src="heart.png"

const gameOverImg=new Image();
gameOverImg.src="gameOverBack.png"

const drawGameOver=function(){
	ctx.drawImage(gameOverImg, 340, 100, 800, 450)
	document.getElementById("par").innerHTML=document.getElementById("input").value + ",  Your score is  "+score;

}

//create stones
const level=function(str){
  if(str==="bg"){
    return Math.min(2+Math.floor(score/90), 7)
  }
  else if(str==="stoneSpeed"){
    return Math.min(rand(150)/100+0.5+Math.floor(score/80)/2, 7)
  }
  else if(str==="stoneNum")
    return Math.min(rand(4+Math.floor(score/120)), 7)
}
const array=[];
const explosionArr=[];
const createPoints=function(count, image){
  const arr=[];
  const loop=function(num, arr){
      if(num===0)
        return [];
      arr[num-1]={
        x: (rand(10))*80+(canvas.width-1000)/2,
        y: (canvas.height-1000)/2-100,
        width: 70,
        height: 70,
        img: image,
        yDelta: level("stoneSpeed"),
        distance: 150,
        hide: false,
        imgSx: 0,
        imgSy: 0,
        countStep: 0,
        countImg: 0
  }
    return arr[num-1]+loop(num-1, arr);
}
  loop(count, arr);
  return arr;
}

//Anihero moves
const hero = {
  x: 620,
  y: 620,
  width: 110,
  height: 110,
  xDelta: 0,
  yDelta: 0,
  opacity: 1,
  opacityDelta: -0.03,
  collided: false

};

const bulletImg=new Image();

const bull=[];
const bullBadGuy=[]
function bullet(){
  this.x=hero.x+50;
  this.y=hero.y;
  this.width=20;
  this.height=80;
  this.hide=false;
  this.yDelta=20
}
function explosion(){
    this.x= 0;
    this.y= 0
    this.imgSx= 0
    this.imgSy= 0
    this.imgDx= 0
    this.imgDy= 0
    this.imgwidth= 100
    this.imgheight= 100
}

const heroImg = new Image();

const img1 =function(){
  heroImg.src = "ship1.png";
  bulletImg.src="laser.png"
} 
const img2=function(){
  heroImg.src = "ship2.png";
  bulletImg.src="Red_laser.png";

}
const img3=function(){
  heroImg.src = "ship3.png";
  bulletImg.src="laser.png"

}
const img4=function(){
  heroImg.src = "ship4.png";
  bulletImg.src="Red_laser.png";


}

const fillArray=function(array){
	array.length+=1;
  if(countRow%8===0){
    array[array.length-1]=createPoints(1, badGuyImg)
    var badBullet=new bullet();
    badBullet.x=array[array.length-1][0].x+35;
    badBullet.y=array[array.length-1][0].y+35;
    bullBadGuy.length++;
    bullBadGuy[bullBadGuy.length-1]=badBullet;
  }
  else if(countRow%10===0){
        array[array.length-1]=createPoints(1, heartImg)
  }
  else{
      array[array.length-1]=createPoints(level("stoneNum"), asteroidImg)
  }
  countRow++;
	return array;
}
fillArray(array);
//create bullets

const explosionImg=new Image();
explosionImg.src="explosion.png"

const re = function(){
	location.reload();
}


const drawStones=function(){
  ctx.globalAlpha = hero.opacity;
  ctx.drawImage(heroImg, hero.x, hero.y, hero.width, hero.height);
  ctx.globalAlpha = 1.0;
  array.forEach(function(point){
    point.forEach(function(place){
      if(!place.hide && place.img===asteroidImg)
        ctx.drawImage(place.img, place.imgSx,place.imgSy, 166.6, 164, place.x, place.y, 70, 70)
      else if(!place.hide && place.img===badGuyImg)
        ctx.drawImage(place.img, place.x, place.y, 70,70)
      else if(!place.hide && place.img===heartImg){
        ctx.drawImage(place.img, place.x, place.y, place.width, place.height)
      }
    })
  });
  for(let i=0; i<bull.length; i++){
    if(!bull[i].hide){
    ctx.drawImage(bulletImg, bull[i].x,bull[i].y, bull[i].width,bull[i].height)
  }
  }
  for(let i=0; i<explosionArr.length; i++){
      if(explosionArr[i].imgSx===900){
        if(explosionArr[i].imgSy!==900){
          explosionArr[i].imgSx=0
          explosionArr[i].imgSy+=100
      }
    }
      ctx.drawImage(explosionImg, explosionArr[i].imgSx, explosionArr[i].imgSy, 100,100, explosionArr[i].imgDx, explosionArr[i].imgDy, explosionArr[i].imgwidth, explosionArr[i].imgheight)
      explosionArr[i].imgSx+=100
    }

  for(let i=0; i<bullBadGuy.length; i++){
    if(!bullBadGuy[i].hide)
    ctx.drawImage(bulletImg, bullBadGuy[i].x,bullBadGuy[i].y, bullBadGuy[i].width,bullBadGuy[i].height)
  }
    for(let i=0; i<=hearts-1; i++){
      ctx.drawImage(heartImg, (canvas.width-900)/2+50*i, canvas.height-40, 40, 40)
  }
}
const updateStones=function(){
  document.getElementById("score").innerHTML=score;
  //Ani-hero
  if(hero.y<=10){
    hero.y = 10;
  }
  if(hero.y >=canvas.height-hero.height){
    hero.y = canvas.height-hero.height;
  }
  //Elina-heart
  if(hearts<=0){
	  start=false
    gameover=true;
  }
  //Harut-stones
  for(let i=array.length-1; i>=0; i--){
    for(let j=array[i].length-1; j>=0; j--){
    array[i][j].y+=array[i][j].yDelta
      array[i][j].countStep++;
      if(array[i][j].countStep===3){
        array[i][j].countStep=0;
      if(array[i][j].countImg===23){
        array[i][j].imgSx=0
        array[i][j].countImg=0;
      }
      array[i][j].imgSx+=166.6;
      array[i][j].countImg++;
    };
    for(let k=bull.length-1; k>=0; k--){
      if (array[i][j].img!==heartImg && !bull[k].hide && !array[i][j].hide && bull[k].x <= array[i][j].x + array[i][j].width  && bull[k].x + bull[k].width  >= array[i][j].x &&
     bull[k].y <= array[i][j].y + array[i][j].height && bull[k].y + bull[k].height >= array[i][j].y){
       var audio = new Audio('shoot.mp3')
       audio.play();
       array[i][j].hide=true;
       bull[k].hide=true;
       var a=new explosion();
       a.imgDx=array[i][j].x
       a.imgDy=array[i][j].y
       explosionArr.length++;
       explosionArr[explosionArr.length-1]=a;
       score+=10
     }

    }
    if(array[i][j].img===badGuyImg && !array[i][j].hide &&bullBadGuy[bullBadGuy.length-1].y>=700+array[i][j].y){
      var badBullet=new bullet();
      badBullet.x=array[i][j].x+35;
      badBullet.y=array[i][j].y+35;
      badBullet.yDelta=15;
      bullBadGuy.length++;
      bullBadGuy[bullBadGuy.length-1]=badBullet;
    }
    if(!array[i][j].hide && hero.x < array[i][j].x + array[i][j].width &&  hero.x + hero.width > array[i][j].x &&
       hero.y + hero.height > array[i][j].y  && hero.y < array[i][j].y + array[i][j].height){
         //Elina-heart
         if(array[i][j].img===heartImg){
           hearts++;
           score+=10;
         }
         else if(!hero.collided){
           hearts--;
           hero.collided=true;
           var a=new explosion();
           a.imgDx=array[i][j].x
           a.imgDy=array[i][j].y
           explosionArr.length++;
           explosionArr[explosionArr.length-1]=a;
         }
            array[i][j].hide=true
    }
    if((array[i][j].y>=canvas.height || array[i][j].hide)&& array[i].length!==1){
        array[i].splice(j,1)
    }

    }
  }
      if(hero.collided){
        hero.opacity+=hero.opacityDelta;
        if(hero.opacity<=0.1){
          hero.opacityDelta=-hero.opacityDelta
        }
        if(hero.opacity>=1){
          hero.collided=false;
          hero.opacityDelta=-hero.opacityDelta
        }
      }
      //Create new stones
      if(array[array.length-1][array[array.length-1].length-1].y>=(canvas.height+700)/2-650){
        fillArray(array);
      }
//Bad Guys
  for(let i=0; i<bull.length; i++){
    bull[i].y-=bull[i].yDelta;
  }
  for(let i=0; i<bullBadGuy.length; i++){
    bullBadGuy[i].y+=bullBadGuy[i].yDelta;
    if(!bullBadGuy[i].hide && hero.x < bullBadGuy[i].x + bullBadGuy[i].width &&  hero.x + hero.width > bullBadGuy[i].x &&
       hero.y + hero.height > bullBadGuy[i].y  && hero.y < bullBadGuy[i].y + bullBadGuy[i].height){
            hearts--;
            bullBadGuy[i].hide=true

    }
  }

}
const leftKey = 37;
const upKey = 38;
const rightKey = 39;
const downKey = 40;


document.addEventListener('keydown', function(event) { //heros actions with keys
        if(event.keyCode === rightKey) {
            hero.x = hero.x + 25;
            if(hero.x +hero.width>= (canvas.width+900)/2){
                hero.x = (canvas.width+900)/2-hero.width;
            }

        } else if(event.keyCode === leftKey){
            hero.x = hero.x - 25;
            if(hero.x < (canvas.width-900)/2){
                hero.x = (canvas.width-900)/2;
            }

        } else if(event.keyCode === upKey){
            hero.y = hero.y -25;
        }else if(event.keyCode === downKey){
          hero.y = hero.y +25;
        }
    }, false);


//Harut-bullet
var keydown = false;
document.addEventListener('keydown', function(event) {
	if(event.keyCode === 32 && !keydown) {
    var a=new bullet();
    bull.length++;
    bull[bull.length-1]=a;
    keydown = true;
  	}
    document.addEventListener('keyup', function() {
      keydown = false;
    });
}, false);


const drawanimate=function(){
  if(start){
  drawBack();
  drawStones();
  updateBack();
  updateStones();
  
}
  else if(gameover){
  	drawGameOver();
  }
  requestAnimationFrame(drawanimate);

}

drawanimate();

