import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Header from './Header';

it('App renders without crashing', () => {
	var mock = (function() {
	  var store = {};
	  return {
	    getItem: function(key) {
	      return store[key];
	    },
	    setItem: function(key, value) {
	      store[key] = value.toString();
	    },
	    clear: function() {
	      store = {};
	    }
	  };
	})();
	Object.defineProperty(window, 'localStorage', { value: mock });
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('Header renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<Header />, div)
});
