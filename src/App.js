import  React, {Component} from  'react';
// import $ from 'jquery';
import Main  from './components/main';
import  Header  from  './components/header';
import Footer from './components/footer'
import  '../node_modules/bootstrap/dist/css/bootstrap.css';
import  '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import  './styles/App.css';
import './styles/mediaQ.css'

class App extends Component {
  constructor(props) {
    super(props);
// MAC: set inital state 
		var IsloggedIn = 'false';
		var IsAuthed = '';

// MAC: if localStorage has data populate that data in var and pass it down to state
    if (localStorage.getItem('loggedIn') && localStorage.getItem('accessToken')) {
      IsloggedIn = localStorage.getItem('loggedIn');
      IsAuthed = localStorage.getItem('accessToken');
		}

    this.state = {
		  loggedIn: IsloggedIn,
			accessToken: IsAuthed,
			loginUrl: 'http://localhost:3000/api/Users/login'
    };
	}


  render() {
    return (
    <div  className="content-wrapper">      
      <Header
        loggedIn={this.state.loggedIn}
        loginUrl={this.state.loginUrl}
        accessToken={this.state.accessToken}
       />
      <Main loggedIn={this.state.loggedIn} />
      <Footer />
    </div>

    )
  }
}
export  default  App;