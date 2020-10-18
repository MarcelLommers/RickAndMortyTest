import React from 'react';

import BaseApi from "../api/BaseApi";

import '../css/pages/Page.scss';

import PagingBlock from "../components/paging/PagingBlock";

import EpisodeCard from "../components/card/EpisodeCard";

export default class EpisodesPage extends React.Component {

	state = {
		loading: true,
		currentPage: 1,
		episodesData: {
			info: {},
			results: []
		}
	}

	constructor (props) {
		super(props);

		this.state = {
			currentPage: 1
		};

		this.loadEpisodes = this.loadEpisodes.bind(this);
		this.loadPrev = this.loadPrev.bind(this);
		this.loadNext = this.loadNext.bind(this);
	}

	async componentDidMount() {
		this.loadEpisodes({
			url: 'https://rickandmortyapi.com/api/episode'
		})
	}

	async loadEpisodes ({ url }) {
		this.setState({
			loading: true
		});
		const episodesData = await BaseApi.fetchFromUrl({
			targetUrl: url
		})
		this.setState({
			loading: false,
			episodesData
		});
	}

	loadPrev () {
		this.setState({
			currentPage: this.state.currentPage - 1
		})
		this.loadEpisodes({
			url: this.state.episodesData.info.prev
		})
	}
	loadNext () {
		this.setState({
			currentPage: this.state.currentPage + 1
		})
		this.loadEpisodes({
			url: this.state.episodesData.info.next
		})
	}


	render (props) {
		if (this.loading ) {
			return <span>Loading...</span>
		}
		if (!this.state.episodesData) {
			return <span>episodesData empty</span>
		}

		return (

			<div
				className="episodes-page page"
			>
				<PagingBlock
					currentPage={ this.state.currentPage }
					listInfo={ this.state.episodesData.info }
					loadPrev={ this.loadPrev }
					loadNext={ this.loadNext }
				>
				</PagingBlock>

				<div
					className="card-bin"
				>
					{
						this.state.episodesData.results?.map(episode => (
							<EpisodeCard
								key={ 'e' + episode.id }
								episodeId={ episode.id }
							>
							</EpisodeCard>
						))
					}
				</div>
			</div>
		)
	}
}