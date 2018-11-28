import React from 'react';
import ReactDOM from 'react-dom';

import '../css/base.css';

import PeopleBox from './PeopleBox.js';

ReactDOM.render(
  <PeopleBox url="/people" pollInterval={2000} />,
  document.getElementById('content')
);
