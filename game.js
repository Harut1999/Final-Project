const canvas=document.getElementById('canvas')
const ctx=canvas.getContext("2d")
canvas.width= window.innerWidth;
canvas.height=window.innerHeight;
const bg = {
            x: 0,
            y:0

        }
        const bg2 = {
            x:0,
            y:canvas.height

        }
 const bgImage = new Image();
 bgImage.src = "https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569__340.jpg";
        
 const bgImage2 = new Image();
 bgImage2.src = "https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569__340.jpg";


const draw = function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(bgImage, bg.x, bg.y, canvas.width, canvas.height);
            ctx.drawImage(bgImage2,bg2.x, bg2.y, canvas.width, canvas.height);
            
        }
const update = function () {

            bg.y=bg.y-2;
            bg2.y=bg2.y-2;
           if (bg2.y<= 0) {
               bg.y = 0;
               bg2.y = canvas.height;
           }
        }
 const loop = function () {
            draw();
            update();
            requestAnimationFrame(loop);
        }
        loop();
