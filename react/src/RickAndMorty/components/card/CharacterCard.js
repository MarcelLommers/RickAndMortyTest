import React from 'react';

import BaseApi from "../../api/BaseApi";
import CharacterApi from "../../api/CharacterApi";

import '../../css/card/CharacterCard.scss';

import Card from "./Card"
import { Link } from "react-router-dom";

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
					<Link className='name'
								title={ this.state.character.name }
								to={{
									pathname: "character/" + this.state.character.id,
									state: {
										characterId: this.state.character.id
									}
								}}
					>
						{ this.state.character.name }
					</Link>

					{
						this.state.origin &&
						<Link className='origin'
						 			title={ this.state.origin.name }
									to={{
										pathname: "location/" + this.state.origin.id,
										state: {
											locationId: this.state.origin.id
										}
									}}
									replace
						>
							{ this.state.origin.name }
						</Link>
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
						<label className='location'>
							<b>Dimension of origin: </b><br/>
							{ this.state.origin.name || 'unknown' }
						</label>
						<label className='location'>
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