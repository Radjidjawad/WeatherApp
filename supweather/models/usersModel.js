var mongoose = require("mongoose");

var usersSchema = new mongoose.Schema({
    name : {
        type:String,
        required:true
    },
    login: {
        type:String,
        required:true
    },
    password : {
        type:String,
        required:true
    }
});

module.exports = mongoose.model('users', usersSchema);