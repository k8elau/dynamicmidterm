//everything here is accessed with shows/_____ (eg localhost:8888/shows/add) because the file name is shows.js

var express = require('express');
var router = express.Router();

var path = require('path');
//used for image
var multer = require('multer');

//creates the uploads folder for you
var uploadPath = path.join(__dirname, '../public/uploads');
//puts stuff getting uploaded in public folder
var upload = multer({ dest: uploadPath});
var Show = require('../models/show');

//when you go to 'shows/add', it renders new-pet.handlebars view
router.get('/add', function(req, res){
    res.render('new-show');
});


//if you're posting something on the /add (aka pressing submit button), this thing happens
router.post('/add', upload.single('image'), function(req,res){
   var show = new Show({
      show_name: req.body.show_name,
      //ask jason about getting arrays (the stuff he talked about in slack)?
      genre: req.body.genre,
      year_released: req.body.year_released,
      imageFilename:req.file.filename,
      description:req.body.description
   }); 
   
    show.save(function(err, data){
        //if there's an error in saving the shows do the redirect
        if(err){
            //returns so nothing else happens
            return res.redirect(303, '/shows');
        }
        //for redirect you use msg number 303
        //this redirects to the shows VIEWS page
        return res.redirect(303, '/shows');
    });
});

//this is what the main page of the website would be 
router.get('/', function(req, res){
    var query = {};
    //if you did something like localhost:8888/pets?animal=fish, fish would be the query
    if (req.query.showName){
        query = {showName: req.query.animal};
    }
    
    Show.find(query, function(err, data){
        var pageData = {
            shows: data
        };
        //renders the pets view, and then passes in pets array from the database(?)
        //render the PETS VIEW with pageData, which has the array of pets
        res.render('shows', pageData);
    });
});


//this would be an individual pet info page, because all pets have different slugs
router.get('/:show_name', function(req, res){
    Show.findOne({slug: req.params.show_name}, function(err, data){
        var pageData = {
            shows: [data]
        };
        //you could also render a more detailed page (view) about that pet
        //res.send(pageData);
        res.render('show-slug', pageData);
    });
});

module.exports = router;

