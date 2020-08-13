require('dotenv').config();

var express = require('express');

var db = require('./db.json')
var userRoutes = require('./routes/user.route');
var userAuth = require('./routes/auth.route');
var productsRouter = require('./routes/products.route');
var cartRoute = require('./routes/cart.route');
var cookieParser = require('cookie-parser');

console.log(process.env.SESSION_SECRET);

var authMiddleWare = require('./middleware/auth.middleware');
var sessionMiddleWare = require('./middleware/session.middleware');

var port = 3000;

var app = express();

app.set('views', './views');
app.set('view engine', 'pug');

app.use(cookieParser(process.env.SESSION_SECRET));

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(sessionMiddleWare);

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.render('index.pug', {
        name: "Nguyen Tan Tai"
    });
})

app.use('/users', authMiddleWare.requireAuth, userRoutes);
app.use('/auth', userAuth);
app.use('/products', productsRouter);
app.use('/cart', cartRoute);

app.listen(port, function() {
    console.log("Server start: " + port)
})