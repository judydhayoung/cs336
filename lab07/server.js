var express = require('express');
const port = 3000;
const path = require('path')
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static('public'));

app.listen(port, function () {
    console.log("Server is running on port "+ port);
});
app.get('/', (req, res) => res.sendFile(path.join(__dirname+'/public/lab07.html')))

app.get('/hello', function (req, res) {
  res.json("Hello, lab7!");
});

app.post('/hello', (req, res) => res.status(200).send({html: "Hello, ", name: req.body.name }));
