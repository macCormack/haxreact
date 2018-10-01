import  React from  'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import Home  from './home';
import About from './about';
import RaidRoster from './raid-roster';
import GuildRoster from './guild-roster';
import loadingBar from './helpers/loadingbar';

const Main = () => (
	<main>
		<Switch>
			<Route exact path='/' component={Home}/>
			<Route path='/about' component={About}/>
			<Route path='/raid-roster' component={RaidRoster}/>
			<Route path='/guild-roster' component={GuildRoster}/>
			<Route path='/loading' component={loadingBar}/>
		</Switch>
	</main>
)

export default Main