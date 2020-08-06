var express = require('express');

var db = require('./db.json')
var userRoutes = require('./routes/user.route');

var port = 3000;

var app = express();

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', function(req, res) {
    res.render('index.pug', {
        name: "Nguyen Tan Tai"
    });
})

app.use('/users', userRoutes);

app.listen(port, function() {
    console.log("Server start: " + port);
})