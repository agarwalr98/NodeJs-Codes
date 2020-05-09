// asyncronous: Defaul behav.
var fs = require('fs')
var file = fs.readFile("input.txt", function(err, data){
    if(err)
    {
        console.log("Error: ", err);
    }

    setTimeout(()=>
    {
        console.log("Display afte some 2 seconds ");
    }, 2000)
})
console.log("Here Start.");
// display the current dir.
console.log(__dirname)
console.log(__filename)

//Display the parent dir.
console.log(process.cwd())  

