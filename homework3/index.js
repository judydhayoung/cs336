var express = require('express');
const port = 3000;
var app = express();
var path = require('path');
var fs = require('fs');

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.listen(port, function () {
    console.log("Server is running on port "+ port);
});

app.use(express.static('public'));
var peopleData = fs.readFileSync('public/people.json');
var people = JSON.parse(peopleData);

app.get('/', (req, res) => {
    res.send(
      "/people -- a list of all people objects</br>" +
      "/person/id -- the full record for the person with the given ID</br>" +
      "/person/id/name -- the full name (i.e., first & last concatenated into one string) for the person with the given ID</br>" +
      "/person/id/years -- the seniority (i.e., number of years with the organization) of the person with the given ID — Report this as you would report an age (i.e., rounded down to the nearest whole year)."
    );
});

/**
 * a list of all people objects
 */
app.get('/people', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/addPerson.html'));
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

  people[people.length] = newPerson; // OR people.push(newPerson);
  fs.writeFile('public/people.json',
   JSON.stringify(people, null, 2),
    function (err){
      if (err) throw err;
      console.log('Wrote to file public/people.json');
    });
  res.sendStatus(201);

});

/**
 * get the full record for the person with the given ID
 * (notes:)
 * if person couldn't be found: res.sendStatus(404);
 *
 * res.sendFile(path.join(__dirname, '/public/getPerson.html'));
 */

app.get('/person/:id', function (req, res) {
  console.log("/person/" + req.params.id + " requested");

  for (const person of people) {
      if (person['loginID'] == req.params.id)
        res.json(person);
  }
});

/**
 * update the full record for the person with the given ID
 * put method is for update
 */
app.put('/person/:id', function (req, res) {
  for (const person of people) {
    if (person['loginID'] == req.params.id) {
      console.log("Updating", person, "from people.json");
      person['firstName'] = req.body.firstName;
      person['lastName'] = req.body.lastName;
      person['loginID'] = req.body.loginID;
      person['startDate'] = req.body.startDate;
      console.log("successfully deleted!");
      fs.writeFile('public/people.json', JSON.stringify(people, null, 2), function (err){
        if (err) throw err;
      });
      console.log('Updated person with id', req.params.id, 'and saved changes in public/people.json');
      res.sendStatus(200);
    }
  }
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
