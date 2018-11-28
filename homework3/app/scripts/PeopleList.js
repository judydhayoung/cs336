import React from 'react';

import '../css/base.css';

import PeopleForm from './PeopleForm.js';
import People from './People.js';

module.exports = React.createClass({
  render: function() {
    var peopleNodes = this.props.data.map(function(people) {
      return (
        <People firstName={people.firstName} lastName={people.lastName} startDate={people.startDate} loginID={people.loginID} key={people._id}>
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
