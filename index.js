var express = require('express');
var app = express();

var port = 3000;

app.get('/', function(request, response) {
    response.send("<h1>Hello Ryan</h1>");
})

app.get('/users', function(request, response) {
    response.send("User list");
})

app.listen(port, function() {
    console.log("Server start: " + port);
})