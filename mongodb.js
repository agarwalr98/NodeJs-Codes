//Import module
var mongoose = require('mongoose');
//Set up a default connection
var mongodb = 'mongodb://127.0.0.1/mongodb_firstdb';
mongoose.connect(mongodb, {useNewUrlParser:true, useUnifiedTopology: true});

//defualt db connection to mongo
var db = mongoose.connection

db.on('error', console.error.bind(console, "mongodb connection error!"));

const schemaOptions = {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};
//Define schema and models
var schema = mongoose.Schema
var someschema = new schema({
    Name: String,
    age: Number 
}, {timestamps: true});
// Schema methods
someschema.methods.GetName =function(){
    return this.Name;
};


var somemodel= mongoose.model('somemodel', someschema );

//model instance is a document of collection.
var first_modelinstance = new somemodel({Name: 'timestampTRUE',age:22});

first_modelinstance.save(function(err)
{
    if (err)
    {
        
        // return handleError(err);
        throw (err);
        // throw new Error("SOmething happened!");
    }
    else{
        console.log("document is saved in the somemodel.");
    }
});

somemodel.find({'Name': 'timestampTRUE'} , function(err, results){
    if (err)
    {
        throw (err);
    }
    else{
        console.log("Results are: ", results[0]  ); //call the function declared within schema
    }
}).sort({age: -1}).limit(3);


// Relational model
// Example; A author can have many stories but a story will have one author.
// 
var authorSchema = schema({
    name    : String, 
    stories : [{ type: schema.Types.ObjectId, ref: 'Story' }]
  });
  
  var storySchema = schema({
    author : { type: schema.Types.ObjectId, ref: 'Author' },
    title    : String
  });
  
  var Story  = mongoose.model('Story', storySchema);
  var Author = mongoose.model('Author', authorSchema);

  var bob = new Author({ name: 'Steve Smith' });

bob.save(function (err) {
  if (err) throw err;

  //Bob now exists, so lets create a story
  var story = new Story({
    title: "Wings of Fire",
    author: bob._id    // assign the _id from the our author Bob. This ID is created by default!
  });

  story.save(function (err) {
    if (err) throw err;
    // Bob now has his story
  });
});

// Find the author for a story with title=... 
Story.findOne({title: 'Bob goes sledding'}, function(err, story)
{
    if (err)
    {throw err}
    else
    {
        console.log("The author name for story %s is %s",story.title, story.author.name);
    }
}).populate ('author');

// Find the stories for a particular author =.. 
var authorid="" ;
async function Myfunction(){ Author.findOne({name: 'Steve Smith'}, '_id', function(err, result){
    if (err)
    {return "err"; }
    else{
        // console.log("All documents for Steve Smith ", result );
        authorid =result;
        // FindStories(authorid)
        console.log("Athor id with name='Steve Smith' is",authorid );
        return "Success";
    }
}) };

const promise1 = new Promise((resolve, reject) =>{
    Author.findOne({name: 'Steve Smith'}, '_id', function(err, result){
        if (err)
        {reject(); }
        else{
            // console.log("All documents for Steve Smith ", result );
            authorid =result;
            // FindStories(authorid)
            console.log("Athor id with name='Steve Smith' is",authorid );
            resolve(authorid);
        }
    }) 
    console.log("Here promise1 .");
    // resolve(authorid);
})

setTimeout(()=>{
    console.log("GLobal Scope: ", authorid);
}, 1000);
const promise2 = promise1.then(function(author)  {
console.log("Argument to second promise: ", author); 
Story.findOne({author: author._id}, function(err, stories)
{
    
    if (err){throw err; }
    else
    {
        console.log(author)  ;
        console.log("Stories are : ", stories);
    }
})} ); 

