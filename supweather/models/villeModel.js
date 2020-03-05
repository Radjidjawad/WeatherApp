var mongoose = require("mongoose");

var villesSchema = new mongoose.Schema({
    villename : {
        type:String,
        required:true
    },
    temperature: {
        type:Number,
        required:true
    },
    etat : {
        type:String,
        required:true
    }
});

module.exports = mongoose.model('ville', villesSchema);