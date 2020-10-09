const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../mongodbModels/user');
const passport = require('passport');
const authentication = require('../controllers/authentication-controller');

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({extended : true}));

route.post('/register',authentication.register);

route.post('/log-in', authentication.login);

route.get('/log-out', authentication.logout);

module.exports = route