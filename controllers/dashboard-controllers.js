const User = require('../mongodbModels/user');
const shuffle = require('../routes/methods/shuffle');
const bcrypt = require('bcrypt');

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
        .catch(err => res.send('no user'));
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






const getNotification = (req, res) => {
    User.findOne({_id : req.params.id})
        .then(user => {
            res.send(user.notifications);
        });
}




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

const editProfile = (req, res) => {
    const {username, email, password, retry_password} = req.body;
    let error = {
        err_username : '',
        err_email : '',
        err_password : '',
        err_retry_password : ''
    }
    User.findOne({_id : req.params.id})
        .then(current => {
            User.findOne({username})
            .then(user => {
                const testUsername = /^[a-zA-Z]+[\w]+/;
                if(!username){
                    error.err_username =  'Input username';

                }else{
                    error.err_username = user && user._id.toString() !== current._id.toString() ? 'Username already exist' : !testUsername.test(username) ? 
                                    'Username shouldn\'t have space, symbols and number in the first' : 
                                    username.length < 7 ? 'Username should have atleast 7 characters' : '';
                }
                
                User.findOne({email})
                    .then(user => {
                        if(!email){
                            error.err_email = 'input an email';
                        }else{
                            const check = /([\w.-\_]+)[@][\w]{2,}([.]?[\w]{2,})?([.][\w]{2,})?/;
                            if(!check.test(email)) error.err_email = "not a valid email";
                            if(user && user._id.toString() !== current._id.toString()) error.err_email = 'Email already exist';
                        }
                        if(!password){
                            error.err_password = 'input password';
                        }else{
                            if(password.length < 8) error.err_password = 'Password should have atleast 8 characters';
                        }
                        if(!retry_password){
                            error.err_retry_password = 'input retry password';
                        }else{
                            if(password !== retry_password) error.err_retry_password ='retry password does not match password';
                        }
                        
                        
                        if(Object.values(error).every(res => res === '')){
                            User.find({_id : {$ne : req.params.id}})
                                .then(all => {
                                    all.forEach(all => {
                                        all.friends = all.friends.map(friend => {
                                            if(friend.username === current.username){
                                                friend.username = username;
                                                console.log(username)
                                                console.log(friend.username)
                                            }
                                            return friend;
                                        });
                                        all.posts = all.posts.map(post => {
                                            post.comments = post.comments.map(comment => {
                                                if(comment.username === current.username){
                                                    comment.username = username;
                                                };
                                                return comment;

                                            })
                                            return post;

                                            
                                        });
                                        all.friendRequest = all.friendRequest.map(req => {
                                            if(req.username === current.username){
                                                req.username = username;
                                            };
                                            return req;
                                        });
                                        all.notifications = all.notifications.map(not => {
                                            if(not.username === current.username){
                                                not.username = username;
                                            };
                                            return not;
                                        })
                                        
                                        all.save();
                                        
                                    });
                            
                                    
                                })
                                .catch(err => console.log(err))
                            bcrypt.genSalt(10, (err, salt)=>{
                                if(err) throw err;
                                bcrypt.hash(password, salt, (err, hash) => {
                                    if(err) throw err; 
                                    current.username = username;
                                    current.password = hash;
                                    current.email = email;
                                    current.save()
                                        .then(user => {
                                            
                                            res.send(user)
                                        });
                                })
                            })
                        }else{
                            // User.create({username, email, password});
                            res.send(error);

                        }
                    });

            });

        });
};

const changeProfilePic = (req, res) => {
    User.findOne({_id : req.params.id})
        .then(user => {
            console.log(req.body);
            user.profilePic = req.body.imageUrl;
            user.save()
                .then(user => res.send(user));
        })
}

const changeCoverPic = (req, res) => {
    User.findOne({_id : req.params.id})
        .then(user => {
            console.log(req.body);
            user.coverPic = req.body.imageUrl;
            user.save()
                .then(user => res.send(user));
        })
}




module.exports = {
    userID,
    userInfo,
    otherUserInfo,
    news_feed,
    friendSuggestion,
    getNotification,
    search,
    postFeed,
    editProfile,
    changeProfilePic,
    changeCoverPic
}