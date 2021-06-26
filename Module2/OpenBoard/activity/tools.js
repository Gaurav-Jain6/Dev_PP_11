let undo = document.querySelector("#undo") ;
let redo = document.querySelector("#redo") ;
undo.addEventListener("click" , undoLine) ;
redo.addEventListener("click" , redoLine) ;

function undoLine(e)
{
    // console.log(e) ;
    if(lineDB.length)
    {
        let undoLine = lineDB.pop() ;
        redoLinesDB.push(undoLine) ;

        // clear canvas
        ctx.clearRect(0 , 0 , canvas.width , canvas.height) ;
        
        drawLinesFromdb() ;
    }
}


function redoLine()
{
    let currentLineWidth = ctx.lineWidth;
    let currentStrokeStyle = ctx.strokeStyle;
    if(redoLinesDB.length)
    {
        let redoLine = redoLinesDB.pop() ;
        for(let i = 0 ; i < redoLine.length ; i++)
        {
            let pointObject = redoLine[i] ;
            if(pointObject.type == "md")
            {
                ctx.lineWidth = pointObject.lineWidth;
                ctx.strokeStyle = pointObject.strokeStyle;
                ctx.beginPath() ;
                ctx.moveTo(pointObject.x , pointObject.y) ;
            }
            else
            {
                ctx.lineTo(pointObject.x , pointObject.y) ;
                ctx.stroke() ;
            }
        }
        lineDB.push(redoLine) ;
    }
    ctx.lineWidth = currentLineWidth;
    ctx.strokeStyle = currentStrokeStyle;
}


function drawLinesFromdb(){
    let currentLineWidth = ctx.lineWidth;
    let currentStrokeStyle = ctx.strokeStyle;

    for(let i = 0 ; i < lineDB.length ; i++)
    {
        let line = lineDB[i] ;
        for(let i = 0 ; i <line.length ; i++) // can use i inside of i 
        {
            let pointObject = line[i] ;
            if(pointObject.type == "md")
            {
                ctx.lineWidth = pointObject.lineWidth;
                ctx.strokeStyle = pointObject.strokeStyle;
                ctx.beginPath() ;
                ctx.moveTo(pointObject.x , pointObject.y) ;
            }
            else
            {
                ctx.lineTo(pointObject.x , pointObject.y) ;
                ctx.stroke() ;
            }
        }
    }
    ctx.lineWidth = currentLineWidth;
    ctx.strokeStyle = currentStrokeStyle;
}