import React from 'react';

import BaseApi from "../api/BaseApi";

import '../css/pages/Page.scss';

import PagingBlock from "../components/paging/PagingBlock";

import LocationCard from "../components/card/LocationCard";

export default class LocationsPage extends React.Component {

	state = {
		loading: true,
		currentPage: 1,
		locationData: {
			info: {},
			results: []
		}
	}

	constructor (props) {
		super(props);

		this.state = {
			currentPage: 1
		};

		this.loadLocations = this.loadLocations.bind(this);
		this.loadPrev = this.loadPrev.bind(this);
		this.loadNext = this.loadNext.bind(this);
	}

	async componentDidMount() {
		this.loadLocations({
			url: 'https://rickandmortyapi.com/api/location'
		})
	}

	async loadLocations ({ url }) {
		this.setState({
			loading: true
		});
		const locationData = await BaseApi.fetchFromUrl({
			targetUrl: url
		})
		this.setState({
			loading: false,
			locationData
		});
	}

	loadPrev () {
		this.setState({
			currentPage: this.state.currentPage - 1
		})
		this.loadLocations({
			url: this.state.locationData.info.prev
		})
	}
	loadNext () {
		this.setState({
			currentPage: this.state.currentPage + 1
		})
		this.loadLocations({
			url: this.state.locationData.info.next
		})
	}


	render (props) {
		if (this.loading ) {
			return <span>Loading...</span>
		}
		if (!this.state.locationData) {
			return <span>locationData empty</span>
		}

		return (

			<div
				className="location-page page"
			>
				<PagingBlock
					currentPage={ this.state.currentPage }
					listInfo={ this.state.locationData.info }
					loadPrev={ this.loadPrev }
					loadNext={ this.loadNext }
				>
				</PagingBlock>

				<div
					className="card-bin"
				>
					{
						this.state.locationData.results?.map(location => (
							<LocationCard
								key={ 'l' + location.id }
								locationId={ location.id }
							>
							</LocationCard>
						))
					}
				</div>
			</div>
		)
	}
}