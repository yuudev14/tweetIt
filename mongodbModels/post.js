const mongoose = require('mongoose');
const commentSchema = require('./comments');
const LikeSchema = require('./likes');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    tweet : {
        type : String,
        required : true
    },
    image : {
        type : String,
    },
    comments : [commentSchema],
    Likes : [LikeSchema],
    date : {
        type : Date,
        default : Date.now()
    }
});

module.exports = postSchema;