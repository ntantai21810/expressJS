var db = require('../db');

module.exports.requireAuth = function(req, res, next) {
    if (!req.cookies) {
        res.redirect('/auth/login');
        return;
    }
    
    var user = db.get('users').find({ id: req.cookies.userId }).value();

    if (!user) {
        res.redirect('/auth/login');
        return;
    }

    next();
}