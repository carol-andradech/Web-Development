const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost:27017/fruitsDB");

const fruitSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: [true, "Please check your data entry, no name specified"]
  },
  rating:{
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit ({
  name: "Apple",
  rating: 7,
  review: "Pretty solid as a fruit."
});

//fruit.save();

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const pineapple = new Fruit({
  name: "Pineapple",
  score: 9,
  review: "Great fruit"
});

// pineapple.save();

const mango = new Fruit({
  name: "Mango",
  score: 6,
  review: "Decent fruit."
});

// mango.save();

Person.updateOne({name: "Jhon"}, {favoriteFruit: mango}, function(err){
  if(err){
    console.log(err);
  } else{
    console.log("Successfully updated the document");
  }
});

const person = new Person ({
  name: "Amy",
  age: 12,
  favoriteFruit: pineapple
});

// person.save();

// const kiwi = new Fruit ({
//   name: "Kiwi",
//   rating: 10,
//   review: "The best fruit."
// });
//
// const orange = new Fruit ({
//   name: "Orange",
//   rating: 4,
//   review: "Too sour from me."
// });
//
// const banana = new Fruit ({
//   name: "Banana",
//   rating: 3,
//   review: "Weird texture."
// });

// Fruit.insertMany([kiwi, orange, banana], function(err){
//   if(err){
//     console.log(err);
//   } else{
//     console.log("Success");
//   };
// });


Fruit.find(function(err, fruits){
  if(err){
    console.log(err);
  } else {

    mongoose.connection.close();

    fruits.forEach(function(fruit){
      console.log(fruit.name);
    });
  }

});

// Fruit.updateOne({_id: "608f1a137cd823322cc4103a"}, {name: "Peach"}, function(err){
//   if(err){
//     console.log(err);
//   } else{
//     console.log("Successfully updated the document. ");
//   }
// });
//
// Fruit.deleteOne({name: "Peach"}, function(err){
//   if(err){
//     console.log(err);
//   } else{
//     console.log("Successfully deleted the document. ");
//   }
// });
//
// Person.deleteMany({name: "Jhon"}, function(err){
//   if(err){
//     console.log(err);
//   } else{
//     console.log("Successfully deleted all the documents. ");
//   }
// });


const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  // Insert some documents
  collection.insertMany([
    {
    name: 'Apple',
    score: 8,
    review: "Great fruit"
  },
  {
    name: "Orange",
    score: 6,
    review: "Kinda sour"
  },
  {
    name: "Banana",
    score: 9,
    review: "Great stuff!"
  }
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
};

const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  // Find some documents
  collection.find({}).toArray(function(err, fruits) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(fruits)
    callback(fruits);
  });
}
