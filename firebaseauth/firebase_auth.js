
var app =require('express')() ;
var bodyParser =require('body-parser');
http = require('http').Server(app)
port = process.env.PORT || 8080      //port: 3000
host = "127.0.0.1"                      //address: localhost
http.listen(port,host, function(){
	console.log("Listening at http://" + host.toString()+":"+ http.address().port);
});


var firebase = require("firebase/app");
// Add the Firebase products that you want to use
    require("firebase/auth");
require("firebase/firestore");
const firebaseConfig = {
    apiKey: "AIzaSyAAuTxxsv40r4H8nwTOmgf7_bfQQHYRk3U",
    authDomain: "r3ygaming-f3358.firebaseapp.com",
    databaseURL: "https://r3ygaming-f3358.firebaseio.com",
    projectId: "r3ygaming-f3358",
    storageBucket: "r3ygaming-f3358.appspot.com",
    messagingSenderId: "123155083155",
    appId: "1:123155083155:web:9bc63babca59656f5b0266",
    measurementId: "G-MFT6XMV9EG"
  };
firebase.initializeApp(firebaseConfig);

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: true})
app.get("/index", function(req, res){                              //Caallbacks
  res.sendFile(__dirname+ "/index.html");
  // res.status(200).send("Hello world!");
});

app.get("/googlesignin", function(req, res){
  res.sendFile( __dirname + "/googlepage.html");
});


app.get("/redirect_page", function(req, res){
  res.send("Redirect page") ;
})

app.post("/index",urlencodedParser,  function(req, res)
{
  var email = req.body.email;
  var password = req.body.password;

  var username = req.body.username;
  console.log(username);
  if (username!=null){
    console.log("Signup ", "Email: ", email, " Password:  ", password);
    var num =signup(email, password);
  }
  else{
    var email =req.body.email;
    var password =req.body.password;
  console.log("Login ", "Email: ", email, " Password:  ", password);
  var flag=signIN(email, password);setTimeout(()=>{
    if (flag==1)
    {
      res.redirect("/redirect_page");
    }
  }, 1000);
  }
  

});

app.post("/login", urlencodedParser, function(req,res) {
  
;})
//Sign in with email.
function SendEmail (email, actionCodeSettings){

  firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
  .then(function() {
    // The link was successfully sent. Inform the user.
    // Save the email locally so you don't need to ask the user for it again
    // if they open the link on the same device.
    window.localStorage.setItem('emailForSignIn', email);
  })
  .catch(function(error) {
    // Some error occurred, you can inspect the code: error.code
  });
}

function signup(email, password){

  var actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be whitelisted in the Firebase Console.
    url: 'r3ygaming-f3358.firebaseapp.com' +  email,
    // This must be true.
    handleCodeInApp: true,
    iOS: {
      bundleId: 'com.example.ios'
    },
    android: {
      packageName: 'com.example.android',
      installApp: true,
      minimumVersion: '12'
    },
    dynamicLinkDomain: 'example.page.link'
  }; 

  
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error){ 
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // [START_EXCLUDE]
    if (errorCode == 'auth/weak-password') {
      console.log('The password is too weak.');
    } else {
      console.log("Error: ", errorMessage);
    }
    console.log(error);
    // [END_EXCLUDE]
  });
  // [END createwithemail]
}

function signIN(email, password){

  var flag =1;
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error ) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode, errorMessage);
    // [START_EXCLUDE]
    if (errorCode === 'auth/wrong-password') {
    console.log('Wrong password.');
    flag =0  ; 
    } else {
      console.log (errorMessage);


}});
 return flag;  }
  //Google' sign
var provider = new firebase.auth.GoogleAuthProvider();
function GoogleSignMethod(provider){

firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
var token = result.credential.accessToken; 
  // The signed-in user info.
  var user = result.user;
  console.log(result);
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});
}




