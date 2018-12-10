import  React, {Component} from  'react';
import {
  Route,
	Switch,
	Redirect
} from 'react-router-dom';
import Home  from './home';
import About from './about';
import RaidRoster from './raid-roster';
import GuildRoster from './guild-roster';
import Media from './media';
import Article from './article';
import TodoApp from './helpers/test';
import Error404 from './helpers/404';
import EditAbout from './admin/editAbout';
import Editraid from './admin/editRaid';
import EditRaidProg from './admin/editRaidProg';
import EditRecruit from './admin/editRecruiting';


class Main extends Component {	
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
				<main>
					<Switch>
						<Route exact path='/' component={Home}/>
						<Route path='/about' component={About}/>
						<Route path='/raid-roster' component={RaidRoster}/>
						<Route path='/guild-roster' component={GuildRoster}/>
						<Route path='/media' component={Media}/>
						<Route path='/test' component={TodoApp}/>
						<Route exact path='/post/:id' component={Article}/>
						<PrivateRoute loggedIn={this.props.loggedIn} path='/edit-about' component={EditAbout} />
						<PrivateRoute loggedIn={this.props.loggedIn} path='/edit-raid' component={Editraid} />
						<PrivateRoute loggedIn={this.props.loggedIn} path='/edit-raid-prog' component={EditRaidProg} />
						<PrivateRoute loggedIn={this.props.loggedIn} path='/edit-recruit' component={EditRecruit} />
						<Route component={Error404}/>
					</Switch>
				</main>
		);
	}
}

export default Main