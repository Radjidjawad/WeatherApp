var express = require('express');
var router = express.Router();
//ImPORTING USERS MODEL
var user = require("../models/usersModel");

router.get('/save', function(req, res, next) {
    //CREATE A NEW USER OBJECT
    var newUser = new user({
        name:"HELLO",
        login:"tom@supinfo.com",
        password:"123456"
    });
    //USE 'save' FUNCTION TO SAVE DATA INTO DATABASE
    newUser.save();
    res.send("Done !");
});

router.get('/selectall', function(req, res){
    user.find(function(err, data){
        res.send(data);
    }).sort({name:-1}).limit(1);
});

router.get('/select/:name', function(req, res){
    user.findOne({name:req.params.name}, function(err, data){
        res.send(data);
    });
});

router.get('/selectById', function(req, res){
    user.findById('5dce82bd9a7ed9ba94a82484', function(err, data){
        res.send(data);
    });
});

router.get('/delete/:name', function(req, res){
    user.deleteOne({name:req.params.name}, function(err, data){
        res.send("Done !");
    });
});

router.get('/update/:name', function(req, res){
    user.updateOne({name:req.params.name}, {password:'newpassword'}, function(err, data){
        res.send(data);
    });
});

router.get('/createform', function(req, res){
    res.render('test');
});

router.post('/create', function(req, res){

    var newUser = new user({
        name:req.body.name,
        login:req.body.login,
        password:req.body.password
    });

    newUser.save();

    res.send("User created");

});

module.exports = router;
