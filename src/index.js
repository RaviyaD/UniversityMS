import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: 'AIzaSyDY7Ri-iYNTpop6rQD4pboiCqP86xep8_M',
    authDomain: 'timetabelgenarater.firebaseapp.com',
    databaseURL: 'https://timetabelgenarater.firebaseio.com',
    projectId: 'timetabelgenarater',
    storageBucket: 'timetabelgenarater.appspot.com',
    messagingSenderId: '735125724658',
    appId: '1:735125724658:web:4eb8048167189fb8e61f6b',
    measurementId: 'G-CTZG9GLJYX'
}
firebase.initializeApp(firebaseConfig)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
