var express = require('express');
var app = express();

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

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

app.get('/users/create', function(req, res) {
    res.render('./users/create');
})

app.post('/users/create', function(req, res) {
    users.push(req.body);
    res.redirect('/users');
})

app.listen(port, function() {
    console.log("Server start: " + port);
})