const fs = require("fs") ; // fs => file system 

// console.log(fs);

// utf-8 => format for plain text !!


fs.writeFileSync("./f1.txt" , "Hii I am f1 !!!") ;
let f1KaData = fs.readFileSync("./f1.txt", "utf-8") ;
console.log(f1KaData) ;

fs.writeFileSync("../activity/f2.txt" , "Hii I am f1 !!!")
let f2KaData = fs.readFileSync("../activity/f2.txt") ;

console.log(f2KaData) ;
