import  React from  'react';
// import $ from 'jquery';
import Main  from './components/main';
// import  Header  from  './components/header';
import Footer from './components/footer'
import  '../node_modules/bootstrap/dist/css/bootstrap.css';
import  '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import  './styles/App.css';
import './styles/mediaQ.css'

const App = () => (
 <div  className="content-wrapper">
    <Main />
    <Footer />
  </div>
)
export  default  App;