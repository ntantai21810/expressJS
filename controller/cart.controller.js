var db = require('../db');
const { toPlainObject } = require('../db');

module.exports.addToCart = function(req, res, next) {
    var productId = req.params.productId;
    var sessionId = req.signedCookies.sessionId;

    if (!sessionId) {
        res.redirect('/products');
        return;
    }

    var count = db.get('sessions')
    .find({ id: sessionId })
    .get('cart.' + productId, 0)
    .value();

    db.get('sessions')
    .find({ id: sessionId })
    .set('cart.' + productId, count + 1)
    .write();

    var sessionObject = db.get('sessions').find().value();
    var cartObject = sessionObject["cart"];
    var totalProducts = 0;

    for (var x in cartObject) {
        totalProducts += parseInt(cartObject[x]);
    }

    res.cookie('cartCount', totalProducts, {
        signed: true
    })

    res.redirect('back');
}