const User = require('../mongodbModels/user');

const addFriend = (req, res) => {
    const {_id, username, user_id} = req.body;

    User.findOne({_id : user_id})
        .then(user => {
            const inFriendReq = user.friendRequest.some(friend => friend.username === username);
            const inFriends = user.friends.some(friend => friend.username === username);
            if(!inFriendReq && !inFriends){
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
            }else{
                res.send(user);
            }
            
        })
        .catch(err => console.log(err));


}

const acceptFriend = (req, res) => {
    const {username, _id} = req.body;
    console.log(req.body);
    
    User.findOne({_id : req.params.id})
        .then(user => {
            // if(user.friendRequest.some(friend => friend.username === username)){
            //     res.send('already a friend')
            // }else{
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

            // }
            
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

const cancelRequest = (req, res) => {
    const {username} = req.body;
    User.findOne({_id : req.params.id})
        .then(user => {
            User.findOne({username})
                .then(otherUser => {
                    otherUser.friendRequest = otherUser.friendRequest.filter(request => request.username !== user.username);
                    otherUser.save()
                });
            user.friends = user.friends.filter(friends => friends.username !== username);
            user.save()
                .then(user => res.send(user))
                .catch(err => console.log(err));
        })

}

const unFriend = (req, res) => {
    const {username} = req.body;
    console.log(req.body);
    User.findOne({_id : req.params.id})
        .then(user => {
            User.findOne({username})
                .then(otherUser => {
                    otherUser.friends = otherUser.friends.filter(request => request.username !== user.username);
                    otherUser.save()
                });
            user.friends = user.friends.filter(friends => friends.username !== username);
            user.save()
                .then(user => res.send(user))
                .catch(err => console.log(err));
        })
}

module.exports = {
    addFriend,
    acceptFriend,
    rejectFriend,
    cancelRequest,
    unFriend
}