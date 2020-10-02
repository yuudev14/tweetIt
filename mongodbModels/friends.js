const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FriendsSchema = new Schema({
    username : {
        type : String,
        required : true,
    },
    date : {
        type : Date,
        default : Date.now()
    },
    accepted : {
        type : Boolean,
        default : false
    }
})

module.exports = FriendsSchema;