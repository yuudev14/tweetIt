const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LikeSchema = new mongoose.Schema({
    username : String,
    date : {
        type : Date,
        default : Date.now()
    }
});

module.exports = LikeSchema