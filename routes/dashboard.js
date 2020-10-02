const express = require('express');
const ensureAuthenticated = require('../setup/ensureAuthenticated')

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({extended : true}));

route.get('/:id', ensureAuthenticated, (req, res) => {

    res.send(req.params.id);
});

module.exports = route