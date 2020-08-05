var express = require('express');
var app = express();

var port = 3000;

var users = [
    { id: 1, name: 'Tai'},
    { id: 2, name: 'Tan'}
]

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', function(req, res) {
    res.render('index.pug', {
        name: "Nguyen Tan Tai"
    });
})

app.get('/users', function(req, res) {
    res.render('./users/index', {
        users: users
    });
})

app.get('/users/search', function(req, res) {
    var name = req.query.name;
    var matchListUsers = users.filter(function(user) {
        return user.name.toLowerCase().indexOf(name.toLowerCase()) !== -1;
    })
    res.render('./users/index', {
        name: name,
        users: matchListUsers
    })
})

app.listen(port, function() {
    console.log("Server start: " + port);
})