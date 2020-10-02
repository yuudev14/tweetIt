const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    username : {
        type : String
    },
    comment : String,
    date : {
        type : Date,
        default : Date.now()
    }
});

module.exports = commentSchema;