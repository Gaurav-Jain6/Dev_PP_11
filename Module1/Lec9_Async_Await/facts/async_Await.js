// async => it can be used before a function name !!
// await => it can only be used inside a async function !!

// IIFE => Immediately Invoked Function Expressions !!


const fs = require("fs") ;
console.log("start") ;

(async function()
{
    try{

        console.log("Hello World 1") ;
        console.log("I am inside async function 1!!") ;
        let f1KaData = await fs.promises.readFile("./f1.txt" , "utf8") ;  // this gives the data directly to us
        let f2KaData = await fs.promises.readFile("./f2.txt" , "utf8") ;  //this gives the data directly to us
        console.log("files of async function 1") ;
        console.log(f1KaData + "") ;
        console.log(f2KaData + "") ;
    }
    catch(error){
        console.log(error);
    }
})() ;

async function callMe()
{
    try{

        console.log("Hello World 2") ;
        console.log("I am inside async function 2!!") ;
        let f1KaPP = fs.promises.readFile("./f1.txt" , "utf8") ;
        let f2KaPP = fs.promises.readFile("./f2.txt" , "utf8") ;
        let bothFilesData = await Promise.all([f1KaPP , f2KaPP]) ;
        console.log("files of async function 2") ;
        console.log(bothFilesData) ;
    }
    catch(error){
        console.log(error);
    }
}

(async function()
{
    try{

        console.log("Hello World 3") ;
        console.log("I am inside async function 3!!") ;
        let f1KaPP = fs.promises.readFile("./f1.txt" , "utf8") ;  // this gives the pending promise of f1
        let f2KaPP = fs.promises.readFile("./f2.txt" , "utf8") ;  // this gives the pending promise of f2
        let bothFilesData = await Promise.all([f1KaPP , f2KaPP]) ;  // await will resolve the promise and gives us the data directly 
        console.log("files of async function 3") ;
        console.log(bothFilesData) ;
    }
    catch(error){
        console.log(error);
    }
})() ; // both ways are correct for declaring

callMe() ;


console.log("end") ;