const User = require('../mongodbModels/user');
const shuffle = require('../routes/methods/shuffle');
const bcrypt = require('bcrypt');

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

module.exports = {
    addCommentPost,
    updateComment,
    deleteComment
}