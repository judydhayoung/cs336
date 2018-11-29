import React from 'react';
import Remarkable from 'remarkable';

import '../css/base.css';

module.exports = React.createClass({
  rawMarkup: function() {
    var md = new Remarkable();
    var rawMarkup = md.render(this.props.children.toString());
    return { __html: rawMarkup };
  },

  render: function() {
    return (
      <div className="people">
        <h2 className="name">
          {this.props.firstName} {this.props.lastName}
        </h2>
        <p>
          Login ID: {this.props.loginID} <br />
          Start Date: {this.props.startDate}
        </p>
      </div>
    );
  }
});
