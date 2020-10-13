const User = require('../mongodbModels/user');


const addTweet = (req, res) => {
    const {tweet, image} = req.body;
    if(tweet === '' && image === ''){
        res.send(false);
        
    }else{
        
        User.findOne({_id : req.params.id})
            .then(user => {

                user.posts.unshift({tweet, image});
                user.save()
                    .then(user => res.send(user))
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err))
    }
    
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

module.exports = {
    addTweet,
    likePost,
    deletePost,
    updatePost
}