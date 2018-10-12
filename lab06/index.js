/**
 * Lab 06 of Calvin College, using HTTP method/code, form and cookie examples.
 */

var express = require('express');
const port = 3000;
const path = require('path')
var app = express();
var HttpStatus = require('http-status-codes');

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static('public'));

app.listen(port, function () {
    console.log("Server is running on port "+ port);
});

// --------------------------------
// HTTP route and return code examples

app.route('/request')
  .get(function (req, res) {
    res.send('Oh you sent a GET request!')
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
    res.send('Oh you sent a HEAD request!')
  })
  .delete(function (req, res) {
    res.send('Oh you sent a DELETE request!')
  })

  // Responds to form posts from the forms/index.html example.
  app.post('/forms', function(req, res) {
      res.status(HttpStatus.OK);
      res.send("You have submitted: Username : " + req.body.user_name + " User email: " + req.body.user_mail
      + " Message : " + req.body.user_message);
  });

  app.all('/*', function (req, res, next) {
      // res.status(HttpStatus.NOT_FOUND);
      res.send('we cannot process page ' + req.url);
      res.sendStatus(503);
 });
