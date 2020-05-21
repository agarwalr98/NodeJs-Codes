var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs =require('fs');
var path = require('path') ;
// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: true});

//Validate/ Sanitize the data 
const {check, validationResult} =require('express-validator/check');
app.use(express.static(path.join (__dirname ,'public')) );
app.use(bodyParser.json());
// app.get('/index.html', urlencodedParser,   function (req, res) {
//    // fs.readFile( __dirname + "/" + "index.html" , function(err, data){
//    //    if (err){
//    //  console.log("Error while reading the index.html");
//    //  res.status(400).send("Error while reading the index.html");
//    //    } else 
//    //    {
//    //  console.log("Read successfully!");

//    //  console.log("Data is: ", data);
//    //  res.send(data);
            
            
//    //    }
//    // })
//    res.sendFile(path.join (__dirname, "index.html"));
// });

// app.post('/index.html', urlencodedParser,  function (req, res) {
//    // Prepare output in JSON format
//    response = {
//       first_name:req.body.first_name,
//       last_name:req.body.last_name
//    };
//    email =response.first_name;
//    password =response.last_name;
   
//    console.log(req.query)
//    console.log(req.params)
//    console.log(response);
//    res.end(JSON.stringify(response));
// });

//function to check the data get from user interface
var validationCheck = function (){
 return [
   // Check if firstname is email
   check('first_name').isEmail().normalizeEmail(), 
   // family name should not be empty..
   check('last_name').not().isEmpty().withMessage('Family/last name should not be empty')
   .trim()
   .escape()
 ]
};
//used for Multiple HTTP verbs(requests ) at the same API ENDPOINT.
app.route("/index")
   .get(urlencodedParser ,function(req, res){
      res.sendFile(path.join (__dirname , 'index.html'));
   })
   .post( urlencodedParser, validationCheck(), function(req, res){
      
         //Find errors and respond back with an errobject 
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
         }
      response = {
         first_name:req.body.first_name,
         last_name:req.body.last_name
      };
      
      email =response.first_name;
      password =response.last_name;
      
      console.log(req.query)
      console.log(req.params)
      console.log(response);
      res.end(JSON.stringify(response));
   });
var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})


// // Firebase App (the core Firebase SDK) is always required and
// // must be listed before other Firebase SDKs
// var firebase = require("firebase/app");

// // Add the Firebase products that you want to use
//     require("firebase/auth");
// require("firebase/firestore");
// const firebaseConfig = {
//     apiKey: "AIzaSyAAuTxxsv40r4H8nwTOmgf7_bfQQHYRk3U",
//     authDomain: "r3ygaming-f3358.firebaseapp.com",
//     databaseURL: "https://r3ygaming-f3358.firebaseio.com",
//     projectId: "r3ygaming-f3358",
//     storageBucket: "r3ygaming-f3358.appspot.com",
//     messagingSenderId: "123155083155",
//     appId: "1:123155083155:web:9bc63babca59656f5b0266",
//     measurementId: "G-MFT6XMV9EG"
//   };

// firebase.initializeApp(firebaseConfig);

