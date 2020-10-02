const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../mongodbModels/user');
const passport = require('passport');
// const 

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({extended : true}));

route.post('/register', (req, res) => {
    const {username, email, password, retry_password} = req.body;
    let error = {
        err_username : '',
        err_email : '',
        err_password : '',
        err_retry_password : ''
    }
    
    User.findOne({username})
        .then(user => {
            const testUsername = /^[a-zA-Z]+[\w]+/;
            if(!username){
                error.err_username =  'Input username';

            }else{
                error.err_username = user ? 'Username already exist' : !testUsername.test(username) ? 
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
                        if(user) error.err_email = 'Email already exist';
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
                        bcrypt.genSalt(10, (err, salt)=>{
                            if(err) throw err;
                            bcrypt.hash(password, salt, (err, hash) => {
                                if(err) throw err;
                                User.create({username, email, password : hash})
                                    .then(user => res.send(true));
                            })
                        })
                    }else{
                        // User.create({username, email, password});
                        res.send(error);

                    }
                });

        });
    
});

route.post('/log-in', (req, res, next)=>{
    passport.authenticate('local', (err, user, info) => {
        if(err) return next(err);
        if(!user) return res.send(info);
        req.logIn(user, (err) => {
            if(err) return next(err);
            return res.redirect('/dashboard/' + user.id);
        });
    })(req, res, next)

})
module.exports = route