import React from 'react';

import '../css/pages/Page.scss';

import EpisodeCard from "../components/card/EpisodeCard";

export default class EpisodePage extends React.Component {

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
				</div>
			</div>
		)
	}
}