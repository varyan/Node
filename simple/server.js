var express = require('express');

var app = express();

app.get('/', function (req, res) {
   res.sendfile('index.html');
});

app.listen(3000);

console.log('Server running on port: 3000');