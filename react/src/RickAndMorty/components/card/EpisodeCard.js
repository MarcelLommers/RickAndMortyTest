import React from 'react';

import EpisodeApi from "../../api/EpisodeApi";

import '../../css/card/EpisodeCard.scss';

import Card from "./Card"
import {Link} from "react-router-dom";

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

					<Link className='name'
								title={ this.state.episode.name }
								to={{
									pathname: "episode/" + this.state.episode.id,
									state: {
										episodeId: this.state.episode.id
									}
								}}
					>
						{ this.state.episode.name }
					</Link>

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