const canvas=document.getElementById('canvas')
const c=canvas.getContext("2d")
canvas.width= window.innerWidth;
canvas.height=window.innerHeight;
c.fillStyle="red"
c.fillRect(canvas.width/4.5, canvas.height/12, canvas.width/4.5+500, canvas.height/12+600)

