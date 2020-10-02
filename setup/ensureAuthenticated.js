
const ensureAuthenticated = (req, res, next) => {
    if(req.isAuthenticated){
        return next()
    }
    return res.send(false);
}
module.exports = ensureAuthenticated