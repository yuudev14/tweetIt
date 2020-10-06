const express = require('express');
const ensureAuthenticated = require('../setup/ensureAuthenticated');
const User = require('../mongodbModels/user');
const shuffle = require('./methods/shuffle');

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({extended : true}));

route.get('/:id', ensureAuthenticated, (req, res) => {

    res.send(req.params.id);
});

route.get('/user/:id', (req, res) => {
    User.findOne({_id : req.params.id})
        .then(user => {
            res.send(user);
        })
        .catch(err => console.log(err))
});

route.get('/news-feed/:id', (req, res) => {
    let newsfeed = [];
    User.findOne({_id : req.params.id}).lean()
        .then(user =>{
            user.posts.forEach(post =>{
                post.username = user.username
            })
            newsfeed = [...newsfeed, ...user.posts]
            const friends = user.friends.map(friend => {
                return friend.username;
            })
            User.find({username : {$in : friends}}).lean()
                .then(friends => {
                    const friendsPost = friends.map(friend => {
                        friend.posts.forEach(post => {
                            post.username = friend.username;
                        });
                        return friend.posts
                    });
                    friendsPost.forEach(posts => {
                        posts.forEach(post => {  
                            newsfeed = [...newsfeed, post]
                        });
                    });
                    newsfeed = newsfeed.sort((a, b) => new Date(b.date) - new Date(a.date))
                    res.send(newsfeed);
                });
            
            
        });
})

route.post('/addTweet/:id', (req, res) => {
    const {tweet} = req.body;
    console.log(req.param.id)
    User.findOne({_id : req.params.id})
        .then(user => {

            user.posts.unshift({tweet});
            user.save()
                .then(user => res.send(user))
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err))
});

route.get('/friends-suggestion/:id', (req, res) => {
    User.findOne({_id : req.params.id})
        .then(user => {
            const friends = user.friends.map(friend => friend.username);
            const friendRequest = user.friendRequest.map(friend => friend.username)
            User.find({$and : [{_id : {$ne: req.params.id}}, {username : {$nin : [...friends, ...friendRequest]} } ] } )
                .then(users => {
                    
                    res.send(shuffle(users).map(user => {
                        return {
                            username: user.username, _id : user._id
                        }
                    }));
                });

        })
        .catch(err => console.log(err));
    
});

route.post('/add-friend/', (req, res) => {
    const {_id, username, user_id} = req.body;

    User.findOne({_id : user_id})
        .then(user => {
            User.findOne({_id})
            .then(addedUser => {
                addedUser.friendRequest.unshift({_id: user._id, username : user.username});
                addedUser.save()
                .catch(err => console.log(err));
            });
            user.friends.push({_id, username});
            user.save()
                .then(user=> res.send(user))
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));


});

route.post('/acceptFriend/:id',(req, res) => {
    const {username, _id} = req.body;
    console.log(req.body);
    
    User.findOne({_id : req.params.id})
        .then(user => {
            User.findOne({_id})
                .then(acceptedFriend=>{
                    acceptedFriend.friends = acceptedFriend.friends.map(friend => {
                        if(friend._id === req.params.id){
                            friend.accepted = true
                        }
                        return friend
                    });
                    acceptedFriend.save()

                })
                .catch(err => console.log(err));
            user.friends.unshift({username, _id, accepted : true});
            
            user.friendRequest = user.friendRequest.filter(friendRequest => friendRequest._id !== _id);
            user.save()
                .then(user => {res.send(user)})
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));

});

route.post(`/reject/:id`, (req, res) => {
    const {_id} = req.body;
    User.findOne({_id : req.params.id})
        .then(user => {
            User.findOne({_id})
                .then(rejectedFriend => {
                    rejectedFriend.friends = rejectedFriend.friends.filter(friend => friend._id !== req.params.id);
                    rejectedFriend.save()
                        .then(user=>console.log(user));
                });
            user.friendRequest = user.friendRequest.filter(friend => friend._id !== _id)
            user.save()
                .then(user => {res.send(user)})
                .catch(err => console.log(err));
        });
});

route.post('/like/:id', (req, res) => {
    const {_id, username} = req.body;
    User.findOne({_id : req.params.id})
        .then(user => {
            User.findOne({username})
                .then(postUser => {
                    postUser.posts = postUser.posts.map(post =>{
                        if(post._id.toString() === _id){
                            if(post.Likes.find(likes => likes.username === user.username) === undefined){
                                post.Likes.unshift({username : user.username})
                                console.log('hi')
                                
                            }else{     
                                post.Likes = post.Likes.filter(likes => likes.username !== user.username);
                                console.log('no')
                            };
                        };
                        return post;
                    });
                    
                    postUser.save()
                                .then((user) => res.send(user.posts.filter(post => post._id.toString() === _id)[0]))
                                
                                .catch(err => console.log(err));
                    
                });
        });
});

route.post(`/add-comment/:id`, (req, res) => {
    const {_id, comment, username} = req.body;

    User.findOne({_id : req.params.id})
        .then(user => {
            User.findOne({username})
                .then(postUser => {
                    postUser.posts = postUser.posts.map(post => {
                        if(post._id.toString() === _id){
                            post.comments.unshift({username : user.username, comment});
                        };
                        return post
                    });
                    postUser.save()
                    .then((user) => res.send(user.posts.filter(post => post._id.toString() === _id)[0]))
                    .catch(err => console.log(err));
                });
        });

});


module.exports = route;