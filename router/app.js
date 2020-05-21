var express = require('express');
var wiki_router = require('./routes.js');

app =express()
http = require('http').Server(app)  
port = process.env.PORT || 8080        //port: 3000 
host = "127.0.0.1"                      //address: localhost
http.listen(port,host, function(){
	console.log("Listening @ http://" + host.toString()+":"+ http.address().port);
});
http.listen(8080, function(req, res){
    console.log(`Server is listening at ${port}`);
})
app.use('/wiki', wiki_router);

//Get the routes values(URL string), Basically Route parameters.
app.get('/users/:userId/books/:bookId', function (req, res, next) {
    // Access userId via: req.params.userId
    // Access bookId via: req.params.bookId
    res.send(req.params);
  })

