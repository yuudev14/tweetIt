const mongoose = require('mongoose');
const postSchema = require('./post');
const FriendsSchema = require('./friends');
const notificationSchema = require('./notification');
const FriendRequestSchema = require('./friendRequest');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username : {
        type : String,
        required : true
    }, 
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now()
    },
    posts : [postSchema],
    friends : [FriendsSchema],
    friendRequest : [FriendRequestSchema],
    notifications : [notificationSchema],
    profilePic : {
        type : String,
        default : ''
    },
    coverPic : {
        type : String,
        default : ''
    }
});

const userModel = mongoose.model('user', UserSchema);

module.exports = userModel;
