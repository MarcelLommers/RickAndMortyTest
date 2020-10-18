import React from 'react';

import '../css/pages/Page.scss';

import LocationCard from "../components/card/LocationCard";

export default class LocationPage extends React.Component {

	render () {
		let locationId = this.props.match.params.locationId

		if (!locationId) {
			return <span>No locationId found.</span>
		}
		return (
			<div
				className="location-page page"
			>
				<LocationCard
					locationId={ locationId }
				>
				</LocationCard>

				<div
					className="card-bin"
				>
				</div>
			</div>
		)
	}
}