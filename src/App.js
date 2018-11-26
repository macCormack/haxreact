import  React, {Component} from  'react';
// import $ from 'jquery';
import Main  from './components/main';
import  Header  from  './components/header';
import Footer from './components/footer'
import  '../node_modules/bootstrap/dist/css/bootstrap.css';
import  '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import  './styles/App.css';
import './styles/mediaQ.css'
import Axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
		var IsloggedIn = 'false';
		var IsAuthed = '';

    if (localStorage.getItem('loggedIn') && localStorage.getItem('accessToken')) {
      IsloggedIn = localStorage.getItem('loggedIn');
      IsAuthed = localStorage.getItem('accessToken');
		}

    this.state = {
		  loggedIn: IsloggedIn,
			accessToken: IsAuthed,
			loginUrl: 'http://localhost:3000/api/Users/login',
			logoutUrl: 'http://localhost:3000/api/Users/logout?access_token=' + localStorage.getItem('accessToken')
    };
	}


  render() {
    return (
    <div  className="content-wrapper">      
      <Header
        loggedIn={this.state.loggedIn}
        loginUrl={this.state.loginUrl}
        accessToken={this.state.accessToken}
        logoutUrl={this.state.logoutUrl}
       />
      <Main loggedIn={this.state.loggedIn} />
      <Footer />
    </div>

    )
  }
}
export  default  App;