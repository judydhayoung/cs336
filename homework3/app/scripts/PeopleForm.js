import React from 'react';

import People from './People.js';

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
    this.props.onCommentSubmit({firstName: firstName, lastName: lastName, loginID: loginID, startDate: startDate});
    this.setState({firstName: '', lastName: '', loginID: '', startDate: ''});
  },
  render: function() {
    return (
      <form className="peopleForm" onSubmit={this.handleSubmit}>
        <input type="text"placeholder="First Name" value={this.state.firstName} onChange={this.handleFirstNameChange}/>
        <input type="text" placeholder="Last Name" value={this.state.lastName} onChange={this.handleLastNameChange}/>
        <input type="text"placeholder="Login ID" value={this.state.loginID} onChange={this.handleLoginIDChange}/>
        <input type="text"placeholder="Start Date" value={this.state.startDate} onChange={this.handleStartDateChange}/>
        <input type="submit" value="Post" />
        </form>
    );
  }
});
