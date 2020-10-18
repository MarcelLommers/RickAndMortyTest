import React from 'react';

import LocationApi from "../../api/LocationApi";

import '../../css/card/LocationCard.scss';

import Card from "./Card"

export default class LocationCard extends React.Component {

	state = {
		loading: true,
		locationId: 1,
		location: {
			id: 1,
			name: '',
			url: ''
		}
	}

	constructor(props) {
		super(props);

		this.state = {
			locationId: props.locationId || 1,
			location: {
				id: 1,
				name: '',
				url: '',
				dimension: '',
				residents: []
			}
		};

		this.goToLocation = this.goToLocation.bind(this);
	}

	async componentDidMount() {
		const location = await LocationApi.fetchLocation({
			locationId: this.state.locationId
		});
		this.setState({
			location
		});

		this.setState({
			location,
			loading: false
		});
	}

	goToLocation (e) {
		e.stopPropagation();
		// this.setSeasonHandler(episode.season)
		// this.setEpisodeHandler(episode.number)
	}

	render (props) {
		let headContent = <div className='card-header' />;
		let bodyContent;

		if (!this.state.location) {
			bodyContent =
				<div className='card-content'>
					<span>location not found</span>
				</div>
		} else {
			headContent =
				<div className='card-header'>
					<label className='name'>
						{ this.state.location.name }
					</label>

					<label className='dimension'
						 title={ this.state.location.dimension }
					>
						{ this.state.location.dimension }
					</label>
				</div>

			bodyContent =
				<div className='card-content'>

					<div className='profile'>
						<span>
							<b>Type: </b> { this.state.location.type }
						</span>
						<span>
							<b>Name: </b> { this.state.location.name }
						</span>
						<span>
							<b>Dimension: </b> { this.state.location.dimension }
						</span>
						<span>
							<b>residents registered: </b> { this.state.location.residents.length }
						</span>
					</div>
				</div>
		}

		return (
			<Card className='location-card'
						loading={ this.loading }
						goToTarget={ this.goToLocation }
						headContent={ headContent }
						bodyContent={ bodyContent }
			>
			</Card>
		)
	}

}