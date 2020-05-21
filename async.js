var async =require ('async');
//Execute in parallel ways.
// results will contain the output in the same way we have written our functions .
async.parallel({
    one: function(callback) { callback('null', 'one'); },
    two: function(callback) { callback('null','two'); },
    //...
    //...
    something_else: function(callback) { callback('null', 'thr'); }
    }, 
    // optional callback
    function(err, results) {
        console. log("Result of functions: ",results);
      // 'results' is now equal to: {one: 1, two: 2, ..., something_else: some_value}
    }
  );


  async.series({
    one: function(callback) { callback('null', 'one'); },
    two: function(callback) { callback('null','two'); },
    //...
    //...
    something_else: function(callback) { callback('null', 'thr'); }
    }, 
    // optional callback
    function(err, results) {
        console. log("Result of functions: ",results);
      // 'results' is now equal to: {one: 1, two: 2, ..., something_else: some_value}
    }
  );
