const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    about : {
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
    post_id : {
        type : String,
        
    }
})

module.exports = notificationSchema;