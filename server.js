const express = require('express');
const mongoose = require('mongoose');
const app = express();
const mongodb = 'mongodb://localhost/tweetit';
const session = require('express-session');
const passport = require('passport');

mongoose.Promise = global.Promise;



mongoose.connect(mongodb,  { useUnifiedTopology: true, useNewUrlParser: true  })
    .then(()=> console.log('connected to database'))
    .catch((err)=> console.log(err));
const PORT = process.env.PORT || 4000;

require('./setup/passport')(passport);
app.use(session({
    secret : 'cat',
    resave : true,
    saveUninitialized : true,

}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/authentication', require('./routes/authentication'));
app.use('/dashboard', require('./routes/dashboard'));

app.listen(PORT, () => console.log(`connected to posrt ${PORT}`))