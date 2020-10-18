import React from 'react';

import BaseApi from "../../api/BaseApi";
import EpisodeApi from "../../api/EpisodeApi";

import '../../css/card/EpisodeCard.scss';

import Card from "./Card"

export default class EpisodeCard extends React.Component {

	state = {
		loading: true,
		episodeId: 1,
		episode: {
			id: 1,
			name: '',
			url: '',
			characters: []
		}
	}

	constructor(props) {
		super(props);

		this.state = {
			episodeId: props.episodeId || 1
		};

		this.goToEpisode = this.goToEpisode.bind(this);
	}

	async componentDidMount() {
		const episode = await EpisodeApi.fetchEpisode({
			episodeId: this.state.episodeId
		});
		this.setState({
			episode,
			loading: true
		});
	}

	goToEpisode (e) {
		e.stopPropagation();
		// this.setSeasonHandler(episode.season)
		// this.setEpisodeHandler(episode.number)
	}

	render (props) {
		let headContent = <div className='card-header' />;
		let bodyContent;

		if (!this.state.episode) {
			bodyContent =
				<div className='card-content'>
					<span>episode not found</span>
				</div>
		}
		if (
			this.state.episode
		) {
			headContent =
				<div className='card-header'>
					<label className='name'
					 onClick={ this.goToOrigin }
					>
						{ this.state.episode.name }
					</label>

				</div>

			bodyContent =
				<div className='card-content'>
					<div className='profile'>
						<span>
							<b>episode: </b> { this.state.episode.episode }
						</span>
						<span>
							<b>original airing: </b> { this.state.episode['air_date'] }
						</span>
						<span>
							<b>characters identified: </b> { this.state.episode.characters?.length || 0 }
						</span>
					</div>
				</div>
		}

		return (
			<Card className='episode-card'
						loading={ this.loading }
						goToTarget={ this.goToEpisode }
						headContent={ headContent }
						bodyContent={ bodyContent }
			>
			</Card>
		)
	}

}