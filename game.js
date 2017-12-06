// Violeta
// this is for the random color page 
        const rand = function () {
           return Math.round(Math.random() * 255);

        }
        setInterval(function () {
            var red = rand(255);
            var green = rand(255);
            var blue = rand(255);
           var color = "background:rgb(" + red + "," + green + "," + blue + ");";
           var element = document.getElementById("body");
           
          element.style = color;
      }, 1000);
        debugger;
   
// it ends here


const canvas=document.getElementById('canvas')
const ctx=canvas.getContext("2d")
canvas.width= window.innerWidth;
canvas.height=window.innerHeight;



const bg = {
         x: (canvas.width-900)/2,
         y:0
       }
  const bg2 = {
         x:(canvas.width-900)/2,
         y:canvas.height
       }
//Violeta

 const bgImage = new Image();
 bgImage.src = "https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569__340.jpg";

 const bgImage2 = new Image();
 bgImage2.src = "https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569__340.jpg";

const drawBack = function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(bgImage, 0,0, bgImage.width, bgImage.height, bg.x, bg.y, 900, canvas.height);
            ctx.drawImage(bgImage2,0,0, bgImage2.width, bgImage2.height, bg2.x, bg2.y, 900, canvas.height);
        }
const updateBack = function () {
            bg.y-=level("bg");
            bg2.y-=level("bg");
           if (bg2.y<= 0) {
              bg.y = 0;
              bg2.y = canvas.height;
           }
        }
//Harut-stones

const rand = function(num) {
  return Math.floor(Math.random() * num) + 1;
};
let score=0;
let countRow=1;
let onload= false;
const asteroidImg=new Image();
asteroidImg.src="asteroid.png";

