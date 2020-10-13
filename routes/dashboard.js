const express = require('express');
const ensureAuthenticated = require('../setup/ensureAuthenticated');
const dashboard = require('../controllers/dashboard-controllers');
const post = require('../controllers/post');
const comment = require('../controllers/comments');
const friends = require('../controllers/friends');

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({extended : true}));
route.get('/search', dashboard.search);
route.get('/post', dashboard.postFeed);
route.get('/:id', ensureAuthenticated, dashboard.userID);
route.get('/user/:id', dashboard.userInfo);
route.get('/other-user/:username', dashboard.otherUserInfo);
route.get('/news-feed/:id', dashboard.news_feed);
route.post('/addTweet/:id', post.addTweet);
route.get('/friends-suggestion/:id', dashboard.friendSuggestion);
route.post('/add-friend/', friends.addFriend);
route.post('/acceptFriend/:id', friends.acceptFriend);
route.post(`/reject/:id`, friends.rejectFriend);
route.post(`/cancel-request/:id`, friends.cancelRequest);
route.post('/unFriend/:id', friends.unFriend);
route.post('/like/:id', post.likePost);
route.post(`/add-comment/:id`, comment.addCommentPost);
route.get('/notifications/:id', dashboard.getNotification);
route.post('/delete-post/:id', post.deletePost);
route.post('/update-post/:id', post.updatePost);
route.post('/delete-comment/:id', comment.deleteComment);
route.post('/update-comment/:id', comment.updateComment);
route.post('/editProfile/:id', dashboard.editProfile);
route.post('/change-profile-pic/:id', dashboard.changeProfilePic);
route.post('/change-cover-pic/:id', dashboard.changeCoverPic);



module.exports = route;