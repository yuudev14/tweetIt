const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../mongodbModels/user');


module.exports = (passport) => {
    passport.use(new LocalStrategy((username, password, done) => {
        User.findOne({$or : [{username : username},{email : username}]})
            .then(user => {
                if(!user) return done(null, false, {msg : 'username doesn\'t exist'});
                bcrypt.compare(password, user.password, (err, isMatch) =>{
                    if(err) throw err;
                    if(isMatch) return done(null, user);
                    return done(null, false, {msg : "password doesn't match"});
                })
            })
            .catch(err => console.log(err));

    }));
    passport.serializeUser((user, done) => {
        done(null, user.id)
    });
    passport.deserializeUser((id, done)=>{
        User.findById(id, (err, user)=>{
            if(err) throw err;
            done(null, user)
        })
    })

}