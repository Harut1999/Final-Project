const canvas=document.getElementById('canvas')
const c=canvas.getContext("2d")
canvas.width= window.innerWidth;
canvas.height=window.innerHeight;
  for(let i=0; i<=255; i+=51){
      for(let j=0; j<=255; j+=51){
        for(let k=0; k<=204; k+=51){
          setInterval(function(){
           var bg="background:rgb("+i+", "+j+", "+k+");"
           canvas.style=bg
         }, 500)
        }

}
}
