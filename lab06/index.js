var express = require('express');
const port = 3000;
var app = express();
var HttpStatus = require('http-status-codes');

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static('public'));

app.listen(port, function () {
    console.log("Server is running on port "+ port);
});


app.route('/request')
  .get(function (req, res) {
    res.send('GET a random request')
  })

  .post(function (req, res) {
    res.send('Oh you sent a POST request!\n'
            + 'arg: ' + req.body.arg)
  })

  .put(function (req, res) {
    res.send('Oh you sent a PUT request!\n'
            + 'arg: ' + req.body.arg)
  })
  .head(function (req, res) {
    res.send('HEAD request')
  })
  .delete(function (req, res) {
    res.send('DELETE request')
  })

  app.all('/*', function (req, res, next) {
   res.sendStatus(503);
 });

 // Data — Display the sample data that comes with those methods that support data.

// curl -X POST http://localhost:3000/request -d '{"argument": "value"}' -H 'Content-Type: application/json'
