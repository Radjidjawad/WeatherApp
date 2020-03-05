var express = require('express');
var router = express.Router();
var check = require("../middlewares/check");
var user = require("../models/usersModel");


/* GET home page. */
router.get('/', check.loginIndex, function(req, res, next) {
  if ( req.query.error ){
    var errorMsg = "";
    switch( req.query.error ){
      case "1" : errorMsg = "Login/Password error"; break;
    }
    res.render('index', {viewErroMsg:errorMsg});
  } else 
      res.render('index');
});

router.post("/login", function(req, res){
  session = req.session;

  user.findOne({login: req.body.login ,password:req.body.password}, function(err, data){
    if ( data ){
      req.session.user = data.name;
      res.redirect("home/");
    } else {
      res.redirect("/?error=1");
    }
  })

  /*
  if ( req.body.login == "admin" && req.body.password == "admin" ){
    session.user = "admin";
    res.redirect("home/");
  }else{
    res.redirect("/");
  }*/
});

router.get("/logout", function(req, res){
  session = req.session;
  session.destroy(function(err){
    res.redirect("/");
  });
});

router.get('/signin', function(req, res){
  if ( req.query.error ){
    var errorMsg = "";
    switch( req.query.error ){
      case "2" : errorMsg = "All fields are required"; break;
      case "3" : errorMsg = "Password matching error"; break;
      case "4" : errorMsg = "Login already exists"; break;
    }
    res.render('signin', {viewErroMsg:errorMsg});
  } else 
    res.render('signin');
});

router.post('/signinconfirm', function(req, res){
  //1- CHECK REQUIRED FIELDS
  if ( req.body.name && req.body.login && req.body.password ){
    //2- CHECK PASSWORD MATCH
    if ( req.body.password == req.body.cpassword ){
      //3- CHECK IF USER LOGIN EXISTS
      user.findOne({login:req.body.login}, function(err, data){
        //IF EXISTS SHOW ERROR
        if ( data )
          res.redirect("/signin?error=4");
        //IF NOT, SAVE DATA 
        else {
          var newUser = new user({
            name : req.body.name,
            login : req.body.login,
            password : req.body.password
          });
          newUser.save();
          res.send("You are now signed in <a href='/'>Go to login</a>");
        }
      });
    } else res.redirect("/signin?error=3");
  } else res.redirect("/signin?error=2");
});

router.post('/cityAdd', function(req, res){
  
});


module.exports = router;
