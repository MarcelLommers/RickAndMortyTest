<template>
	<div
		class="episode-page"
	>
		<episode-card
			:episode="episode"
		>
		</episode-card>

		<div
			class="card-bin"
			v-if="hasCharacters"
		>
			<character-card
				v-for="(character, index) in orderedCharacters"
				:key="'c' + index"
				:character="character"
			>
			</character-card>
		</div>

	</div>
</template>

<script>
	import Vue from 'vue'
	import _ from 'lodash'

	import * as RickAndMortyApi from '../../Api/RickAndMortyApi.js'

	import EpisodeCard from "../../components/RickAndMorty/EpisodeCard";
	import CharacterCard from "../../components/RickAndMorty/CharacterCard";

	export default {
		name: "EpisodePage",
		components: {
			'episode-card': EpisodeCard,
			'character-card': CharacterCard
		},
		data () {
			return {
				episode: {},
				characterList: []
			}
		},
		mounted () {
			this.getEpisode()
		},
		computed: {
			episodeId () {
				return this.$route.params.episodeId || 1
			},
			hasCharacters () {
				return _.size(this.episode.characters || []) > 0
			},
			orderedCharacters () {
				return _.orderBy(this.characterList, ['id'], ['asc'])
			}
		},
		methods: {
			getEpisode () {
				RickAndMortyApi.getEpisode({
					id: this.episodeId
				}).then(result => {
					Vue.set(this, 'episode', result)

					_.forEach(result.characters, characterUrl => {
						this.getCharacterWithUrl(characterUrl)
					})
				})
			},
			getCharacterWithUrl (characterUrl) {
				RickAndMortyApi.getCharacterWithUrl({
					characterUrl: characterUrl
				}).then(result => {
					Vue.set(this.characterList, _.size(this.characterList), result)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>

	.episode-page {
		display: flex;
		flex-direction: column;
		padding: 40px;
		align-items: center;
		justify-content: center;
		height: 100%;

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