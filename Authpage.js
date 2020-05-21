var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: true})

app.use(express.static(path.join(__dirname+  'public')));
// app.use(bodyParser)

let authorize =true;
function checkAuth (req,res, next){

    if (authorize)
    {
        console.log("Access the html page");
        next();
    }
    else{
    res.status(403).send("Unauthorized ");
    }
};

app.use("/index.html",checkAuth);
app.get('/index.html', function (req, res) {
   res.send("Hey, I'm on way!");
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
