const express = require('express');
const ensureAuthenticated = require('../setup/ensureAuthenticated');
const User = require('../mongodbModels/user');

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
})

route.post('/addTweet/:id', (req, res) => {
    const {tweet} = req.body;
    console.log(req.param.id)
    User.findOne({_id : req.params.id})
        .then(user => {

            user.posts.unshift({tweet});
            user.save()
                .then(user => res.send(user));
        })
        .catch(err => console.log(err))
})

module.exports = route