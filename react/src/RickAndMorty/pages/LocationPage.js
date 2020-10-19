import React from 'react';

import '../css/pages/Page.scss';

import BaseApi from "../api/BaseApi";
import LocationApi from "../api/LocationApi";

import LocationCard from "../components/card/LocationCard";
import CharacterCard from "../components/card/CharacterCard";

export default class LocationPage extends React.Component {

	state = {
		locationData: {
			id: 1,
			characters: []
		},
		characterList: []
	}

	async componentDidMount() {
		const location = await LocationApi.fetchLocation({
			locationId: this.props.match.params.locationId
		});

		// retrieve all characters of the location individually
		// since we don't get an id list but an url list
		const updatedList = []
		for (const characterUrl of location.residents) {
			const characterData = await BaseApi.fetchFromUrl({
				targetUrl: characterUrl
			})
			updatedList.push(characterData)
		}

		this.setState({
			location: location,
			characterList: updatedList
		});
	}

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
					{
						this.state.characterList?.map(character => (
							<CharacterCard
								key={ 'c' + character.id }
								characterId={ character.id }
							>
							</CharacterCard>
						))
					}
				</div>
			</div>
		)
	}
}