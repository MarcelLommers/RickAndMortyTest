import React from 'react';

import BaseApi from "../api/BaseApi";

import '../css/pages/Page.scss';

import PagingBlock from "../components/paging/PagingBlock";

import CharacterCard from "../components/card/CharacterCard";

export default class CharactersPage extends React.Component {

	state = {
		loading: true,
		currentPage: 1,
		characterData: {
			info: {},
			results: []
		}
	}

	constructor (props) {
		super(props);

		this.state = {
			currentPage: 1
		};

		this.loadCharacters = this.loadCharacters.bind(this);
		this.loadPrev = this.loadPrev.bind(this);
		this.loadNext = this.loadNext.bind(this);
	}

	async componentDidMount() {
		this.loadCharacters({
			url: 'https://rickandmortyapi.com/api/character'
		})
	}

	async loadCharacters ({ url }) {
		this.setState({
			loading: true
		});
		const characterData = await BaseApi.fetchFromUrl({
			targetUrl: url
		})
		this.setState({
			loading: false,
			characterData
		});
	}

	loadPrev () {
		this.setState({
			currentPage: this.state.currentPage - 1
		})
		this.loadCharacters({
			url: this.state.characterData.info.prev
		})
	}
	loadNext () {
		this.setState({
			currentPage: this.state.currentPage + 1
		})
		this.loadCharacters({
			url: this.state.characterData.info.next
		})
	}

	render (props) {
		if (this.loading ) {
			return <span>Loading...</span>
		}
		if (!this.state.characterData) {
			return <span>characterData empty</span>
		}

		return (

			<div
				className="characters-page page"
			>
				<PagingBlock
					currentPage={ this.state.currentPage }
					listInfo={ this.state.characterData.info }
					loadPrev={ this.loadPrev }
					loadNext={ this.loadNext }
				>
				</PagingBlock>

				<div
					className="card-bin"
				>
					{
						this.state.characterData.results?.map(character => (
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