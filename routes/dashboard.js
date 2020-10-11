const express = require('express');
const ensureAuthenticated = require('../setup/ensureAuthenticated');
const dashboard = require('../controllers/dashboard-controllers');

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({extended : true}));
route.get('/search', dashboard.search);
route.get('/post', dashboard.postFeed);
route.get('/:id', ensureAuthenticated, dashboard.userID);
route.get('/user/:id', dashboard.userInfo);
route.get('/other-user/:username', dashboard.otherUserInfo);
route.get('/news-feed/:id', dashboard.news_feed);
route.post('/addTweet/:id', dashboard.addTweet);
route.get('/friends-suggestion/:id', dashboard.friendSuggestion);
route.post('/add-friend/', dashboard.addFriend);
route.post('/acceptFriend/:id', dashboard.acceptFriend);
route.post(`/reject/:id`, dashboard.rejectFriend);
route.post(`/cancel-request/:id`, dashboard.cancelRequest);
route.post('/unFriend/:id', dashboard.unFriend);
route.post('/like/:id', dashboard.likePost);
route.post(`/add-comment/:id`, dashboard.addCommentPost);
route.get('/notifications/:id', dashboard.getNotification);
route.post('/delete-post/:id', dashboard.deletePost);
route.post('/update-post/:id', dashboard.updatePost);
route.post('/delete-comment/:id', dashboard.deleteComment);
route.post('/update-comment/:id', dashboard.updateComment);
route.post('/editProfile/:id', dashboard.editProfile);



module.exports = route;