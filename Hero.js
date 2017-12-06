forEach(array, function(point){   //Collision detection
        point.forEach(function(place){

            if(hero.x < place.x + place.width &&

              hero.x + hero.width > place.x &&
     
                hero.y + hero.height > place.y  &&

                hero.y < place.y + place.height 
                ){
                    alert("Game over");
                    
            } else if(place.x < hero.x + hero.width  && 

              place.x + place.width > hero.x &&

                place.y < hero.y + hero.height &&

                place.y + place.height > hero.y 
                ){
                    alert("Game Over");        
            }
        });
  });

//Anihero moves
const hero = {
  x: 570,
  y: 550,
  width: 110,
  height: 110,
  xDelta: 0,
  yDelta: 0

};


const heroImg = new Image();
heroImg.src = "ship1.png";

const draw  = function(){
  ctx.drawImage(heroImg, hero.x, hero.y, hero.width, hero.height);
};

const leftKey = 37;
const upKey = 38;
const rightKey = 39;
const downKey = 40;


document.addEventListener('keydown', function(event) { //heros actions with keys
        if(event.keyCode === rightKey) {
            hero.x = hero.x + 10;
            if(hero.x >= canvas.width-hero.width-220){
                hero.x = canvas.width-hero.width-220;
            }

        } else if(event.keyCode === leftKey){
            hero.x = hero.x - 10;
            if(hero.x < 220){
                hero.x = 220;
            }

        } else if(event.keyCode === upKey){
            hero.y = hero.y -10;
        }else if(event.keyCode === downKey){
          hero.y = hero.y +10;
        }
    }, false);

const moveHero = function(){
  if(hero.y<=10){
    hero.y = 10;
  }
  if(hero.y >=canvas.height-hero.height){
    hero.y = canvas.height-hero.height;
  }
  
};

//Ani hero data


