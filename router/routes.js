// import the routes from other files...s
var express =require('express');
var router = express.Router();

router.get("/", function(req, res){
    //redirect the page direct to URL("wiki/redirect");
    res.redirect('/wiki/about'); 
    // res.render({ title: 'Hey', message: 'Hello there!' });
    res.send("Wiki page");
})

router.get("/wiki", function(req, res){
    res.send("Page at wiki route");
})



router.get("/about", function(req, res){
    res.send("About wiki page.");
})

//Allow access to router object in app.
module.exports =router;

