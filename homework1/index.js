var express = require('express');
const port = 3000;
var app = express();

app.listen(port, function () {
    console.log("Server is running on port "+ port);
});

app.use(express.static('public'));
var peopleData = require("./people.json");

app.get('/', (req, res) => {
    res.send(
      "/people -- a list of all people objects</br>" +
      "/person/id -- the full record for the person with the given ID</br>" +
      "/person/id/name -- the full name (i.e., first & last concatenated into one string) for the person with the given ID</br>" +
      "/person/id/years -- the seniority (i.e., number of years with the organization) of the person with the given ID — Report this as you would report an age (i.e., rounded down to the nearest whole year)."
    );
});

// a list of all people objects
app.get('/people', (req, res) => {
    res.json(peopleData);
  });

// the full record for the person with the given ID
app.get('/person/:id', function (req, res) {
  console.log("/person/" + req.params.id + " requested");
  for (const person of peopleData) {
      if (person['loginID'] == req.params.id)
      // if (peopleData.loginID == req.params.id)
        res.json(person);
  }
  res.sendStatus(404);
});

// the full name (i.e., first & last concatenated into one string) for the person with the given ID
app.get('/person/:id/name', function (req, res) {
  for (const person of peopleData) {
      if (person['loginID'] == req.params.id)
        res.send(person.firstName + " " + person.lastName);
    }
    res.sendStatus(404);
});

// the seniority (i.e., number of years with the organization) of the person with the given ID
app.get('/person/:id/years', function (req, res) {
  for (const person of peopleData) {
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
