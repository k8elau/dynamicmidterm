var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//used for sluggifying
var URLSlugs = require('mongoose-url-slugs');

//all the data
var showSchema = new Schema({
  show_name:  String,
  //movie is False if they are submitting a show/series?
  //movie: Boolean,
  //would this be an array??? ask jason about the embedding thing
  genre: [{
      type: String
  }],
  //genre: [String],
  //actors are inputted kind of like tags
  //actors: [String],
  year_released: Number,
  description: String,
  imageFilename: String,
  //date is when the recommendation was posted? (necessary or nah)
  date: { 
    type: Date, 
    default: Date.now 
  },
  /*
  comments: [{ 
    body: String, 
    date: Date 
  }],
  */
  meta: {
    votes: Number
  }
});

//slugifies weird names (for example, ones with spaces in between them)
//so Watson Lau = watson-lau to prevent weird URLs
showSchema.plugin(URLSlugs('show_name', {field: 'slug'}));

var Show = mongoose.model('Show', showSchema);

// when we require this file, we get Pet model
module.exports = Show;
