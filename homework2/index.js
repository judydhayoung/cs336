var express = require('express');
const port = 3000;
var app = express();
var path = require('path');
const fs = require('fs');

app.listen(port, function () {
    console.log("Server is running on port "+ port);
});

app.use(express.static('public'));
var peopleData = require("./public/people.json");
// let file = fs.readFile('public/people.json');
// let peopleData = JSON.parse(rawdata);

// var peopleData = [
//   {
//   "firstName":"Moses",
//   "lastName":"Bloch",
//   "loginID": "mbloch",
//   "startDate": "2010-06-28"
// },
// {
//   "firstName":"Marissa",
//   "lastName":"Hardrick",
//   "loginID": "mhardrick",
//   "startDate": "2012-12-27"
// },
// {
//   "firstName":"Claudette",
//   "lastName":"Ferrel",
//   "loginID": "cferrel",
//   "startDate": "2013-10-02"
// },
// {
//   "firstName":"Giovanni",
//   "lastName":"Jump",
//   "loginID": "gjump",
//   "startDate": "2016-01-13"
// },
// {
//   "firstName":"Lucille",
//   "lastName":"Bran",
//   "loginID": "lbran",
//   "startDate": "2013-11-28"
// }
// ]

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
  //res.json(JSON.parse(data));
  res.sendFile(path.join(__dirname, '/public/addPerson.html'));
  });

  /**
   * get the full record for the person with the given ID
   * put method for updates
   */
  app.post('/people', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/addPerson.html'));
    });

/**
 * get the full record for the person with the given ID
 */
app.get('/person/:id', function (req, res) {
    console.log("/person/" + req.params.id + " requested");
    res.sendFile(path.join(__dirname, '/public/getPerson.html'));
  });

/**
 * update the full record for the person with the given ID
 */
app.post('/person/:id', function (req, res) {

    res.send('Oh you sent a POST request!\n'
            + 'arg: ' + req.body.arg)
  });

/**
 * delete the full record for the person with the given ID
 */
app.delete('/person/:id', function (req, res) {
  for (const person of peopleData) {
    if (person['loginID'] == req.params.id)
      console.log("Deleting", person, "from people.json")
      delete peopleData.person;
  }
});

/**
 * the full name (i.e., first & last concatenated into one string)
 * for the person with the given ID
 */

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
