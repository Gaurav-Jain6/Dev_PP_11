let files = ["../f1.txt" , "../f2.txt" , "../f3.txt"] ;
const fs = require("fs");

for(let i = 0 ; i < files.length ; i++)
{
    fs.readFile(files[i] , function(err , data)
    {
        console.log(data + "") ;
    })
}