import  React from  'react';
import Main  from './components/main';
import  Header  from  './components/header';
import $ from 'jquery';
import  '../node_modules/bootstrap/dist/css/bootstrap.css';
import  '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import  './App.css';

const App = () => (
 <div  className="App">
    <Header/>
    <Main />
  </div>
)
export  default  App;