import React from 'react';

import '../css/pages/Page.scss';

import BaseApi from "../api/BaseApi";
import EpisodeApi from "../api/EpisodeApi";

import EpisodeCard from "../components/card/EpisodeCard";
import CharacterCard from "../components/card/CharacterCard";

export default class EpisodePage extends React.Component {

	state = {
		episodeData: {
			id: 1,
			characters: []
		},
		characterList: []
	}

	async componentDidMount() {
		const episode = await EpisodeApi.fetchEpisode({
			episodeId: this.props.match.params.episodeId
		});

		// retrieve all characters of the episode individually
		// since we don't get an id list but an url list
		const updatedList = []
		for (const characterUrl of episode.characters) {
			const characterData = await BaseApi.fetchFromUrl({
				targetUrl: characterUrl
			})
			updatedList.push(characterData)
		}

		this.setState({
			episode: episode,
			characterList: updatedList
		});
	}

	render () {
		let episodeId = this.props.match.params.episodeId

		if (!episodeId) {
			return <span>No episodeId found.</span>
		}
		return (
			<div
				className="character-page page"
			>
				<EpisodeCard
					episodeId={ episodeId }
				>
				</EpisodeCard>

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