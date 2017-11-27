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
            bg.y=bg.y-2;
            bg2.y=bg2.y-2;
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
let onload= false;
const asteroidImg=new Image();
asteroidImg.onload = function() {
  onload=true
}
asteroidImg.src="asteroid.png";
//create stones

const array=[];
const createPoints=function(count){
  const arr=[];
  const loop=function(num, arr){
      if(num===0)
        return [];
      arr[num-1]={
        x: (rand(10))*80+(canvas.width-900)/2,
        y: (canvas.height-700)/2-100,
        width: 70,
        height: 70,
        yDelta: rand(2)+0.5,
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
const fillArray=function(array){
	array.length+=1;
	array[array.length-1]=createPoints(rand(4))
	return array;
}
fillArray(array);
//create bullets

const explosionImg=new Image();
explosionImg.src="explosion.png"

const bulletImg=new Image();
bulletImg.src="laser.png"
const bull=[];
function bullet(){
  this.x=890;
  this.y=600;
  this.width=20;
  this.height=80;
  this.hide=false;
  this.yDelta=20;
  this.collided=false;
  this.explosion={
      imgSx: 0,
      imgSy: 0,
      imgDx: 0,
      imgDy: 0,
      imgwidth: 100,
      imgheight: 100
  }
}
const drawStones=function(){
  //ctx.clearRect(0,0,canvas.width, canvas.height)
//  ctx.fillRect((canvas.width-900)/2, 0, 900,canvas.height)
  array.forEach(function(point){
    point.forEach(function(place){
      if(!place.hide)
        ctx.drawImage(asteroidImg, place.imgSx,place.imgSy, 166.6, 164, place.x, place.y, 70, 70)
    })
  });
  for(let i=0; i<bull.length; i++){
    if(!bull[i].hide)
    ctx.drawImage(bulletImg, bull[i].x,bull[i].y, bull[i].width,bull[i].height)
  }
}
const updateStones=function(){
  array.forEach(function(point){
    point.forEach(function(place){
      place.y+=place.yDelta
      place.countStep++;
      if(place.countStep===3){
        place.countStep=0;
      if(place.countImg===23){
        place.imgSx=0
        place.countImg=0;
      }
      place.imgSx+=166.6;
      place.countImg++;
    };
    for(let i=0; i<bull.length; i++){
      if (!bull[i].hide &&!place.hide && bull[i].x < place.x + place.width  && bull[i].x + bull[i].width  > place.x &&
     bull[i].y < place.y + place.height && bull[i].y + bull[i].height > place.y){
       bull[i].collided=true;
       bull[i].hide=true;
       place.hide=true;
       bull[i].explosion.imgDx=place.x
       bull[i].explosion.imgDy=place.y
       score+=10
     }
    }
    })
  })
      if(array[array.length-1][0].y>=(canvas.height+700)/2-550){
        fillArray(array);
      }
  for(let i=0; i<bull.length; i++){
    bull[i].y-=bull[i].yDelta;
  }
  for(let i=0; i<bull.length; i++){
  if(bull[i].collided){
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
}

//Harut-bullet
document.addEventListener('keydown', function(event) {
	if(event.keyCode === 32) {
    var a=new bullet();
    bull.length++;
    bull[bull.length-1]=a;
  	}
}, false);
const animate=function(){
  drawBack();
  drawStones();
  updateBack();
  updateStones();
  requestAnimationFrame(animate);
}
animate();
