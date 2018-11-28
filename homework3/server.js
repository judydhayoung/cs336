/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

/*
* MongoDB setup v3
 */
var MongoClient = require('mongodb').MongoClient;
var db;
var collection;
var people;

var url = 'mongodb://cs336:' + process.env.MONGO_PASSWORD + '@ds035747.mlab.com:35747/cs336';
MongoClient.connect(url, function (err, client) {
  if (err) throw err;
  db = client;
  collection = db.collection('people');
  var findPeople = collection.find().toArray(function (err, result) {
    if (err) throw err
    console.log(result)
  });
  app.listen(app.get('port'), function() {
      console.log('Server started: http://localhost:' + app.get('port') + '/');
  });
});

/*
 * read a list of all people objects
 */

app.get('/people', function(req, res) {
  collection.find().toArray(function (err, result) {
    if (err) throw err
    console.log("Found the following records");
    console.log(result);
    res.json(result);
  })
});

/**
 * get the full record for the person with the given ID
 * put method for updates
 */
app.post('/people', (req, res) => {

  // Create new array of new data
  let newPerson = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    loginID: req.body.loginID,
    startDate: req.body.startDate
  }
  collection.insertOne(newPerson, function(err, result) {
    if (err) throw err;
    collection.find({}).toArray(function(err, docs) {
       if (err) throw err;
       console.log("Inserted the document with the field author: ", req.body.author);
       res.json(docs);
     });
  });
});

/**
 * get the full record for the person with the given ID
 * if person couldn't be found: res.sendStatus(404);
 */

app.get('/person/:id', function (req, res) {
  console.log("/person/" + req.params.id + " requested");
  let result = collection.find({loginID: req.params.id}).toArray(function (err, docs) {
    if (err) throw err
    console.log("docs", docs)
    res.json(docs);
  });
});

/**
 * update the full record for the person with the given ID
 * put method is for update
 */
app.put('/person/:id', function (req, res) {
  let result = collection.find({loginID: req.params.id}).toArray(function (err, docs) {
    if (err) throw err
    console.log("Updating", req.params.id, "on people collection");
    collection.updateOne( {loginID: req.params.id},
      {$set: {firstName: req.body.firstName, lastName: req.body.lastName, startDate: req.body.startDate} }
    );
    console.log('Updated person with id', req.params.id, 'and saved changes in people collection');
    res.sendStatus(200);
  });
});

/**
 * delete the full record for the person with the given ID
 */
app.delete('/person/:id', function (req, res) {
  for (const person of people) {
    if (person['loginID'] == req.params.id) {
      console.log("Deleting", person, "from people.json")
      var index = people.indexOf(person);
      people.splice(index,1);

      fs.writeFile('public/people.json', JSON.stringify(people, null, 2), function (err){
        if (err) throw err;
      });
      console.log('Deleted person with id', req.params.id, 'and saved changes in public/people.json');
      res.sendStatus(200);
    }
  }
});

/**
 * the full name (i.e., first & last concatenated into one string)
 * for the person with the given ID
 */

app.get('/person/:id/name', function (req, res) {
  for (const person of people) {
      if (person['loginID'] == req.params.id)
        res.send(person.firstName + " " + person.lastName);
    }
    res.sendStatus(404);
});

// the seniority (i.e., number of years with the organization) of the person with the given ID
app.get('/person/:id/years', function (req, res) {
  for (const person of people) {
      if (person['loginID'] == req.params.id) {
        //accessor method that computes age; cf.a pretty decent function for this from Naveen Jose.)
        //function copied from http://jsfiddle.net/codeandcloud/n33RJ/
        const years = function () {
          var today = new Date();
          var personStartDate = new Date(person.startDate);
          var years = today.getFullYear() - personStartDate.getFullYear();
          var m = today.getMonth() - personStartDate.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < personStartDate.getDate())) {
              years--;
            }
            return years;
          }
          console.log(person.firstName + " has " + years() + "years in the organization");
        res.send(person.firstName + " started in year " + person.startDate.substring(0,4) +
         " and has " + years() + " years in the organization.");
        }
    }
    res.sendStatus(404);
});
