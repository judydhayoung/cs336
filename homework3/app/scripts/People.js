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
          {this.props.firstName, this.props.lastName} //, this.props.lastName}
        </h2>
        <p clasName="loginID">
          Login ID: {this.props.loginID}
        </p>
        <p className="startDate">
          Login ID: {this.props.startDate}
        </p>
        // <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }
});
