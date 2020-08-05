var express = require('express');
var app = express();

var port = 3000;

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', function(req, res) {
    // res.send("<h1>Hello Ryan</h1><a href = '/users'>Users list</a>");
    res.render('index.pug', {
        name: "Nguyen Tan Tai"
    });
})

app.get('/users', function(req, res) {
    // res.send("User list");
    res.render('./users/index', {
        users: [
            { id: 1, name: 'Tai'},
            { id: 2, name: 'Tan'}
        ]
    });
})

app.listen(port, function() {
    console.log("Server start: " + port);
})