import React from 'react';

import '../css/base.css';

import PeopleForm from './PeopleForm.js';
import People from './People.js';

var PeopleList = React.createClass({
  render: function() {
    var peopleNodes = this.props.data.map(function(people) {
      return (
        <People firstName={people.firstName} lastName={people.lastName} loginID = {people.loginID} startDate={people.startDate} key={people._id}>
        </People>
      );
    });
    return (
      <div className="peopleList">
        {peopleNodes}
      </div>
    );
  }
});

module.exports = PeopleList;
