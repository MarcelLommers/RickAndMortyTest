import React from 'react';

import BaseApi from "../../api/BaseApi";
import CharacterApi from "../../api/CharacterApi";

import '../../css/card/CharacterCard.scss';

import Card from "./Card"

export default class CharacterCard extends React.Component {

	state = {
		loading: true,
		characterId: 1,
		character: {
			id: 1,
			name: '',
			url: '',
			gender: '',
			origin: {},
			location: {},
			episode: []
		},
		origin: {
			id: 1,
			name: '',
			url: ''
		},
		location: {
			id: 1,
			name: '',
			url: ''
		}
	}

	constructor(props) {
		super(props);

		this.state = {
			characterId: props.characterId || 1,
			origin: {
				id: 1,
				name: '',
				url: ''
			},
			location: {
				id: 1,
				name: '',
				url: ''
			}
		};

		this.goToCharacter = this.goToCharacter.bind(this);
		this.goToOrigin = this.goToOrigin.bind(this);
		this.goToLocation = this.goToLocation.bind(this);
	}

	async componentDidMount() {
		const character = await CharacterApi.fetchCharacter({
			characterId: this.state.characterId
		});
		this.setState({
			character
		});

		const origin = await BaseApi.fetchFromUrl({
			targetUrl: this.state.character.origin.url
		});
		const location = await BaseApi.fetchFromUrl({
			targetUrl: this.state.character.location.url
		});
		this.setState({
			origin,
			location,
			loading: true
		});
	}

	goToCharacter (e) {
		e.stopPropagation();
		// this.setSeasonHandler(episode.season)
		// this.setEpisodeHandler(episode.number)
	}
	goToOrigin (e) {
		e.stopPropagation();
		// this.setSeasonHandler(episode.season)
		// this.setEpisodeHandler(episode.number)
	}
	goToLocation (e) {
		e.stopPropagation();
		// this.setSeasonHandler(episode.season)
		// this.setEpisodeHandler(episode.number)
	}

	render (props) {
		let headContent = <div className='card-header' />;
		let bodyContent;

		if (!this.state.character) {
			bodyContent =
				<div className='card-content'>
					<span>character not found</span>
				</div>
		}
		if (
			this.state.character
		) {
			headContent =
				<div className='card-header'>
					<label className='name'>
						{ this.state.character.name }
					</label>

					{
						this.state.origin &&
						<label className='origin'
									 title={ this.state.origin.name }
									 onClick={ this.goToOrigin }
						>
							{ this.state.origin.name }
						</label>
					}

				<span className='species'>
					{ this.state.character.species }
				</span>
			</div>

			bodyContent =
				<div className='card-content'>
					<img src={ this.state.character.image }
							 alt="img missing."
					/>

					<div className='profile'>
						<label className='location'
									 onClick={ this.goToOrigin }
						>
							<b>Dimension of origin: </b><br/>
							{ this.state.origin.name || 'unknown' }
						</label>
						<label className='location'
									 onClick={ this.goToLocation }
						>
							<b>Last known Location: </b><br />
							{ this.state.location.name || 'unknown' }
						</label>

						<span>
							<b>Status: </b> { this.state.character.status }
						</span>
						<span>
							<b>Gender: </b> { this.state.character.gender }
						</span>
						<span>
							<b>Sightings: </b> { this.state.character.episode.length }
						</span>
					</div>
				</div>
		}

		return (
			<Card className='character-card'
				loading={ this.loading }
				goToTarget={ this.goToCharacter }
				headContent={ headContent }
				bodyContent={ bodyContent }
			>
			</Card>
		)
	}

}