import React from 'react';

import '../css/pages/Page.scss';

import CharacterCard from "../components/card/CharacterCard";

export default class CharacterPage extends React.Component {

	render () {
		let characterId = this.props.match.params.characterId

		if (!characterId) {
			return <span>No characterId found.</span>
		}
		return (
			<div
				className="character-page page"
			>
				<CharacterCard
					characterId={ characterId }
				>
				</CharacterCard>

				<div
					className="card-bin"
				>
				</div>
			</div>
		)
	}
}