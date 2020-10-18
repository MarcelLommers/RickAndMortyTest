import React from 'react';
import { NavLink } from 'react-router-dom';

import './Nav.scss';

// id not really needed but index is considered last resort for react?
const navData = [
	{
		id: 0,
		name: 'Home',
		path: '/'
	},
	{
		id: 1,
		name: 'Characters',
		path: 'characters'
	},
	{
		id: 2,
		name: 'Locations',
		path: 'locations'
	},
	{
		id: 3,
		name: 'Episodes',
		path: 'episodes'
	}
]

const Nav = () => (
	<nav>
		<ul>
			{ navData.map(navItem => (
				<li key={navItem.id}>
					<NavLink
						exact to={navItem.path}
						activeClassName='active'
					>
						{navItem.name}
					</NavLink>
				</li>
			)) }
		</ul>
	</nav>
);

export default Nav;