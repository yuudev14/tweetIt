const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    type : {
        type : String,
        required : true
    },
    username : {
        type: String,
        required : true,
    },
    date : {
        type : Date,
        default : Date.now()
    },
    post : {
        type : String,
        required : true
    }
})

module.exports = notificationSchema;