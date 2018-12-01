import React from 'react';

import '../css/base.css';

import CommentForm from './CommentForm.js';
import Comment from './Comment.js';

module.exports = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function(comment) {
      return (
        <Comment id={comment.id} author={comment.author} key={comment.id}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});
