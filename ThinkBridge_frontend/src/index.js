import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Router';
import './style.css';

ReactDOM.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
  document.getElementById("root")
  );

// document.addEventListener('DOMContentLoaded', function() {
//   ReactDOM.render(
//     React.createElement(App),
//     document.getElementById('mount')
//   );
// });

