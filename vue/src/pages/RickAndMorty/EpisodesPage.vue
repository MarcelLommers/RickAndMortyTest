<template>
	<div
		class="episodes-page"
	>
		<paging-block
			:list-info="episodesList.info"
			@newListData="updateLocationList"
		>
		</paging-block>

		<div
			class="card-bin"
		>
			<episode-card
				v-for="(episode, index) in episodesList.results"
				:key="'e' + index"
				:episode="episode"
			>
			</episode-card>

		</div>
	</div>
</template>

<script>
	import Vue from 'vue'

	import * as RickAndMortyApi from '../../Api/RickAndMortyApi.js'

	import PagingBlock from "../../components/RickAndMorty/PagingBlock";

	import EpisodeCard from "../../components/RickAndMorty/EpisodeCard";

	export default {
		name: "EpisodesPage",
		components: {
			'paging-block': PagingBlock,
			'episode-card': EpisodeCard
		},
		data () {
			return {
				episodesList: []
			}
		},
		mounted () {
			this.getAllEpisodes()
		},
		methods: {
			getAllEpisodes () {
				RickAndMortyApi.getAllEpisodes().then(result => {
					Vue.set(this, 'episodesList', result)
				})
			},
			updateLocationList (newListData) {
				Vue.set(this, 'episodesList', newListData)
			}
		}
	}
</script>

<style lang="scss" scoped>

	.episodes-page {
		display: flex;
		flex-direction: column;
		padding: 20px;
		align-items: center;
		justify-content: center;
		height: 100%;

		.paging-block {
			display: flex;
			align-items: center;

			.nav-button {
				margin: 5px;
			}
		}

		.card-bin {
			align-content: flex-start;
			display: flex;
			flex-flow: row wrap;
			height: calc(100% - 130px);
			overflow-y: auto;
			padding: 20px;
		}
	}

</style>