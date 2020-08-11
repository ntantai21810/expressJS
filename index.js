require('dotenv').config();

var express = require('express');

var db = require('./db.json')
var userRoutes = require('./routes/user.route');
var userAuth = require('./routes/auth.route');
var cookieParser = require('cookie-parser');

console.log(process.env.SESSION_SECRET);

var authMiddleWare = require('./middleware/auth.middleware');

var port = 3000;

var app = express();

app.set('views', './views');
app.set('view engine', 'pug');

app.use(cookieParser(process.env.SESSION_SECRET));

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.use(express.static('public'));

app.get('/', function(req, res) {
    res.render('index.pug', {
        name: "Nguyen Tan Tai"
    });
})

app.use('/users', authMiddleWare.requireAuth, userRoutes);
app.use('/auth', userAuth);

app.listen(port, function() {
    console.log("Server start: " + port)
})