const badGuyImg=new Image();
badGuyImg.src="BadGuyImage.png"
//create stones
const level=function(str){
  if(str==="bg"){
    return Math.min(2+Math.floor(score/90), 7)
  }
  else if(str==="stoneSpeed"){
    return Math.min(rand(2)+0.5+Math.floor(score/80)/2, 7)
  }
  else if(str==="stoneNum")
    return Math.min(rand(4)+Math.floor(score/120), 7)
}
const array=[];
const createPoints=function(count, image){
  const arr=[];
  const loop=function(num, arr){
      if(num===0)
        return [];
      arr[num-1]={
        x: (rand(10))*80+(canvas.width-900)/2,
        y: (canvas.height-700)/2-100,
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
  x: 570,
  y: 550,
  width: 110,
  height: 110,
  xDelta: 0,
  yDelta: 0

};

const bulletImg=new Image();
bulletImg.src="laser.png"
const bull=[];
const bullBadGuy=[]
function bullet(){
  this.x=hero.x+50;
  this.y=hero.y;
  this.width=20;
  this.height=80;
  this.hide=false;
  this.yDelta=20;
  this.audio=false;
  this.explosion={
      imgSx: 0,
      imgSy: 0,
      imgDx: 0,
      imgDy: 0,
      imgwidth: 100,
      imgheight: 100
  }
}

const heroImg = new Image();
heroImg.src = "ship1.png";

const fillArray=function(array){
	array.length+=1;
  if(countRow%8!==0)
	 array[array.length-1]=createPoints(level("stoneNum"), asteroidImg)
  else {
    array[array.length-1]=createPoints(1, badGuyImg)
    var badBullet=new bullet();
    badBullet.x=array[array.length-1][0].x+35;
    badBullet.y=array[array.length-1][0].y+35;
    bullBadGuy.length++;
    bullBadGuy[bullBadGuy.length-1]=badBullet;
  }
  countRow++;
	return array;
}
fillArray(array);
//create bullets

const explosionImg=new Image();
explosionImg.src="explosion.png"


const drawStones=function(){
  //ctx.clearRect(0,0,canvas.width, canvas.height)
//  ctx.fillRect((canvas.width-900)/2, 0, 900,canvas.height)
  ctx.drawImage(heroImg, hero.x, hero.y, hero.width, hero.height);
  array.forEach(function(point){
    point.forEach(function(place){
      if(!place.hide && place.img===asteroidImg)
        ctx.drawImage(place.img, place.imgSx,place.imgSy, 166.6, 164, place.x, place.y, 70, 70)
      else if(!place.hide && place.img===badGuyImg)
        ctx.drawImage(place.img, place.x, place.y, 70,70)
    })
  });
  for(let i=0; i<bull.length; i++){
    if(!bull[i].hide){
    ctx.drawImage(bulletImg, bull[i].x,bull[i].y, bull[i].width,bull[i].height)
  }
    else {
      if(bull[i].explosion.imgSx===900){
        if(bull[i].explosion.imgSy!==900){
        bull[i].explosion.imgSx=0
        bull[i].explosion.imgSy+=100
      }
    }
      ctx.drawImage(explosionImg, bull[i].explosion.imgSx, bull[i].explosion.imgSy, 100,100, bull[i].explosion.imgDx, bull[i].explosion.imgDy, bull[i].explosion.imgwidth, bull[i].explosion.imgheight)
      bull[i].explosion.imgSx+=100
    }
  }
  for(let i=0; i<bullBadGuy.length; i++){
    if(!bullBadGuy[i].hide)
    ctx.drawImage(bulletImg, bullBadGuy[i].x,bullBadGuy[i].y, bullBadGuy[i].width,bullBadGuy[i].height)
  }
}
const updateStones=function(){
  if(hero.y<=10){
    hero.y = 10;
  }
  if(hero.y >=canvas.height-hero.height){
    hero.y = canvas.height-hero.height;
  }
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
      if (!bull[k].hide && !array[i][j].hide && bull[k].x <= array[i][j].x + array[i][j].width  && bull[k].x + bull[k].width  >= array[i][j].x &&
     bull[k].y <= array[i][j].y + array[i][j].height && bull[k].y + bull[k].height >= array[i][j].y){
       array[i][j].hide=true;
       bull[k].hide=true;
       bull[k].explosion.imgDx=array[i][j].x
       bull[k].explosion.imgDy=array[i][j].y
       score+=10
     }

    }
    if(array[i][j].img===badGuyImg && !array[i][j].hide &&bullBadGuy[bullBadGuy.length-1].y>=400+array[i][j].y){
      var badBullet=new bullet();
      badBullet.x=array[i][j].x+35;
      badBullet.y=array[i][j].y+35;
      bullBadGuy.length++;
      bullBadGuy[bullBadGuy.length-1]=badBullet;
    }
    if(!array[i][j].hide && hero.x < array[i][j].x + array[i][j].width &&  hero.x + hero.width > array[i][j].x &&
       hero.y + hero.height > array[i][j].y  && hero.y < array[i][j].y + array[i][j].height){
            alert("Game over")
            array[i][j].hide=true
            start=false;
    }
    if((array[i][j].y>=canvas.height || array[i][j].hide)&& array[i].length!==1){
        array[i].splice(j,1)
    }

    }
  }
      if(array[array.length-1][array[array.length-1].length-1].y>=(canvas.height+700)/2-650){
        fillArray(array);
      }

  for(let i=0; i<bull.length; i++){
    bull[i].y-=bull[i].yDelta;
  }
  for(let i=0; i<bullBadGuy.length; i++){
    bullBadGuy[i].y+=bullBadGuy[i].yDelta;
    if(!bullBadGuy[i].hide && hero.x < bullBadGuy[i].x + bullBadGuy[i].width &&  hero.x + hero.width > bullBadGuy[i].x &&
       hero.y + hero.height > bullBadGuy[i].y  && hero.y < bullBadGuy[i].y + bullBadGuy[i].height){
          alert("Game over")
            bullBadGuy[i].hide=true
            start=false;
    }
  }

}
const leftKey = 37;
const upKey = 38;
const rightKey = 39;
const downKey = 40;


document.addEventListener('keydown', function(event) { //heros actions with keys
        if(event.keyCode === rightKey) {
            hero.x = hero.x + 17;
            if(hero.x +hero.width>= (canvas.width+900)/2){
                hero.x = (canvas.width+900)/2-hero.width;
            }

        } else if(event.keyCode === leftKey){
            hero.x = hero.x - 17;
            if(hero.x < (canvas.width-900)/2){
                hero.x = (canvas.width-900)/2;
            }

        } else if(event.keyCode === upKey){
            hero.y = hero.y -17;
        }else if(event.keyCode === downKey){
          hero.y = hero.y +17;
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


const animate=function(){
  if(start){
  drawBack();
  drawStones();
  updateBack();
  updateStones();
}
  requestAnimationFrame(animate);

}
debugger;
animate();
