var express = require('express');
var app = express();
var low = require('lowdb')
var FileSync = require('lowdb/adapters/FileSync')

var adapter = new FileSync('db.json')
var db = low(adapter)

// Set some defaults (required if your JSON file is empty)
db.defaults({ users: [] })
  .write()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

var port = 3000;

var users = [
    { id: 1, name: 'Tai'},
    { id: 2, name: 'Tan'},
    { id: 3, name: 'Nguyen'}
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
        users: db.get('users').value()
    });
})

app.get('/users/search', function(req, res) {
    var name = req.query.name;
    var matchListUsers = db.get('users').value().filter(function(user) {
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
    db.get('users').push(req.body).write();
    res.redirect('/users');
})

app.listen(port, function() {
    console.log("Server start: " + port);
})