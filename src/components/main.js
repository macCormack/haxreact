import  React from  'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import Home  from './home';
import About from './about';
import RaidRoster from './raid-roster';
import GuildRoster from './guild-roster';
import Media from './media';
import Article from './article';
import TodoApp from './helpers/test';
import Error404 from './helpers/404';

const Main = () => (
	<main>
		<Switch>
			<Route exact path='/' component={Home}/>
			<Route path='/about' component={About}/>
			<Route path='/raid-roster' component={RaidRoster}/>
			<Route path='/guild-roster' component={GuildRoster}/>
			<Route path='/media' component={Media}/>
			<Route path='/test' component={TodoApp}/>
			<Route exact path='/post/:id' component={Article}/>
			<Route component={Error404}/>
		</Switch>
	</main>
)

export default Main