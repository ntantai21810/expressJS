const { signedCookies } = require("cookie-parser")

var shortId =  require('shortid');
var db = require('../db');

module.exports = function(req, res, next) {
    if (!req.signedCookies.sessionId) {
        var sessionId = shortId.generate();
        res.cookie('sessionId', sessionId, {
            signed: true
        })

        db.get('sessions').push({
            id: sessionId
        }).write();
    }

    var cartCount = req.signedCookies.cartCount;
    res.locals.cartCount = cartCount;

    next();
}