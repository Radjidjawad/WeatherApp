var express = require('express');
var router = express.Router();
var check = require("../middlewares/check");
var ville = require("../models/villeModel");

var user = require("../models/usersModel");


/*function checkLogin(req, res, next){
  session = req.session;
  if ( session.user != null ) next();
  else res.redirect("/");
}*/

/*
checkLogin = (req, res, next) =>{
  session = req.session;
  if ( session.user != null ) next();
  else res.redirect("/");
}*/

//router.use(checkLogin);

/* GET home page. */
router.get('/', check.loginHome, function(req, res, next) {
   var session = req.session;
    res.render('home/index', {
      userName: session.user
    });
});

router.get('/profile', check.loginHome, function(req, res, next) {
    res.render('home/profile');
});
router.get("/cityAdd",function(req,res,next){
  res.render("cityadd");
});

const request = require('request');
router.get("/save/:ville",  function(req, res){
	var villee = req.params.ville;
  console.log(villee)
  request('http://api.openweathermap.org/data/2.5/weather?q='+villee+'&APPID=e7a1bbd88fc3dd213f775e602b2f7da9&units=metric', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
    
  //console.log(body);
  
  var newVille = new ville({
      villename : villee,
      temperature: body['main'].temp,
      etat : body['weather'][0].main
  });
  
  newVille.save();
  
  
 });
 res.send("Ville sauvegarde dans la base de donnee");
});

router.get("/afficher",  function(req, res){
	djawad = []
  ville.find({},  function(err,  data){
      for(i = 0;  i < data.length;  i ++){
        djawad.push(data[i]);
      }
    res.render("home/afficher",  {djadja : djawad});
  });
});

router.get('/:villename/delete',  function(req,  res){
  ville.findOneAndRemove({villename: req.params.villename}, 
  function(err, data){
      console.log(data)
    if (err) res.json(err);
    else res.redirect("/home/afficher")
  });
});
module.exports = router;
