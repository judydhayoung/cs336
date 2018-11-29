import React from 'react';
import People from './People.js';
import PeopleList from './PeopleList.js';

module.exports = React.createClass({
  getInitialState: function() {
    return {firstName: '', lastName: '', loginID: '', startDate: ''};
  },
  handleFirstNameChange: function(e) {
    this.setState({firstName: e.target.value});
  },
  handleLastNameChange: function(e) {
    this.setState({lastName: e.target.value});
  },
  handleLoginIDChange: function(e) {
    this.setState({loginID: e.target.value});
  },
  handleStartDateChange: function(e) {
    this.setState({startDate: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var firstName = this.state.firstName.trim();
    var lastName = this.state.lastName.trim();
    var loginID = this.state.loginID.trim();
    var startDate = this.state.startDate.trim();
    if (!firstName || !lastName || !loginID || !startDate) {
      return;
    }
    this.props.onPersonSubmit({firstName: firstName, lastName: lastName, loginID: loginID, startDate: startDate});
    this.setState({firstName: '', lastName: '', loginID: '', startDate: ''});
  },
  render: function() {
    return (
      <form className="peopleForm" onSubmit={this.handleSubmit}>
        <h3>To add a new person to the list:</h3> <br/>
        First Name: <input type="text"placeholder="First Name" value={this.state.firstName} onChange={this.handleFirstNameChange}/>
        <br/>
        Last Name: <input type="text" placeholder="Last Name" value={this.state.lastName} onChange={this.handleLastNameChange}/>
        <br/>
        Login ID: <input type="text"placeholder="Login ID" value={this.state.loginID} onChange={this.handleLoginIDChange}/>
        <br/>
        Start Date: <input type="text"placeholder="Start Date" value={this.state.startDate} onChange={this.handleStartDateChange}/>
        <br/>
        <input type="submit" value="Add" />
        </form>
    );
  }
});
