import  React, {Component} from  'react';
import {
  Route,
	Switch,
	Redirect
} from 'react-router-dom';
import Header from './header';
import Home  from './home';
import About from './about';
import RaidRoster from './raid-roster';
import GuildRoster from './guild-roster';
import Media from './media';
import Article from './article';
import TodoApp from './helpers/test';
import Error404 from './helpers/404';
import Editraid from './editRaid';
import Axios from 'axios';


class Main extends Component {
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
			email: '',
			password: '',
			accessToken: IsAuthed,
			loginUrl: 'http://localhost:3000/api/Users/login',
			logoutUrl: 'http://localhost:3000/api/Users/logout?access_token=' + localStorage.getItem('accessToken')
    };
	}

  closeLoginForm(evt) {
    document.getElementById('login-modal').classList.remove('open');
	}
	
	handleChange(evt) {
		this.setState({ [evt.target.name]: evt.target.value });
		console.log(evt.target.value);
	}

	handleLogin(evt) {
		evt.preventDefault();
		Axios.post(this.state.loginUrl,  {
			email: this.state.email,
			password: this.state.password
		})
		.then(res => {
			this.closeLoginForm();
			this.setState({
				accessToken: res.data.id,
				loggedIn: true
			})
			localStorage.setItem('loggedIn', this.state.loggedIn);
			localStorage.setItem('accessToken', this.state.accessToken);
			console.log(res);
			console.log(this.state);
		})
		.catch(error => {
			console.log(error);
		});
	}
	
	render () {
		const PrivateRoute = ({ component: Component, loggedIn, ...rest }) => (
			<Route {...rest} render={(props) => (
				loggedIn === "true"
					? <Component {...props} />
					: <Redirect to={{
							pathname: '/',
							state: { from: props.location }
						}} />
			)} />
		)
		return (
			<div>
				<div id="login-modal" className="loginContainer">
          <div className="loginOverlay"></div>
          <form className="loginForm">
            <h3>Login</h3>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input onChange={evt => this.handleChange(evt)} name="email" type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" required/>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input onChange={evt => this.handleChange(evt)} name="password" type="password" className="form-control" id="password" placeholder="Password" required/>
            </div>
            <button className="btn btn-outline my-2 my-sm-0" type="submit" onClick={evt => this.handleLogin(evt)}>Login</button>
          </form>
        </div>

				<Header loggedIn={this.state.loggedIn} logoutUrl={this.state.logoutUrl}/>
				
				<main>
					<Switch>
						<Route exact path='/' component={Home}/>
						<Route path='/about' component={About}/>
						<Route path='/raid-roster' component={RaidRoster}/>
						<Route path='/guild-roster' component={GuildRoster}/>
						<Route path='/media' component={Media}/>
						<Route path='/test' component={TodoApp}/>
						<Route exact path='/post/:id' component={Article}/>
						<PrivateRoute loggedIn={localStorage.getItem('loggedIn')} path='/edit-raid' component={Editraid} />
						<Route component={Error404}/>
					</Switch>
				</main>
			</div>
		);
	}
}

export default Main