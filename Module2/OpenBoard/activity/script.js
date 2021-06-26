let canvas = document.querySelector("#canvas") ;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 100;

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 100;
  drawLinesFromdb() ;
});

// canvas drawing gets erased on window resize ???

// a context object which provides fun for 2d drawing
let ctx = canvas.getContext("2d");


let lineDB = [] ;
let redoLinesDB = [] ;
let lines = [] ;
let isPenDown = false ;

canvas.addEventListener("mousedown" , function(e){
    if(redoLinesDB.length)
    {
        redoLinesDB = [] ;
    }
    let x = e.clientX ;
    let y = e.clientY - 100 ;
    // console.log(clientX,clientY) ;
    isPenDown = true ;
    ctx.beginPath() ;
    ctx.moveTo(x , y) ;
    
    let pointObject = {
        x : x ,
        y : y ,
        type : "md",
        lineWidth: ctx.lineWidth,
        strokeStyle: ctx.strokeStyle,
    }
    lines.push(pointObject) ;
})

canvas.addEventListener("mousemove" , function(e){
    if(isPenDown)
    {
        let x = e.clientX ;
        let y = e.clientY - 100 ;
        // console.log(clientX , clientY) ;

        ctx.lineTo(x , y) ;
        ctx.stroke() ;
        let pointObject = {
            x : x ,
            y : y ,
            type : "mm" 
        }
        lines.push(pointObject) ;
    }
})

canvas.addEventListener("mouseup" , function(e){
    isPenDown = false ;

    lineDB.push(lines) ;
    lines = [] ;

    // console.log(lineDB) ;

})