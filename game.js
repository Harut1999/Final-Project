const canvas=document.getElementById('canvas')
const ctx=canvas.getContext("2d")
canvas.width= window.innerWidth;
canvas.height=window.innerHeight;
const canvas=document.getElementById('canvas')
const ctx=canvas.getContext("2d")
canvas.width= window.innerWidth;
canvas.height=window.innerHeight;

//Violeta
const bg = {
            x: (canvas.width-900)/2,
            y:0
        }
        const bg2 = {
            x:(canvas.width-900)/2,
            y:canvas.height
        }
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
//Harut
const rand = function(num) {
  return Math.floor(Math.random() * num) + 1;
};
let onload= false
const asteroidImg=new Image();
asteroidImg.onload = function() {
  onload=true
}

asteroidImg.src="asteroid.png";
const array=[];
const createPoints=function(count){
  const arr=[];
  const loop=function(num, arr){
      if(num===0)
        return [];
      arr[num-1]={
        x: (rand(10))*80+350,
        y: (canvas.height-700)/2-100,
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
	array[array.length-1]=createPoints(rand(5))
	return array;
}

fillArray(array);
const drawStones=function(){
  //ctx.clearRect(0,0,canvas.width, canvas.height)
//  ctx.fillRect((canvas.width-900)/2, 0, 900,canvas.height)
  array.forEach(function(point){
    point.forEach(function(place){
        ctx.drawImage(asteroidImg, place.imgSx,place.imgSy, 166.6, 164, place.x, place.y, 70, 70)
    })
  });
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
    })
  })
      if(array[array.length-1][0].y>=(canvas.height+700)/2-550)
        fillArray(array);
}
const animate=function(){
  drawBack();
  drawStones();
  updateBack();
  updateStones();
  requestAnimationFrame(animate);
}
animate();
