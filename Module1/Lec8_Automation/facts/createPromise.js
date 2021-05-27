let fs = require("fs") ;

function myPromisifiedFun(filePath){

    return new Promise(function(scb , fcb){

        fs.readFile(filePath, function(error , data)
        {
            if(error)
            {
                // fcb("data nhi aaya") ;
                fcb(error) ;
            }
            else{
                scb("testing success Callback!!!") ;
                // scb(data) ;
            }
        })
    }) ; //it will create a new promise object !!!   
}

let pendingPromise = myPromisifiedFun("./f1.txt") ;

pendingPromise.then(function(data){
    console.log(data + "")  ;
})

pendingPromise.catch(function(error){
    console.log(error) ;
})



// Can write then and catch like this also 


// pendingPromise.then(scb);
// pendingPromise.catch(fcb);

// function scb(data){
//     console.log(data+"");
// }
// function fcb(error){
//     console.log(error);
// }