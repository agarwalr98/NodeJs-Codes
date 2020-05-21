// https://www.tutorialspoint.com/nodejs/index.htm
var http =require('http');
var url = require('url')
http.createServer (function(err, req, res){
    console.error(err.stack);
    var path = url.parse(req.url).pathname;
    console.log( "Request for "+path +" received");
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("Hello World"); //send to the client
}).listen(8081) //listen to the server.P P
