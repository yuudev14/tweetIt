const { post } = require('../mongodbModels/post');
const User = require('../mongodbModels/user');
const shuffle = require('../routes/methods/shuffle');

const userID =  (req, res) => {
    res.send(req.params.id);
}

const userInfo =  (req, res) => {
    User.findOne({_id : req.params.id})
        .then(user => {
            res.send(user);
        })
        .catch(err => console.log(err))
}

const otherUserInfo = (req, res) => {
    User.findOne({username : req.params.username})
        .then(user => {
            res.send(user);
        })
        .catch(err => console.log(err))
}

const news_feed = (req, res) => {
    let newsfeed = [];
    User.findOne({_id : req.params.id}).lean()
        .then(user =>{
            user.posts.forEach(post =>{
                post.username = user.username
            })
            newsfeed = [...newsfeed, ...user.posts]
            const friends = user.friends.filter(friend => friend.accepted === true).map(friend => {
                return friend.username;
            });
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
}

const addTweet = (req, res) => {
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
}

const friendSuggestion = (req, res) => {
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
    
}

const addFriend = (req, res) => {
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


}

const acceptFriend = (req, res) => {
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
                    acceptedFriend.notifications.unshift({about : 'accepted your friend request', username: user.username});
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

}

const rejectFriend = (req, res) => {
    const {_id} = req.body;
    User.findOne({_id : req.params.id})
        .then(user => {
            User.findOne({_id})
                .then(rejectedFriend => {
                    rejectedFriend.friends = rejectedFriend.friends.filter(friend => friend._id !== req.params.id);
                    rejectedFriend.save()
                        
                });
            user.friendRequest = user.friendRequest.filter(friend => friend._id !== _id)
            user.save()
                .then(user => {res.send(user)})
                .catch(err => console.log(err));
        });
}

const likePost = (req, res) => {
    const {_id, username} = req.body;
    User.findOne({_id : req.params.id})
        .then(user => {
            User.findOne({username})
                .then(postUser => {
                    postUser.posts = postUser.posts.map(post =>{
                        if(post._id.toString() === _id){
                            if(post.Likes.find(likes => likes.username === user.username) === undefined){
                                post.Likes.unshift({username : user.username});
                              
                                
                            }else{     
                                post.Likes = post.Likes.filter(likes => likes.username !== user.username);
                                
                            };
                        };
                        return post;
                    });
                    if(username !== user.username){
                        postUser.notifications.unshift({about : 'like your post', username: user.username, post_id : _id});

                    }
                    
                    
                    postUser.save()
                                .then((user) => res.send(user.posts.filter(post => post._id.toString() === _id)[0]))
                                
                                .catch(err => console.log(err));
                    
                });
        });
}
 const addCommentPost = (req, res) => {
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
                    if(username !== user.username){
                        postUser.notifications.unshift({about : 'commented on your post', username: user.username, post_id : _id});

                    }
                    
                    postUser.save()
                        .then((user) => res.send(user.posts.filter(post => post._id.toString() === _id)[0]))
                        .catch(err => console.log(err));
                });
        });

}

const getNotification = (req, res) => {
    User.findOne({_id : req.params.id})
        .then(user => {
            res.send(user.notifications);
        });
}
const deletePost = (req, res) => {
    
    const {post_id} = req.body;
    const id = req.params.id;
    User.findOne({_id : id})
        .then(user => {
            user.posts = user.posts.filter(post => post._id.toString() !== post_id);
            user.save()
                .then(() => res.redirect(`/dashboard/user/${id}`));
        });
};

const updatePost = (req, res) => {
    
    const {post_id, tweet} = req.body;
    const id = req.params.id;
    User.findOne({_id : id})
        .then(user => {
            user.posts = user.posts.map(post => {
                if(post._id.toString() === post_id){
                    post.tweet = tweet
                }
                return post;
            });
            user.save()
                .then((user) => res.send(user.posts.filter(post => post._id.toString() === post_id)[0]))
        });
};

const updateComment = (req, res) => {
    const {post_id, comment_id, username, updatedComment} = req.body;
    const id = req.params.id;
    console.log(req.body);
    User.findOne({_id : id})
        .then(user => {
            User.findOne({username})
                .then(postUser => {
                    postUser.posts = postUser.posts.map(post => {
                       if(post._id.toString() === post_id){
                           post.comments = post.comments.map(comment => {
                               if(comment._id.toString() === comment_id){
                                   comment.comment = updatedComment;
                               }
                               return comment;
                            });
                       }
                       return post
                    });
                    
                    postUser.save()
                        .then((user) => res.send(user.posts.filter(post => post._id.toString() === post_id)[0]))
                        .catch(err => console.log(err));
                })
            
        });
};

const deleteComment = (req, res) => {
    const {post_id, comment_id, username} = req.body;
    const id = req.params.id;
    User.findOne({_id : id})
        .then(user => {
            User.findOne({username})
                .then(postUser => {
                    postUser.posts = postUser.posts.map(post => {
                       if(post._id.toString() === post_id){
                           post.comments = post.comments.filter(comment => comment._id.toString() !== comment_id);
                       }
                       return post
                    });
                    
                    postUser.save()
                        .then((user) => res.send(user.posts.filter(post => post._id.toString() === post_id)[0]))
                        .catch(err => console.log(err));
                })
            
        });
    
};

const search = (req, res) => {
    const {search} = req.query;
    User.find({})
        .then(users => {
            users = users.filter(user => user.username.startsWith(search));
            res.send(users);
        });

};

const postFeed = (req, res) => {
    const {username, post_id} = req.query;
    User.findOne({username}).lean()
        .then(user=>{
            user.posts = user.posts.filter(post => post._id.toString() === post_id);
            user.posts = user.posts.map(post => {
                post.username = username;
                return post;
            })

            res.send(user.posts);
        })
        .catch(err => res.send(false))
};

module.exports = {
    userID,
    userInfo,
    otherUserInfo,
    news_feed,
    addTweet,
    friendSuggestion,
    addFriend,
    acceptFriend,
    rejectFriend,
    likePost,
    addCommentPost,
    getNotification,
    deletePost,
    deleteComment,
    updatePost,
    updateComment,
    search,
    postFeed,
}