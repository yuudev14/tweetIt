const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FriendRequestSchema = new Schema({
    username : {
        type : String,
        required : true,
    },
    _id : {
        type : String,
        required : true,
    },
    date : {
        type : Date,
        default : Date.now()
    }
})

module.exports = FriendRequestSchema;