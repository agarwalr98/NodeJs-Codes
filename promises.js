// Success callback function ..
function successCallback(result) {
    console.log("Audio file " + result);
  }

  //Failure callback function...
  function failureCallback(error) {
    console.error("Error:  " + error);
  } 
 m =() =>
 {
     console.log(224);
     return 24;
 }
 var global_v ="";
//Create an instance of promises
const promise = new Promise((resolve, reject)=> {
    global_v ="Promise";
    resolve(global_v);
    // reject(err);
});
const promise2 = promise.then(      // then is called when promise1 is executed successfully, indicated by resolve.
successCallback, failureCallback
);
console.log(global_v);